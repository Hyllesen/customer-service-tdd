(() => {
  "use strict";

  module.exports = init;

  function init() {
    return { CustomerController: require("./customer.controller") };
  }
})();
