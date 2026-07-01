const voucherCategory = require("./voucherCategory/voucherCategory.service.js");
const voucher = require("./voucher/voucher.service.js");
const voucherUsage = require("./voucherUsage/voucherUsage.service.js");
const voucherReport = require("./voucherReport/voucherReport.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(voucherCategory);
  app.configure(voucher);
  app.configure(voucherUsage);
  app.configure(voucherReport);
    // ~cb-add-configure-service-name~
};
