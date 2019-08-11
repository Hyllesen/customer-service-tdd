(() => {
  "use strict";
  module.exports = {
    addCustomer,
    getCustomers,
    getCustomerById,
    modifyCustomer,
    deleteCustomer
  };
  const CustomerService = require("./customer.module")().CustomerService;

  function deleteCustomer(req, res, next) {
    CustomerService.deleteCustomer(req.params.customerId)
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

  function modifyCustomer(req, res, next) {
    CustomerService.updateCustomer(req.params.customerId, req.body)
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
