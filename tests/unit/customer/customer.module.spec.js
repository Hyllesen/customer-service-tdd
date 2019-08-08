const chai = require("chai");
const expect = chai.expect;

const CustomerModule = require("../../../modules/customer/customer.module");

describe("CustomerModule", () => {
  it("should confirm CustomerModule function exist", () => {
    expect(CustomerModule).to.be.a("function");
  });

  it("should confirm CustomerModule function returns an object", () => {
    expect(CustomerModule()).to.be.a("object");
  });
});
