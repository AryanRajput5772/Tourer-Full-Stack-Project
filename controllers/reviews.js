const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.CreateReview = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created ! ");

  res.redirect("/listings/" + id); //This method is used by me
  // res.redirect(`/listings/${listing._id}`);/////This method is used by mam
};

module.exports.DestroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); ///"$pull"--> This is mongo pull operator. It is used to remove from an existing array all instances of a value or values that match a specified condition
  let result = await Review.findByIdAndDelete(reviewId);
  console.log(result);
  req.flash("success", "Review Deleted");

  res.redirect(`/listings/${id}`);
};
