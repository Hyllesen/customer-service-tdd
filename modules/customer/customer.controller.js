(() => {
  "use strict";
  const express = require("express");
  const router = express.Router();
  module.exports = router;

  const CustomerMiddleware = require("./customer.module")().CustomerMiddleware;

  router.post("/", CustomerMiddleware.addCustomer, (req, res) => {
    res.status(201).json({});
  });
})();
