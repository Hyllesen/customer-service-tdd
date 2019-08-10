(() => {
  "use strict";
  const express = require("express");
  const router = express.Router();

  const CustomerMiddleware = require("./customer.module")().CustomerMiddleware;

  router.post("/", CustomerMiddleware.addCustomer, (req, res) => {
    return res.status(201).json(req.response);
  });

  router.get("/", CustomerMiddleware.getCustomers, (req, res) => {
    res.status(200).json(req.response);
  });

  module.exports = router;
})();
