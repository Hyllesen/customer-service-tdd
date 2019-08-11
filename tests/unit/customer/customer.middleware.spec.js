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

  describe("getCustomerById", () => {
    let fetchCustomerById,
      fetchCustomerByIdPromise,
      expectedCustomer,
      expectedError;

    beforeEach(() => {
      fetchCustomerById = sinon.stub(CustomerService, "fetchCustomerById");
    });

    afterEach(() => {
      fetchCustomerById.restore();
    });

    it("should successfully fetch the customer by id", () => {
      expectedCustomer = CustomerFixture.createdCustomer;
      fetchCustomerByIdPromise = Promise.resolve(expectedCustomer);
      fetchCustomerById
        .withArgs(req.params.CustomerId)
        .returns(fetchCustomerByIdPromise);
      CustomerMiddleware.getCustomerById(req, res, next);
      sinon.assert.callCount(fetchCustomerById, 1);

      return fetchCustomerByIdPromise.then(() => {
        expect(req.response).to.be.a("object");
        expect(req.response).to.deep.equal(expectedCustomer);
        sinon.assert.callCount(next, 1);
      });
    });
  });

  describe("deleteCustomer", () => {
    let deleteCustomer, deleteCustomerPromise, expectedCustomer, expectedError;

    beforeEach(() => {
      deleteCustomer = sinon.stub(CustomerService, "deleteCustomer");
    });

    afterEach(() => {
      deleteCustomer.restore();
    });
    it("should successfully remove the customer", () => {
      expectedCustomer = CustomerFixture.createdCustomer;
      deleteCustomerPromise = Promise.resolve(expectedCustomer);
      deleteCustomer
        .withArgs(req.params.customerId)
        .returns(deleteCustomerPromise);
      CustomerMiddleware.deleteCustomer(req, res, next);
      sinon.assert.callCount(deleteCustomer, 1);
      return deleteCustomerPromise.then(() => {
        expect(req.response).to.be.a("object");
        expect(req.response).to.deep.equal(expectedCustomer);
        sinon.assert.callCount(next, 1);
      });
    });

    it("should throw error while removing customer", () => {
      expectedError = ErrorFixture.unknownError;
      deleteCustomerPromise = Promise.reject(expectedError);
      deleteCustomer
        .withArgs(req.params.customerId)
        .returns(deleteCustomerPromise);

      CustomerMiddleware.deleteCustomer(req, res, next);
      sinon.assert.callCount(deleteCustomer, 1);
      return deleteCustomerPromise.catch(error => {
        expect(error).to.be.a("object");
        expect(error).to.deep.equal(expectedError);
      });
    });
  });

  describe("modifyCustomer", () => {
    let updateCustomer,
      updateCustomerPromise,
      expectedModifiedCustomer,
      expectedError;

    beforeEach(() => {
      updateCustomer = sinon.stub(CustomerService, "updateCustomer");

      req.body = CustomerFixture.modifiedCustomer;
      req.params.customerId = req.body._id;
    });

    afterEach(() => {
      updateCustomer.restore();
    });

    it("should successfully modify the customer details", () => {
      expectedModifiedCustomer = CustomerFixture.modifiedCustomer;
      updateCustomerPromise = Promise.resolve(expectedModifiedCustomer);
      updateCustomer
        .withArgs(req.params.customerId, req.body)
        .returns(updateCustomerPromise);
      CustomerMiddleware.modifyCustomer(req, res, next);
      sinon.assert.callCount(updateCustomer, 1);
      return updateCustomerPromise.then(() => {
        expect(req.response).to.be.a("object");
        expect(req.response).to.deep.equal(expectedModifiedCustomer);
        sinon.assert.callCount(next, 1);
      });
    });

    it("should throw error while modifying customer by id", () => {
      expectedError = ErrorFixture.unknownError;
      updateCustomerPromise = Promise.reject(expectedError);
      updateCustomer
        .withArgs(req.params.customerId, req.body)
        .returns(updateCustomerPromise);

      CustomerMiddleware.modifyCustomer(req, res, next);
      sinon.assert.callCount(updateCustomer, 1);
      return updateCustomerPromise.catch(error => {
        expect(error).to.be.a("object");
        expect(error).to.deep.equal(expectedError);
      });
    });
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
