
    module.exports = function (app) {
        const modelName = "voucher_usage";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            voucherCode: { type: Schema.Types.ObjectId, ref: "voucher", comment: "Voucher Code, dropdown, false, true, true, true, true, true, true, voucher, voucher, one-to-one, voucherCode," },
customerName: { type:  String , required: true, maxLength: 100, index: true, trim: true, comment: "Customer Name, p, false, true, true, true, true, true, true, , , , ," },
customerEmail: { type:  String , required: true, lowercase: true, maxLength: 150, index: true, trim: true, comment: "Customer Email, p, false, true, true, true, true, true, true, , , , ," },
transactionAmount: { type: Number, required: true, max: 100000, comment: "Transaction Amount, currency, false, true, true, true, true, true, true, , , , ," },
discountAmount: { type: Number, max: 10000, comment: "Discount Amount, currency, false, true, true, true, true, true, true, , , , ," },
usageDate: { type: Date, comment: "Usage Date, p_date, false, false, false, true, false, true, true, , , , ," },
status: { type:  String , required: true, index: true, trim: true, comment: "Status, dropdown, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };