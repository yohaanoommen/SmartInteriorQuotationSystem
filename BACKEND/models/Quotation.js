import mongoose from "mongoose";

const componentSchema = new mongoose.Schema({
  room: String,
  name: String,
  variant: String,
  quantity: Number,
  unit: String,
  rate: Number,
});

const quotationSchema = new mongoose.Schema(
  {
    quotationNumber: {
      type: String,
      required: true,
      unique: true,
    },

    customer: {
      name: String,
      phone: String,
      address: String,
    },

    project: {
      propertyType: String,
      projectType: String,
      squareFeet: Number,
    },

    components: [componentSchema],

    total: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Quotation", quotationSchema);