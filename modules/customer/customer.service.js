(() => {
  "use strict";

  const CustomerModel = require("./customer.module")().CustomerModel;
  module.exports = { createCustomer, fetchCustomers };

  function createCustomer(customer) {
    return CustomerModel.create(customer);
  }

  function fetchCustomers() {
    return CustomerModel.find({}).exec();
  }
})();
