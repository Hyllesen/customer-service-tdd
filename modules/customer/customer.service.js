(() => {
  "use strict";

  const CustomerModel = require("./customer.module")().CustomerModel;
  module.exports = {
    createCustomer,
    fetchCustomers,
    fetchCustomerById
  };

  function createCustomer(customer) {
    return CustomerModel.create(customer);
  }

  function fetchCustomers() {
    return CustomerModel.find({}).exec();
  }

  function fetchCustomerById(id) {
    return CustomerModel.findById(id).exec();
  }
})();
