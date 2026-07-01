
    module.exports = function (app) {
        const modelName = "voucher";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            voucherCode: { type:  String , required: true, unique: true, uppercase: true, maxLength: 20, index: true, trim: true, comment: "Voucher Code, p, false, true, false, true, true, true, true, , , , ," },
voucherTitle: { type:  String , required: true, maxLength: 150, index: true, trim: true, comment: "Voucher Title, p, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , comment: "Description, inputTextarea, false, true, true, true, true, true, false, , , , ," },
category: { type: Schema.Types.ObjectId, ref: "voucher_category", comment: "Category, dropdown, false, true, true, true, true, true, true, voucherCategory, voucher_category, one-to-one, categoryName," },
discountType: { type:  String , required: true, trim: true, comment: "Discount Type, dropdown, false, true, true, true, true, true, true, , , , ," },
discountValue: { type: Number, required: true, max: 10000, comment: "Discount Value, currency, false, true, true, true, true, true, true, , , , ," },
minPurchaseAmount: { type: Number, max: 100000, comment: "Min Purchase Amount, currency, false, true, true, true, true, true, true, , , , ," },
maxDiscountAmount: { type: Number, max: 100000, comment: "Max Discount Amount, currency, false, true, true, true, true, true, true, , , , ," },
startDate: { type: Date, required: true, comment: "Start Date, p_date, false, true, true, true, true, true, true, , , , ," },
expiryDate: { type: Date, required: true, comment: "Expiry Date, p_date, false, true, true, true, true, true, true, , , , ," },
quantityLimit: { type: Number, required: true, max: 1000000, comment: "Quantity Limit, p_number, false, true, true, true, true, true, true, , , , ," },
quantityUsed: { type: Number, max: 1000000, default: 0, comment: "Quantity Used, p_number, false, false, false, true, false, true, true, , , , ," },
status: { type:  String , required: true, index: true, trim: true, comment: "Status, dropdown, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };