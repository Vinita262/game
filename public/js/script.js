const {username , room} = Qs.parse(location.search, {
    ignoreQueryPrefix : true
});
const socket = io('/') // Create our socket
socket.emit('joinRoom', {username, room});

socket.on('roomusers',({room, users}) =>{
    //outputRoomName(room);
    outputUsers2(users);
});

let myVideoStream;
const videoGrid = document.getElementById("video-grid");
function outputUsers2(users){
    users.forEach((user,index) => {
        const myVideo = document.createElement("video");
myVideo.muted = true;
navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
})
 .then((stream) => {
     myVideoStream = stream;
     addVideoStream(myVideo, stream);
 });
 const addVideoStream = (video, stream) => {
     video.srcObject = stream;
     video.addEventListener("loadedmetadata", () => {
        video.play();
        videoGrid.append(video);
     });
 };
    });
}


