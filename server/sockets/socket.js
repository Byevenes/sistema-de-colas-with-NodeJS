const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
  client.on('siguienteTicket', (data, callback) => {
    let siguiente = ticketControl.siguiente();
    console.log(siguiente);
    callback(siguiente);
  });
  // emitir un evento del 'estadoactual'
  client.emit('estadoActual', {
    actual: ticketControl.getUltimoTicket(),
    ultimos4: ticketControl.getUltimos4Ticket(),
  });

  // emitir un evento de los ultimos 4
  client.broadcast.emit('ultimos4', {
    ultimos4: ticketControl.getUltimos4Ticket(),
  });

  // escuchar evento de 'atenderTicket'
  client.on('atenderTicket', (data, callback) => {
    // preguntar si envio el escritorio de forma obligatoria para poder seguir trabajando
    if (!data.escritorio) {
      return callback({
        err: true,
        mensaje: 'El escritorio es necesario',
      });
    }

    // ticket atender
    let atenderTicket = ticketControl.atenderTicket(data.escritorio);

    callback(atenderTicket);
  });
});
