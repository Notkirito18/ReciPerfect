const mongoose = require("mongoose");

const VoucherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    unit: {
      type: String,
    },
    amount: {
      type: Number,
    },
  },
  { _id: false }
);

module.exports = {
  model: mongoose.model("Voucher", VoucherSchema),
  schema: VoucherSchema,
};
