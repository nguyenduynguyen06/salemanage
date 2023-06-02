import mysql from 'mysql';

class DatabaseConnection {
  constructor() {
    this.connection = null;
  }

  connect() {
    this.connection = mysql.createConnection({
      host: "brcqbyhqtad5pdyqakqn-mysql.services.clever-cloud.com",
      user: "u6qqbf6dz9fzwj2z",
      password: "biGVAjyJ1GR4IhNpFeb9",
      database: "brcqbyhqtad5pdyqakqn"
    });

    this.connection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
  }

  getConnection() {
    if (!this.connection) {
      this.connect();
    }
    return this.connection;
  }

  static getInstance() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }
}

export default DatabaseConnection.getInstance().getConnection();