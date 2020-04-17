// Comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', () => {
  console.log('Conectado');
});

socket.on('disconnect', () => {
  console.log('Desconectado');
});

// on 'estadoactual' listener
socket.on('estadoActual', function (resp) {
  label.text(resp.actual);
});

$('button').on('click', function () {
  socket.emit('siguienteTicket', null, function (siguienteTicket) {
    label.text(siguienteTicket);
  });
});
