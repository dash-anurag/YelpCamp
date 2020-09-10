let express = require("express");
let router = express.Router({mergeParams: true});
let Campground = require("../models/campground");
let Comment = require("../models/comment");
let middleware = require("../middleware");

// Comments New
router.get("/new", middleware.isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      req.flash("error",err.message);
      res.redirect("/campgrounds");
    }
    else {
      res.render("comments/new", { campground: campground });
    }
  });
})

// Comments Create
router.post("/", middleware.isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      req.flash("error","Something went wrong.")
      console.log(err);
    }
    else {
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          req.flash("error", err.message);
        }
        else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          req.flash("success","Succesfully added comment.")
          res.redirect("/campgrounds/" + campground._id);
        }
      })
    }
  })
})

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
  Comment.findById(req.params.comment_id, function(err,foundComment){
    if(err){
      res.render("back");
    }
    else{
      res.render("comments/edit",
      {
        campground_id: req.params.id,
        comment: foundComment
      });
    }
  }); 
});

// COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect("back");
    }
    else{
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id,function(err){
    if(err){
      res.redirect("back");
    }
    else{
      req.flash("success","Comment deleted.");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});


module.exports = router;