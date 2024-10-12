const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {
  isLoggedIn,
  saveRedirectUrl,
  isReviewAuthor,
} = require("../middleware.js");
const Review = require("../models/review.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const { list } = require("postcss");
const upload = multer({ storage });

const userController = require("../controllers/users.js");

////////////////passport-local Routes//////////////////////////
router
  .route("/signup")
  .get(userController.renderSignUpform)
  .post(wrapAsync(userController.signup));

//////////////Passport-google Routes//////////////////////////
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
  }),
  userController.googleSignUp
);

router.get("/failure", userController.googleFailure);

/////////////////////////////passport-github Routes//////////////////////////////////
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/failure" }),
  userController.githubSignUp
);

router.get("/failure", userController.githubFailure);

////////////passport-local-Login/logout Routes///////////////////////////////////////////////

router
  .route("/login")
  .get(userController.renderLoginform)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

router.get("/logout", userController.logout);

///////////////////Profile-Routes///////////////////////////////

router.get("/profile", isLoggedIn, userController.profileRoute);

router.get("/profile/edit", isLoggedIn, (req, res) => {
  res.render("users/edit.ejs");
});

router.patch(
  "/editProfile/:id",
  upload.single("image"),
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { photo: req.file.path });
    res.redirect("/profile");
  })
);

//////////Review Delete from profile/////////////////////////////////
router.delete(
  "/user/reviews/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  saveRedirectUrl,
  wrapAsync(userController.deleteReviewFromProfile)
);

module.exports = router;
