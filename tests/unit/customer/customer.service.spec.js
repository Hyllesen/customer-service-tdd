"use strict";

const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const mongoose = require("mongoose");

const CustomerModule = require("../../../modules/customer/customer.module");
const CustomerModel = CustomerModule().CustomerModel;
const CustomerService = CustomerModule().CustomerService;

const Fixtures = require("../../fixtures/fixtures");
const CustomerFixture = Fixtures.CustomerFixture;
const ErrorFixture = Fixtures.ErrorFixture;

let CustomerModelMock;

describe("CustomerService", () => {
  beforeEach(() => {
    CustomerModelMock = sinon.mock(CustomerModel);
  });

  afterEach(() => {
    CustomerModelMock.restore();
    mongoose.models = {};
    mongoose.modelSchemas = {};
    return mongoose.connection.close();
  });

  describe("createCustomer", () => {
    let newCustomer, expectedCreatedCustomer, expectedError;
    it("should successfully create new customer", () => {
      newCustomer = CustomerFixture.newCustomer;
      expectedCreatedCustomer = CustomerFixture.createdCustomer;
      CustomerModelMock.expects("create")
        .withArgs(newCustomer)
        .resolves(expectedCreatedCustomer);
      return CustomerService.createCustomer(newCustomer).then(data => {
        CustomerModelMock.verify();
        expect(data).to.deep.equal(expectedCreatedCustomer);
      });
    });
  });
});
