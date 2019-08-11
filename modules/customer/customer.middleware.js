(() => {
  "use strict";
  module.exports = {
    addCustomer,
    getCustomers,
    getCustomerById
  };
  const CustomerService = require("./customer.module")().CustomerService;

  function getCustomerById(req, res, next) {
    CustomerService.fetchCustomerById(req.params.customerId)
      .then(success)
      .catch(failure);

    function success(data) {
      req.response = data;
      next();
    }

    function failure(err) {
      next(err);
    }
  }

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
