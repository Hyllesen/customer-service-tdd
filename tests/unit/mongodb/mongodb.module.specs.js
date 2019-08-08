const chai = require("chai");
const expect = chai.expect;

const MongoDBUtil = require("../../../modules/mongodb/mongodb.module")
  .MongoDBUtil;

describe("MongoDBModule", () => {
  describe("mongodb.module file", () => {
    it("should read the mongodb.module file", () => {
      expect(MongoDBUtil).to.be.a("object");
    });
    it("should confirm MongoDBUtil exist", () => {
      expect(MongoDBUtil).to.be.a("object");
    });
  });
});
