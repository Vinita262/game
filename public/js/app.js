const socket = io();

const {username , room} = Qs.parse(location.search, {
  ignoreQueryPrefix : true
});


//Join chatroom
socket.emit('joinRoom', {username, room});


//Accessing the form for message
//const chatForm = document.getElementById('chat-form');
//const chatMessages = document.querySelector('.chat-messages');
//const initialScreen = document.getElementById('initialScreen');
//const videoScreen = document.getElementById('videoScreen');
const roomName = document.getElementById('room-name');
const userListA = document.getElementsByClassName('team_a')[0];
const userListB = document.getElementsByClassName('team_b')[0];
const button = document.getElementById('btn');
const buttons = document.createElement('button');
buttons.textContent = 'START';

buttons.addEventListener('click',()=>{
  socket.emit('redirect');
  //console.log("game has been started");
}) ;

socket.on('start',()=>{
  url = `http://localhost:8080/video.html?username=${username}&room=${room}`;
  window.location=url;
});

//if(username===firstli.innerText){
//button.appendChild(buttons);
//}
//button.appendChild(buttons);

//Get username and roomname from URL


//Get room and users
socket.on('roomusers',({room, users}) =>{
    outputRoomName(room);
    outputUsers(users);
});

//Message from server
// socket.on('message',message => {
//     console.log(message);
//     outputMessage(message);

//     //scroll down everytime we get a message
//     chatMessages.scrollTop = chatMessages.scrollHeight;
// });

//Message submit
// chatForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     //Get message text
//     const msg = e.target.elements.msg.value;
//     //Emit message to server
//     socket.emit('chatMessage', msg);
//     //clearout the input
//     e.target.elements.msg.value='';
//     e.target.elements.msg.focus();
// });
//Output message to DOM
//  function outputMessage(message){
//      const div = document.createElement('div');
//      div.classList.add('message');
//      div.innerHTML= `<p class="meta">${message.username} <span>${message.time}</span></p>
//      <p class="text">
//         ${message.text}
//     </p>`;
//     document.querySelector('.chat-messages').appendChild(div);
//  }

 //Add room name to DOM
 function outputRoomName(room){
    roomName.innerText = room;
 }

 

 //Add users to DOM
 function outputUsers(users){
    userListA.innerHTML = '';
    userListB.innerHTML = '';
    users.forEach((user,index) => {
      //const space = document.createElement('br');
      const userName = document.createElement('li');
      userName.innerText = user.username;
      if(index==0 && userName.innerText===username){
        button.appendChild(buttons);
      }
      if(index%2 == 0){
        userListA.appendChild(userName);
        //userListA.appendChild(space);
        userListA.scrollTop = userListA.scrollHeight;
      }else{
        
        userListB.appendChild(userName);
        //userListB.appendChild(space);
        userListB.scrollTop = userListB.scrollHeight;
      }
      
        
        
      
    });
 }
 //const firstli = document.getElementsByClassName('team_a')[0].getElementsByTagName("li")[0];
 //console.log(firstli.innerText);

 //Prompt the user before leave chat room
// document.getElementById('leave-btn').addEventListener('click', () => {
//     const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
//     if (leaveRoom) {
//       window.location = '../index.html';
//     } else {
//     }
//   });