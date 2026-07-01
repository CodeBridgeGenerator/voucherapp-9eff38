
    module.exports = function (app) {
        const modelName = "voucher_report";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            voucherCode: { type:  String , index: true, trim: true, comment: "Voucher Code, p, false, false, false, true, false, true, true, , , , ," },
totalIssued: { type: Number, comment: "Total Issued, p_number, false, false, false, true, false, true, true, , , , ," },
totalRedeemed: { type: Number, comment: "Total Redeemed, p_number, false, false, false, true, false, true, true, , , , ," },
redemptionRate: { type: Number, comment: "Redemption Rate (%), p_number, false, false, false, true, false, true, true, , , , ," },
totalDiscountGiven: { type: Number, comment: "Total Discount Given, currency, false, false, false, true, false, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };