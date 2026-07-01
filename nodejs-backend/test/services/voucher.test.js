const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("voucher service", async () => {
  let thisService;
  let voucherCreated;
  let usersServiceResults;
  let users;

  const voucherCategoryCreated = await app.service("voucherCategory").Model.create({"voucherCode":"new value","voucherTitle":"new value","description":"new value","category":"parentObjectId","categoryName":"new value"});

  beforeEach(async () => {
    thisService = await app.service("voucher");

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
    assert.ok(thisService, "Registered the service (voucher)");
  });

  describe("#create", () => {
    const options = {"voucherCode":"new value","voucherTitle":"new value","description":"new value","category":`${voucherCategoryCreated._id}`,"categoryName":"new value","discountType":"new value","discountValue":23,"minPurchaseAmount":23,"maxDiscountAmount":23,"startDate":"2026-07-01T03:53:35.898Z","expiryDate":"2026-07-01T03:53:35.898Z","quantityLimit":23,"quantityUsed":23,"status":"new value"};

    beforeEach(async () => {
      voucherCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new voucher", () => {
      assert.strictEqual(voucherCreated.voucherCode, options.voucherCode);
assert.strictEqual(voucherCreated.voucherTitle, options.voucherTitle);
assert.strictEqual(voucherCreated.description, options.description);
assert.strictEqual(voucherCreated.category.toString(), options.category.toString());
assert.strictEqual(voucherCreated.discountType, options.discountType);
assert.strictEqual(voucherCreated.discountValue, options.discountValue);
assert.strictEqual(voucherCreated.minPurchaseAmount, options.minPurchaseAmount);
assert.strictEqual(voucherCreated.maxDiscountAmount, options.maxDiscountAmount);
assert.strictEqual(voucherCreated.startDate.toISOString(), options.startDate);
assert.strictEqual(voucherCreated.expiryDate.toISOString(), options.expiryDate);
assert.strictEqual(voucherCreated.quantityLimit, options.quantityLimit);
assert.strictEqual(voucherCreated.quantityUsed, options.quantityUsed);
assert.strictEqual(voucherCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a voucher by ID", async () => {
      const retrieved = await thisService.Model.findById(voucherCreated._id);
      assert.strictEqual(retrieved._id.toString(), voucherCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"voucherCode":"updated value","voucherTitle":"updated value","description":"updated value","category":`${voucherCategoryCreated._id}`,"discountType":"updated value","discountValue":100,"minPurchaseAmount":100,"maxDiscountAmount":100,"startDate":"2026-07-01T03:53:35.898Z","expiryDate":"2026-07-01T03:53:35.898Z","quantityLimit":100,"quantityUsed":100,"status":"updated value"};

    it("should update an existing voucher ", async () => {
      const voucherUpdated = await thisService.Model.findByIdAndUpdate(
        voucherCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(voucherUpdated.voucherCode, options.voucherCode);
assert.strictEqual(voucherUpdated.voucherTitle, options.voucherTitle);
assert.strictEqual(voucherUpdated.description, options.description);
assert.strictEqual(voucherUpdated.category.toString(), options.category.toString());
assert.strictEqual(voucherUpdated.discountType, options.discountType);
assert.strictEqual(voucherUpdated.discountValue, options.discountValue);
assert.strictEqual(voucherUpdated.minPurchaseAmount, options.minPurchaseAmount);
assert.strictEqual(voucherUpdated.maxDiscountAmount, options.maxDiscountAmount);
assert.strictEqual(voucherUpdated.startDate.toISOString(), options.startDate);
assert.strictEqual(voucherUpdated.expiryDate.toISOString(), options.expiryDate);
assert.strictEqual(voucherUpdated.quantityLimit, options.quantityLimit);
assert.strictEqual(voucherUpdated.quantityUsed, options.quantityUsed);
assert.strictEqual(voucherUpdated.status, options.status);
    });
  });

  describe("#delete", async () => {
    it("should delete a voucher", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("voucherCategory").Model.findByIdAndDelete(voucherCategoryCreated._id);;

      const voucherDeleted = await thisService.Model.findByIdAndDelete(voucherCreated._id);
      assert.strictEqual(voucherDeleted._id.toString(), voucherCreated._id.toString());
    });
  });
});