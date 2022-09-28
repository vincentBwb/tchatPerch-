// $(function () {
//     var socket = io();
//     $('form').submit(function(e){
//       e.preventDefault(); // prevents page reloading
//       socket.emit('chat message', $('#m').val());
//       $('#m').val('');
//       return false;
//     });
//     socket.on('chat message', function(msg){
//       $('#messages').append($('<li>').text(msg));
//     });
//   });

var table = [{
  "_id": {
    "$oid": "60f7d6b5b6219682a009ce5d"
  },
  "email": "badis@gmail.com",
  "username": "badis",
  "password": "ezdefef",
  "profil": "iconelogin.jpg"
},{
  "_id": {
    "$oid": "60f7d75c2c09936bcdcce1b6"
  },
  "email": "badis@gmail.com",
  "username": "ezeze",
  "password": "ezzezeze"
},{
  "_id": {
    "$oid": "60f7d79d2c09936bcdcce1b7"
  },
  "email": "baddzzdzdis@gmail.com",
  "username": "feeffe",
  "password": "feefef"
},{
  "_id": {
    "$oid": "60f7d7a02c09936bcdcce1b8"
  },
  "email": "baddzzdzdis@gmail.com",
  "username": "feeffeefeffe",
  "password": "feefef"
},{
  "_id": {
    "$oid": "60f7d7a52c09936bcdcce1b9"
  },
  "email": "baddzzefefdzdis@gmail.com",
  "username": "efee",
  "password": "fefefef"
}];

window.onload = function listConnect () {
  console.log(table.length);
  
  for (i=1; i<=table.length; i++) {
    myitem= table[i]
    let myRow = "<tr><td>"+"<input type='image' classe='imageuser' src='iconelogin.jpg' width='25px'></input>"+"</td><td>"+myitem.username+"</td></tr>"
    users.innerHTML += myRow;
  }
}

var socket = io();

var send = function () {
  var text = document.getElementById('m').value;
  socket.emit('tchat message',text);
}

var receive = function(msg) {
  var li = document.createElement('li');
  li.innerText = msg;
  document.getElementById('messages').appendChild(li);
}
socket.on('tchat message', receive);
