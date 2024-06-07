const mongoose=require('mongoose');
const Order = new mongoose.Schema( {
    costumerName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      max: 50,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    // products: {
    //   type: Array,
    //   default: [],
    // },
    totalAmount: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

module.exports=mongoose.model("order",Order) 