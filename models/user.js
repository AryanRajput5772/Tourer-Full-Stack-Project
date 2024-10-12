const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: String,
  photo: {
    type: String,
    default:
      "https://cache.desktopnexus.com/thumbseg/1952/1952709-bigthumbnail.jpg",
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
