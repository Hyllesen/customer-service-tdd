(() => {
  "use strict";

  const CustomerModel = require("./customer.module")().CustomerModel;
  module.exports = {
    createCustomer,
    fetchCustomers,
    fetchCustomerById,
    updateCustomer,
    deleteCustomer
  };

  function deleteCustomer(customerId) {
    return CustomerModel.findByIdAndDelete(customerId).exec();
  }

  function updateCustomer(customerId, customer) {
    return CustomerModel.findByIdAndUpdate(customerId, customer, {
      new: true
    }).exec();
  }

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
