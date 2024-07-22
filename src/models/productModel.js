"use strict";


const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
      maxLength: 50,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxLength: 500,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      max: 1000000,
    },
    discountPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 3,
    },
    stock: {
      type: Number,
      min: 0,
      max: 10000000,
      default: 0,
    },
    brand: {
      type: String,
      trim: true,
      required: true,
      maxLength: 50,
    },
    thumbnail: {
      type: String,
      trim: true,
      maxLength: 1000,
      required: true,
      validate: [
        (value) => value.startsWith("https://") || value.startsWith("http://"),
        "Invalid Url!",
      ],
    },
    images: {
      type: [String],
      trim: true,
      maxLength: 1000,
      validate: (value) => {
        if (value.length > 10) {
          throw new Error("Urls max limit is 10");
          return false;
        }

        if (
          !value.every(
            (item) => item.startsWith("https://") || item.startsWith("http://")
          )
        ) {
          throw new Error("Invalid Url!");
          return false;
        }
        return true;
      },
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
