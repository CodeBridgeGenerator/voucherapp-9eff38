const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("voucherReport service", async () => {
  let thisService;
  let voucherReportCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("voucherReport");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (voucherReport)");
  });

  describe("#create", () => {
    const options = {"voucherCode":"new value","totalIssued":23,"totalRedeemed":23,"redemptionRate":23,"totalDiscountGiven":23};

    beforeEach(async () => {
      voucherReportCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new voucherReport", () => {
      assert.strictEqual(voucherReportCreated.voucherCode, options.voucherCode);
assert.strictEqual(voucherReportCreated.totalIssued, options.totalIssued);
assert.strictEqual(voucherReportCreated.totalRedeemed, options.totalRedeemed);
assert.strictEqual(voucherReportCreated.redemptionRate, options.redemptionRate);
assert.strictEqual(voucherReportCreated.totalDiscountGiven, options.totalDiscountGiven);
    });
  });

  describe("#get", () => {
    it("should retrieve a voucherReport by ID", async () => {
      const retrieved = await thisService.Model.findById(voucherReportCreated._id);
      assert.strictEqual(retrieved._id.toString(), voucherReportCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"voucherCode":"updated value","totalIssued":100,"totalRedeemed":100,"redemptionRate":100,"totalDiscountGiven":100};

    it("should update an existing voucherReport ", async () => {
      const voucherReportUpdated = await thisService.Model.findByIdAndUpdate(
        voucherReportCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(voucherReportUpdated.voucherCode, options.voucherCode);
assert.strictEqual(voucherReportUpdated.totalIssued, options.totalIssued);
assert.strictEqual(voucherReportUpdated.totalRedeemed, options.totalRedeemed);
assert.strictEqual(voucherReportUpdated.redemptionRate, options.redemptionRate);
assert.strictEqual(voucherReportUpdated.totalDiscountGiven, options.totalDiscountGiven);
    });
  });

  describe("#delete", async () => {
    it("should delete a voucherReport", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const voucherReportDeleted = await thisService.Model.findByIdAndDelete(voucherReportCreated._id);
      assert.strictEqual(voucherReportDeleted._id.toString(), voucherReportCreated._id.toString());
    });
  });
});