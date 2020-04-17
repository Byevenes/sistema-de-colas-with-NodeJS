const fs = require('fs');

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = [];

    let data = require('../data/data.json');

    if (data.hoy === this.hoy) {
      this.ultimo = data.ultimo;
      this.tickets = data.tickets;
      this.ultimos4 = data.ultimos4;
    } else {
      this.reiniciarConteo();
    }
  }

  siguiente() {
    this.ultimo += 1;

    let ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);

    this.grabarArchivo();

    return `Ticket ${this.ultimo}`;
  }

  getUltimoTicket() {
    return `Ticket ${this.ultimo}`;
  }

  getUltimos4Ticket() {
    return this.ultimos4;
  }

  atenderTicket(escritorio) {
    // recibo un escritorio

    // verifico si hay tickets para atender
    if (this.tickets.length === 0) {
      return 'No hay tickets';
    }

    // estraigo el numero para romper la relación de js con pasar los datos x referencia
    let numeroTicket = this.tickets[0].numero;

    // elimino la primera posición del arreglo
    this.tickets.shift();

    // creo un nuevo ticket el cual voy atender
    let atenderTicket = new Ticket(numeroTicket, escritorio);

    // coloco el atenderticket al inicio del arreglo
    this.ultimos4.unshift(atenderTicket);

    // verifico que soy ayan 4 tickets en el arreglo
    if (this.ultimos4.length > 4) {
      this.ultimos4.splice(-1, 1); // borra el último
    }
    console.log('Ultimos 4');
    console.log(this.ultimos4);

    // guardo los archivos
    this.grabarArchivo();

    // regreso el ticket que quiero devolver
    return atenderTicket;
  }

  reiniciarConteo() {
    this.ultimo = 0;
    this.tickets = [];
    this.ultimos4 = [];
    console.log('Se ha inicializado el sistema');
    this.grabarArchivo();
  }

  grabarArchivo() {
    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4,
    };

    let jsonDataString = JSON.stringify(jsonData);

    fs.writeFileSync('./server/data/data.json', jsonDataString);
  }
}

module.exports = {
  TicketControl,
};
