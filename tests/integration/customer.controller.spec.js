"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
const app = require("../../app");

const Fixtures = require("../fixtures/fixtures");
const CustomerFixture = Fixtures.CustomerFixture;

const baseUri = "/customers";

describe("CustomerController", () => {
  describe("POST " + baseUri, () => {
    it("should add new customer", () => {
      request(app)
        .post(baseUri)
        .send(CustomerFixture.newCustomer)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.not.equal({});
          expect(res.body._id).to.not.equal(undefined);
          expect(res.body.firstName).to.equal(
            CustomerFixture.createdCustomer.firstName
          );
          done();
          expect(res.status).to.equal(200);
          expect(res.body).to.not.equal({});
          expect(res.body._id).to.not.equal(undefined);
          expect(res.body.firstName).to.equal(
            CustomerFixture.createdCustomer.firstName
          );
        });
    });
  });
});
