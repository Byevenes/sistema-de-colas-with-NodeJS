// Comando para establecer la conexión
var socket = io();

// variable para poder asignar los textos para los ticket
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

// variable para poder asignar los textos para los escritorios
var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [
  lblEscritorio1,
  lblEscritorio2,
  lblEscritorio3,
  lblEscritorio4,
];

socket.on('connect', () => {
  console.log('Conectado');
});

socket.on('disconnect', () => {
  console.log('Desconectado');
});

socket.on('estadoActual', function (data) {
  /*audio = new Audio('../audio/new-ticket.mp3');
  audio.play();*/
  actualizaHTML(data.ultimos4);
});

socket.on('ultimos4', function (resp) {
  /*audio = new Audio('../audio/new-ticket.mp3');
  audio.play();*/
  actualizaHTML(resp.ultimos4);
});

function actualizaHTML(ultimos4) {
  for (var i = 0; i <= ultimos4.length - 1; i++) {
    lblTickets[i].text('Ticket ' + ultimos4[i].numero);

    lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
  }
}
