const chai = require("chai");
const expect = chai.expect;

const MongoDBUtil = require("../../../modules/mongodb/mongodb.util");

describe("MongoDBUtil", () => {
  describe("mongodb.util file", () => {
    it("should test first behaiviour", () => {
      //Write expectations for first behaivor here
    });
    it("should confirm init function exist", () => {
      expect(MongoDBUtil.init).to.be.a("function");
    });
  });
});
