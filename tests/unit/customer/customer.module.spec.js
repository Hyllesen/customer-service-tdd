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

  it("should confirm CustomerController function exist", () => {
    expect(CustomerModule().CustomerController).to.be.a("function");
  });

  it("should confirm CustomerMiddleware object exits", () => {
    expect(CustomerModule().CustomerMiddleware).to.be.a("object");
  });
});
