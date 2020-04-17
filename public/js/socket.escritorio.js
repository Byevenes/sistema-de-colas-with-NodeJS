// Comando para establecer la conexión
var socket = io();

socket.on('connect', () => {
  console.log('Conectado');
});

socket.on('disconnect', () => {
  console.log('Desconectado');
});

// creamos variable para poder saber que recibo por la URL
var searchParams = new URLSearchParams(window.location.search);

// si no viene escritorio
if (!searchParams.has('escritorio')) {
  // salimos de la pestaña y volvemos al index.html
  window.location = 'index.html';

  // enviamos error
  throw new Error('El escritorio es necesario');
}

// variable que almacena el numero del escritorio que estoy recibiendo
var escritorio = searchParams.get('escritorio');
var label = $('small');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function () {
  socket.emit('atenderTicket', { escritorio: escritorio }, function (resp) {
    if (resp === 'No hay tickets') {
      label.text(resp);
      alert(resp);
      return;
    }
    label.text('Ticket ' + resp.numero);
  });
});
