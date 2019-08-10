(() => {
  "use strict";
  module.exports = { addCustomer, getCustomers };
  const CustomerService = require("./customer.module")().CustomerService;

  function getCustomers(req, res, next) {
    CustomerService.fetchCustomers(req.body)
      .then(success)
      .catch(failure);

    function success(data) {
      req.response = data;
      next();
    }

    function failure(error) {
      next(error);
    }
  }

  function addCustomer(req, res, next) {
    CustomerService.createCustomer(req.body)
      .then(success)
      .catch(failure);

    function success(data) {
      req.response = data;
      next();
    }

    function failure(error) {
      next(error);
    }
  }
})();
