const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //Routes User
    this.usersPath = '/api/users';
    //Middlewares
    this.middlewares();
    //Routes
    this.routes();
  }
  middlewares() {
    //CORS
    this.app.use(cors());
    // Read and Parse Body
    this.app.use(express.json());
    // Public directory
    this.app.use(express.static('public'));
  }
  routes() {
    this.app.use(this.usersPath, require('../routes/user.routes'));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en', this.port);
    });
  }
}

module.exports = Server;
