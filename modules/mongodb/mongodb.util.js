(() => {
  "use strict";

  function init() {
    const options = {
      promiseLibrary: require("bluebird"),
      useNewUrlParser: true
    };

    const connectionString = prepareConnectionString(mongodbConfig);

    mongoose
      .connect(connectionString, options)
      .then(result => {
        console.log("Mongodb connection successful DB: " + connectionString);
      })
      .catch(error => {
        console.log(error.message);
        console.log(
          "Error occured while connecting to DB: " + connectionString
        );
      });
  }

  module.exports = { init: init };

  const mongoose = require("mongoose");

  const mongodbConfig = require("../../config/mongodb/mongodb-config").mongodb;

  function prepareConnectionString(config) {
    let connectionString = "mongodb://";

    if (config.user) {
      connectionString += config.user + ":" + config.password + "@";
    }

    connectionString += config.server + "/" + config.database;
    return connectionString;
  }
})();
