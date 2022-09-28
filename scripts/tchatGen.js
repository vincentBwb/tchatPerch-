var socket = io();

var send = function () {
  var text = document.getElementById('m').value;
  socket.emit('chat message',text);
}

var receive = function(msg) {
  var li = document.createElement('li');
  li.innerText = msg;
  document.getElementById('messages').appendChild(li);
}
socket.on('chat message', receive);