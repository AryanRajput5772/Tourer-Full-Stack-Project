const User = require("../models/user.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

///////////////////////////////passport-local-signup-Routes///////////////////////////////

module.exports.renderSignUpform = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    // console.log(registeredUser);
    req.login(registeredUser, (err) => {
      //we use req.login to automatic login user after signup
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome To Tourer");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

///////////////////////Passport-Google-signup-routes//////////////////////////

module.exports.googleSignUp = (req, res) => {
  req.flash("success", "Welcome To Tourer");
  res.redirect("/listings");
};

module.exports.googleFailure = (req, res) => {
  req.flash("error", "Something went Wrong");
  res.redirect("/signup");
};

///////////////////////Passport-Github-signup-routes//////////////////////////

module.exports.githubSignUp = (req, res) => {
  // Successful authentication, redirect home.
  req.flash("success", "Welcome To Tourer");
  res.redirect("/listings");
};

module.exports.githubFailure = (req, res) => {
  req.flash("error", "Something went Wrong");
  res.redirect("/signup");
};
///////////////////////Passport-Local-login/logout-routes//////////////////////////

module.exports.renderLoginform = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome to Tourer! You are logged in");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};

///////////////////Profile-Routes////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports.profileRoute = async (req, res) => {
  let str = res.locals.currUser._id;
  // console.log(str);
  const listings = await Listing.find({
    owner: str,
  })
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  const listings2 = await Listing.find({})
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  let matchingListings = [];
  for (let listing of listings) {
    matchingListings.push(listing);
    // console.log(listing);
  }

  let matchingReview = [];
  for (let listing of listings2) {
    for (let review of listing.reviews) {
      if (review.author.email == res.locals.currUser.email) {
        matchingReview.push(review);
      }
    }
  }

  // console.log(matchingReview);

  res.render("users/profile.ejs", { matchingListings, matchingReview });
};

// module.exports.renderEditProfileForm =;

// module.exports.editProfile = ;

//////////Review Delete from profile/////////////////////////////////
module.exports.deleteReviewFromProfile = async (req, res) => {
  let { reviewId } = req.params;
  // await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); ///"$pull"--> This is mongo pull operator. It is used to remove from an existing array all instances of a value or values that match a specified condition
  let result = await Review.findByIdAndDelete(reviewId);
  // console.log(result);
  req.flash("success", "Review Deleted");
  // let redirectUrl = res.locals.redirectUrl || `/listings/${id}`;

  res.redirect("/profile");
};
