"use strict";
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const httpMocks = require("node-mocks-http");
const bluebird = require("bluebird");
const Promise = bluebird.Promise;

const CustomerModule = require("../../../modules/customer/customer.module")();
const CustomerMiddleware = CustomerModule.CustomerMiddleware;
const CustomerService = CustomerModule.CustomerService;

const Fixtures = require("../../fixtures/fixtures");
const CustomerFixture = Fixtures.CustomerFixture;
const ErrorFixture = Fixtures.ErrorFixture;

let req, res, next;

describe("CustomerMiddleware", () => {
  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = sinon.spy();
  });
  describe("addCustomer", () => {
    let createCustomer,
      createCustomerPromise,
      expectedCreatedCustomer,
      expectedError;

    beforeEach(() => {
      createCustomer = sinon.stub(CustomerService, "createCustomer");
      req.body = CustomerFixture.newCustomer;
    });

    afterEach(() => {
      createCustomer.restore();
    });

    it("should successfully create new customer", () => {
      expectedCreatedCustomer = CustomerFixture.createdCustomer;

      createCustomerPromise = Promise.resolve(expectedCreatedCustomer);

      createCustomer.withArgs(req.body).returns(createCustomerPromise);

      CustomerMiddleware.addCustomer(req, res, next);
      sinon.assert.callCount(createCustomer, 1);
      return createCustomerPromise.then(() => {
        expect(req.response).to.be.a("object");
        expect(req.response).to.deep.equal(expectedCreatedCustomer);
        sinon.assert.callCount(next, 1);
      });
    });
    it("should throw error while creating the new customer", () => {
      expectedError = ErrorFixture.unknownError;
      createCustomerPromise = Promise.reject(expectedError);
      createCustomer.withArgs(req.body).returns(createCustomerPromise);
      CustomerMiddleware.addCustomer(req, res, next);
      sinon.assert.callCount(createCustomer, 1);
      return createCustomerPromise.catch(error => {
        expect(error).to.be.a("object");
        expect(error).to.be.deep.equal(expectedError);
      });
    });
  });
});
