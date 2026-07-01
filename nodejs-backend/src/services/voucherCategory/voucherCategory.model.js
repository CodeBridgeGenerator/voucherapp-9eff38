
    module.exports = function (app) {
        const modelName = "voucher_category";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            categoryName: { type:  String , required: true, maxLength: 100, index: true, trim: true, comment: "Category Name, p, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , maxLength: 500, trim: true, comment: "Description, inputTextarea, false, true, true, true, true, true, false, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };