let express = require("express");
let router = express.Router();
let passport = require("passport");
let User = require("../models/user");

// ROOT ROUTE
router.get("/", function (req, res) {
  res.render("landing");
});

// REGISTER FORM ROUTE
router.get("/register", function (req, res) {
  res.render("register");
});

// HANDLES THE SIGNUP LOGIC ROUTE
router.post("/register", function (req, res) {
  let newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash("error",err.message);
      return res.redirect("register");
    }
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "Welcome to YelpCamp "+ user.username );
      res.redirect("/campgrounds");
    })
  });
})

// SHOW LOGIN FORM
router.get("/login", function (req, res) {
  res.render("login");
})
// HANDLES THE LOGIN FORM LOGIC AND DOES LOGGING IN
router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true
  }), function (req, res) {});

// LOGOUT ROUTE
router.get("/logout",function(req,res){
  req.logout();
  req.flash("success","Logged you out!");
  res.redirect("/campgrounds")
})


module.exports = router;