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

  router.get("/:customerId", CustomerMiddleware.getCustomerById, (req, res) => {
    return res.status(200).json(req.response);
  });

  router.put("/:customerId", CustomerMiddleware.modifyCustomer, (req, res) => {
    return res.status(200).json(req.response);
  });

  router.delete(
    "/:customerId",
    CustomerMiddleware.deleteCustomer,
    (req, res) => {
      return res.status(200).json(req.response);
    }
  );

  module.exports = router;
})();
