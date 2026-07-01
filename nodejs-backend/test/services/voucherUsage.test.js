const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("voucherUsage service", async () => {
  let thisService;
  let voucherUsageCreated;
  let usersServiceResults;
  let users;

  const voucherCategoryCreated = await app.service("voucherCategory").Model.create({"voucherCode":"new value","voucherTitle":"new value","description":"new value","category":"parentObjectId","categoryName":"new value"});
const voucherCreated = await app.service("voucher").Model.create({"voucherCode":"new value","voucherTitle":"new value","description":"new value","category":`${voucherCategoryCreated._id}`,"categoryName":"new value","discountType":"new value","discountValue":23,"minPurchaseAmount":23,"maxDiscountAmount":23,"startDate":"2026-07-01T03:53:35.910Z","expiryDate":"2026-07-01T03:53:35.910Z","quantityLimit":23,"quantityUsed":23,"status":"new value"});

  beforeEach(async () => {
    thisService = await app.service("voucherUsage");

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
    assert.ok(thisService, "Registered the service (voucherUsage)");
  });

  describe("#create", () => {
    const options = {"voucherCode":`${voucherCreated._id}`,"voucherTitle":"new value","description":"new value","category":`${voucherCategoryCreated._id}`,"categoryName":"new value","discountType":"new value","discountValue":23,"minPurchaseAmount":23,"maxDiscountAmount":23,"startDate":"2026-07-01T03:53:35.910Z","expiryDate":"2026-07-01T03:53:35.910Z","quantityLimit":23,"quantityUsed":23,"status":"new value","customerName":"new value","customerEmail":"new value","transactionAmount":23,"discountAmount":23,"usageDate":"2026-07-01T03:53:35.910Z"};

    beforeEach(async () => {
      voucherUsageCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new voucherUsage", () => {
      assert.strictEqual(voucherUsageCreated.voucherCode.toString(), options.voucherCode.toString());
assert.strictEqual(voucherUsageCreated.customerName, options.customerName);
assert.strictEqual(voucherUsageCreated.customerEmail, options.customerEmail);
assert.strictEqual(voucherUsageCreated.transactionAmount, options.transactionAmount);
assert.strictEqual(voucherUsageCreated.discountAmount, options.discountAmount);
assert.strictEqual(voucherUsageCreated.usageDate.toISOString(), options.usageDate);
assert.strictEqual(voucherUsageCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a voucherUsage by ID", async () => {
      const retrieved = await thisService.Model.findById(voucherUsageCreated._id);
      assert.strictEqual(retrieved._id.toString(), voucherUsageCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"voucherCode":`${voucherCreated._id}`,"customerName":"updated value","customerEmail":"updated value","transactionAmount":100,"discountAmount":100,"usageDate":"2026-07-01T03:53:35.910Z","status":"updated value"};

    it("should update an existing voucherUsage ", async () => {
      const voucherUsageUpdated = await thisService.Model.findByIdAndUpdate(
        voucherUsageCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(voucherUsageUpdated.voucherCode.toString(), options.voucherCode.toString());
assert.strictEqual(voucherUsageUpdated.customerName, options.customerName);
assert.strictEqual(voucherUsageUpdated.customerEmail, options.customerEmail);
assert.strictEqual(voucherUsageUpdated.transactionAmount, options.transactionAmount);
assert.strictEqual(voucherUsageUpdated.discountAmount, options.discountAmount);
assert.strictEqual(voucherUsageUpdated.usageDate.toISOString(), options.usageDate);
assert.strictEqual(voucherUsageUpdated.status, options.status);
    });
  });

  describe("#delete", async () => {
    it("should delete a voucherUsage", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("voucherCategory").Model.findByIdAndDelete(voucherCategoryCreated._id);
await app.service("voucher").Model.findByIdAndDelete(voucherCreated._id);;

      const voucherUsageDeleted = await thisService.Model.findByIdAndDelete(voucherUsageCreated._id);
      assert.strictEqual(voucherUsageDeleted._id.toString(), voucherUsageCreated._id.toString());
    });
  });
});