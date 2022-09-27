const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config.db');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    // Connect to db
    this.connectDB();
    //Routes User
    this.usersPath = '/api/users';
    //User auth
    this.authPath = '/api/auth';
    //Middlewares
    this.middlewares();
    //Routes
    this.routes();
  }
  async connectDB() {
    await dbConnection();
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
    this.app.use(this.authPath, require('../routes/auth.routes'));
    this.app.use(this.usersPath, require('../routes/user.routes'));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en', this.port);
    });
  }
}

module.exports = Server;
