const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("voucherCategory service", async () => {
  let thisService;
  let voucherCategoryCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("voucherCategory");

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
    assert.ok(thisService, "Registered the service (voucherCategory)");
  });

  describe("#create", () => {
    const options = {"categoryName":"new value","description":"new value"};

    beforeEach(async () => {
      voucherCategoryCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new voucherCategory", () => {
      assert.strictEqual(voucherCategoryCreated.categoryName, options.categoryName);
assert.strictEqual(voucherCategoryCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a voucherCategory by ID", async () => {
      const retrieved = await thisService.Model.findById(voucherCategoryCreated._id);
      assert.strictEqual(retrieved._id.toString(), voucherCategoryCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"categoryName":"updated value","description":"updated value"};

    it("should update an existing voucherCategory ", async () => {
      const voucherCategoryUpdated = await thisService.Model.findByIdAndUpdate(
        voucherCategoryCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(voucherCategoryUpdated.categoryName, options.categoryName);
assert.strictEqual(voucherCategoryUpdated.description, options.description);
    });
  });

  describe("#delete", async () => {
    it("should delete a voucherCategory", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const voucherCategoryDeleted = await thisService.Model.findByIdAndDelete(voucherCategoryCreated._id);
      assert.strictEqual(voucherCategoryDeleted._id.toString(), voucherCategoryCreated._id.toString());
    });
  });
});