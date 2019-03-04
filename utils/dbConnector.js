const mongoose = require("mongoose");

class dbConnector {

  constructor(location, username, database) {
    const url = "mongodb+srv://" + username + "@" +location + "/" + database +"?retryWrites=true";
    this.dbConnection = mongoose.connect(url, { useNewUrlParser: true });
    // mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
  }

}

module.exports = dbConnector;
