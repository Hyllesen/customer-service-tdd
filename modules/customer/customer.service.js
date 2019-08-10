(() => {
  "use strict";

  const CustomerModel = require("./customer.module")().CustomerModel;
  module.exports = { createCustomer, fetchCustomers, fetchCustomersById };

  function createCustomer(customer) {
    return CustomerModel.create(customer);
  }

  function fetchCustomers() {
    return CustomerModel.find({}).exec();
  }

  function fetchCustomersById(id) {
    return CustomerModel.findById(id).exec();
  }
})();
