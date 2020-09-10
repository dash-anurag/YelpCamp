let express = require("express");
let router = express.Router();
let Campground = require("../models/campground");
let middleware = require("../middleware");


// Index Route
router.get("/", function (req, res) {
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    }
    else {
      res.render("campgrounds/index", {
        campgrounds: allCampgrounds,
        currentUser: req.user
      });
    }
  });
});

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function (req, res) {
  let name = req.body.name;
  let price = req.body.price;
  let image = req.body.image;
  let description = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username
  }
  let newCampGround = {
    name: name,
    price: price,
    image: image,
    description: description,
    author: author
  };
  Campground.create(newCampGround, function (err, campground) {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect("/campgrounds");
    }
  });
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function (req, res) {
  res.render("campgrounds/new");
});

// SHOW ROUTE
router.get("/:id", function (req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
    if (err) {
      console.log(err);
    }
    else {
      if (!foundCampground) {
        return res.status(400).send("Item not found.")
      }
      res.render("campgrounds/show", { campground: foundCampground });
    }
  });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findById(req.params.id, function (err, foundCampground) {
    if (!foundCampground) {
      return res.status(400).send("Item not found.")
    }
    res.render("campgrounds/edit", { campground: foundCampground });
  });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
    if (err) {
      res.redirect("/campgrounds");
    }
    else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DESTROY CAMPGROUND
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/campgrounds");
    }
    else {
      res.redirect("/campgrounds");
    }
  })
})

module.exports = router;

