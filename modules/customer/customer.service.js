(() => {
  "use strict";

  const CustomerModel = require("./customer.module")().CustomerModel;
  module.exports = { createCustomer };

  function createCustomer(customer) {
    return CustomerModel.create(customer);
  }
})();
