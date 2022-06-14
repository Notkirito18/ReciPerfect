const mongoose = require("mongoose");

const VoucherSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  unit: {
    type: String,
  },
  amount: {
    type: Number,
  },
});

module.exports = {
  model: mongoose.model("Voucher", VoucherSchema),
  schema: VoucherSchema,
};
