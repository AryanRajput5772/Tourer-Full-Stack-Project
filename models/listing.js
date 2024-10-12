const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js"); ///One to many relation in database

const listingSchema = new Schema({
  title: { type: String },
  description: { type: String },
  image: {
    url: String,
    filename: String,
  },
  price: { type: Number, default: 1000, set: (v) => (v === "" ? 1000 : v) },
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    coordinates: {
      type: [Number],
      required: true,
    },
  },

  category: {
    type: String,
    enum: [
      "Mountains",
      "Beach",
      "Arctic",
      "Farms",
      "Camping",
      "Boats",
      "Villas",
      "Amazing Pools",
      "Iconic cities",
      "Domes",
    ],
    required: true,
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    console.log(listing);
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
