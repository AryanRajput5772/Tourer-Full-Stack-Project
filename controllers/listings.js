const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const matchingListing = await Listing.find({});
  res.render("listings/index.ejs", { matchingListing });
};

///////////////////////////////////Search route/////////////////////////////////////////////////////////////////

module.exports.searchRoutePost = async (req, res) => {
  let search = req.body.search;
  let searchText = search.toLowerCase();
  const allListings = await Listing.find({});

  let Searchvalue;
  let flashmessage;
  for (let Listing of allListings) {
    if (Listing.country.toLowerCase().includes(searchText)) {
      Searchvalue = Listing.country;
      flashmessage = "Listing  Searched by Country";
    } else if (Listing.title.toLowerCase().includes(searchText)) {
      Searchvalue = Listing.title;
      flashmessage = "Listing  Searched by Title";
    } else if (Listing.location.toLowerCase().includes(searchText)) {
      Searchvalue = Listing.location;
      flashmessage = "Listing  Searched by location";
    } else if (typeof parseInt(searchText) == "number") {
      if (Listing.price < parseInt(searchText)) {
        Searchvalue = Listing.price;
        flashmessage = "Listing  Searched by Price";
      }
    }
  }

  req.flash("filter", flashmessage);

  if (Searchvalue == undefined) {
    req.flash("error", "Listing not Found ");
    res.redirect("/listings");
  }
  res.redirect(`/listings/SearchRoute/${Searchvalue}`);
};

module.exports.searchRouteGet = async (req, res) => {
  let searchText = req.params.searchValue;
  const allListings = await Listing.find({});
  let matchingListing = allListings.filter((el) => {
    if (el.country === searchText) {
      return el;
    } else if (el.title === searchText) {
      return el;
    } else if (el.location === searchText) {
      return el;
    } else if (el.price < searchText) {
      return el;
    }
  });
  res.render("listings/search.ejs", { matchingListing });
};
///////////////////////filter routes///////////////////////////////////////////////////////////////
//1 --> /listings/Boats

module.exports.Boats1 = async (req, res) => {
  req.flash("filter", "Listing Filtered by Boats");
  res.redirect("/listings/BoatsFilter");
};
module.exports.Boats = async (req, res) => {
  const allListings = await Listing.find({});
  let matchingListing = allListings.filter((el) => el.category === "Boats");
  res.render("./listings/index.ejs", { matchingListing });
};

//2 --> /listings/Domes

module.exports.Domes1 = async (req, res) => {
  req.flash("filter", "Listing Filtered by Domes");
  res.redirect("/listings/DomesFilter");
};

module.exports.Domes = async (req, res) => {
  const allListings = await Listing.find({});
  let matchingListing = allListings.filter((el) => el.category === "Domes");
  res.render("./listings/index.ejs", { matchingListing });
};

//3 --> /listings/Arctic
module.exports.Arctic1 = async (req, res) => {
  req.flash("filter", "Listing Filtered by Arctic");
  res.redirect("/listings/ArcticFilter");
};

module.exports.Arctic = async (req, res) => {
  const allListings = await Listing.find({});
  let matchingListing = allListings.filter((el) => el.category === "Arctic");
  res.render("./listings/index.ejs", { matchingListing });
};

//4 --> /listings/Farms
module.exports.Farms1 = async (req, res) => {
  req.flash("filter", "Listing Filtered by Farms");
  res.redirect("/listings/FarmsFilter");
};

module.exports.Farms = async (req, res) => {
  const allListings = await Listing.find({});
  let matchingListing = allListings.filter((el) => el.category === "Farms");
  res.render("./listings/index.ejs", { matchingListing });
};

//5 --> /listings/Camping
module.exports.Camping1 = async (req, res) => {
  req.flash("filter", "Listing Filtered by Camping");
  res.redirect("/listings/CampingFilter");
};

module.exports.Camping = async (req, res) => {
  const allListings = await Listing.find({});
  let matchingListing = allListings.filter((el) => el.category === "Camping");
  res.render("./listings/index.ejs", { matchingListing });
};

//6 --> /listings/AmazingPools
module.exports.AmazingPools1 = async (req, res) => {
  req.flash("filter", "Listing Filtered by Amazing Pools");
  res.redirect("/listings/AmazingPoolsFilter");
};

module.exports.AmazingPools = async (req, res) => {
  const allListings = await Listing.find({});
  let matchingListing = allListings.filter(
    (el) => el.category === "Amazing Pools"
  );
  res.render("./listings/index.ejs", { matchingListing });
};

//7 --> /listings/Beach
module.exports.Beach1 = async (req, res) => {
  req.flash("filter", "Listing Filtered by Beach");
  res.redirect("/listings/BeachFilter");
};

module.exports.Beach = async (req, res) => {
  const allListings = await Listing.find({});
  let matchingListing = allListings.filter((el) => el.category === "Beach");
  res.render("./listings/index.ejs", { matchingListing });
};

//8 --> /listings/Mountains
module.exports.Mountains1 = async (req, res) => {
  req.flash("filter", "Listing Filtered by Mountains");
  res.redirect("/listings/MountainsFilter");
};

module.exports.Mountains = async (req, res) => {
  const allListings = await Listing.find({});
  let matchingListing = allListings.filter((el) => el.category === "Mountains");
  res.render("./listings/index.ejs", { matchingListing });
};

//9 --> /listings/IconicCities
module.exports.IconicCities1 = async (req, res) => {
  req.flash("filter", "Listing Filtered by Iconic cities");
  res.redirect("/listings/IconicCitiesFilter");
};

module.exports.IconicCities = async (req, res) => {
  const allListings = await Listing.find({});
  let matchingListing = allListings.filter(
    (el) => el.category === "Iconic cities"
  );
  res.render("./listings/index.ejs", { matchingListing });
};

//10 --> /listings/Villas
module.exports.Villas1 = async (req, res) => {
  req.flash("filter", "Listing Filtered by Villas");
  res.redirect("/listings/villasFilter");
};

module.exports.Villas = async (req, res) => {
  const allListings = await Listing.find({});
  let matchingListing = allListings.filter((el) => el.category === "Villas");
  res.render("./listings/index.ejs", { matchingListing });
};

//////////////////////////////////////////////////////
//New Route
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

//Show Route
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", " Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  // console.log(listing);
  res.render("listings/show.ejs", { listing });
};

//Create Route

module.exports.createListing = async (req, res, next) => {
  let api_url = `https://nominatim.openstreetmap.org/search?format=json&q=${req.body.listing.location}`;
  let coordinate = [];
  try {
    let response = await fetch(api_url);
    let data = await response.json();

    if (data.length > 0) {
      let lat = data[0].lat;
      let long = data[0].lon;

      coordinate[0] = lat;
      coordinate[1] = long;
    } else {
      alert("City not found. Please try another name.");
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    alert("Could not retrieve location. Please try again.");
  }
  if (coordinate.length == 0) {
    coordinate = [22.3511148, 78.6677428];
  }

  let url = req.file.path;
  let filename = req.file.filename;
  // console.log(url, "---------", filename);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry.coordinates = coordinate;

  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

//Edit Route

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", " Listing you requested for does not exist!");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250"); //we use this line to reduce the pixels of the original image which is  to preview
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// Update route

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", " Listing Updated!");

  res.redirect(`/listings/${id}`);
};

//Delete Route

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  //   console.log(deletedListing);
  req.flash("success", "Listing Deleted!");

  res.redirect("/listings");
};
