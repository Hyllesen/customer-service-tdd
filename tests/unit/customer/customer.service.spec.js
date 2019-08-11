"use strict";

const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
require("sinon-mongoose");

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

  describe("updateCustomer", () => {
    let existingCustomer, expectedModifiedCustomer, expectedError;
    it("should successfully update Customer", () => {
      expectedModifiedCustomer = CustomerFixture.modifiedCustomer;
      existingCustomer = CustomerFixture.createdCustomer;

      CustomerModelMock.expects("findByIdAndUpdate")
        .withArgs(existingCustomer._id, existingCustomer, { new: true })
        .chain("exec")
        .resolves(expectedModifiedCustomer);
      return CustomerService.updateCustomer(
        existingCustomer._id,
        existingCustomer
      ).then(data => {
        CustomerModelMock.verify();
        expect(data).to.deep.equal(expectedModifiedCustomer);
      });
    });
    it("should throw error while updating customer", () => {
      expectedError = ErrorFixture.unknownError;
      existingCustomer = CustomerFixture.createdCustomer;

      CustomerModelMock.expects("findByIdAndUpdate")
        .withArgs(existingCustomer._id, existingCustomer, { new: true })
        .chain("exec")
        .rejects(expectedError);

      return CustomerService.updateCustomer(
        existingCustomer._id,
        existingCustomer
      ).catch(error => {
        CustomerModelMock.verify();
        expect(error).to.deep.equal(expectedError);
      });
    });
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
    it("should throw error while creating customer", () => {
      expectedError = ErrorFixture.unknownError;
      newCustomer = CustomerFixture.newCustomer;

      CustomerModelMock.expects("create")
        .withArgs(newCustomer)
        .rejects(expectedError);

      return CustomerService.createCustomer(newCustomer).catch(error => {
        CustomerModelMock.verify();
        expect(error).to.deep.equal(expectedError);
      });
    });
  });

  describe("fetchCustomerById", () => {
    let expectedFetchedCustomer, customerId, expectedError;
    it("should successfully fetch the customer by id", () => {
      expectedFetchedCustomer = CustomerFixture.createdCustomer;
      customerId = expectedFetchedCustomer._id;

      CustomerModelMock.expects("findById")
        .withArgs(customerId)
        .chain("exec")
        .resolves(expectedFetchedCustomer);

      return CustomerService.fetchCustomerById(customerId).then(data => {
        CustomerModelMock.verify();
        expect(data).to.deep.equal(expectedFetchedCustomer);
      });
    });
    it("should throw error while getting customer by id", () => {
      customerId = CustomerFixture.createdCustomer._id;
      expectedError = ErrorFixture.unknownError;

      CustomerModelMock.expects("findById")
        .withArgs(customerId)
        .chain("exec")
        .rejects(expectedError);

      return CustomerService.fetchCustomerById(customerId).catch(error => {
        CustomerModelMock.verify();
        expect(error).to.deep.equal(expectedError);
      });
    });
  });

  describe("fetchCustomers", () => {
    let expectedCustomers, expectedError;
    it("should successfully fetch all customers", () => {
      expectedCustomers = CustomerFixture.customers;
      CustomerModelMock.expects("find")
        .withArgs({})
        .chain("exec")
        .resolves(expectedCustomers);
      return CustomerService.fetchCustomers().then(data => {
        CustomerModelMock.verify();
        expect(data).to.deep.equal(expectedCustomers);
      });
    });
    it("should throw error while fetching all customers", () => {
      expectedError = ErrorFixture.unknownError;

      CustomerModelMock.expects("find")
        .withArgs({})
        .chain("exec")
        .rejects(expectedError);

      return CustomerService.fetchCustomers().catch(error => {
        CustomerModelMock.verify();
        expect(error).to.deep.equal(expectedError);
      });
    });
  });
});
