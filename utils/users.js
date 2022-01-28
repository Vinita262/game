const users = [];
//Join user to a chat
function UserJoin(id,username,room){
    const user = {id, username, room};

    users.push(user);
    
    return user;
}

//Get current user
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}
//USer leaves chat
function userLeave(id){
    const index = users.findIndex(user=> user.id === id);
    if(index != -1){
        return users.splice(index,1)[0];
    }

}
//Get Room users
function getRoomUsers(room){
    return users.filter(user => user.room===room);
}
module.exports = {
    UserJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}