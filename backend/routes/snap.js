const Snap = require("../models/Snap");
const express = require("express");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("GET request sent to /snaps");
  Snap.find({})
    .then(snapList => {
      console.log(snapList);
      res.json(snapList);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/", (req, res, next) => {
  console.log("POST request sent to /snaps");
  const newSnap = req.body;
  const currentDate = new Date();
  console.log(req.user);
  Snap.create({
    title: newSnap.title,
    description: newSnap.description,
    category: newSnap.category,
    user: req.user._id,
    location: newSnap.location,
    image: newSnap.image,
    expireAt: expiryDate
  })
    .then(snapDocument => {
      console.log(snapDocument);

      User.updateOne(
        { _id: req.user._id },
        {
          $push: {
            snaps: [snapDocument._id]
          }
        }
      )
        .then(response => console.log(response))
        .catch(err => console.log(err));

      res.json(snapDocument);

      //TODO: need to calculte score of the user
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:id", (req, res, next) => {
  console.log(req.params.id);

  Snap.findById(req.params.id)
    .then(snapDocument => {
      res.json(snapDocument);
    })
    .catch(err => {
      console.log(err);
    });
});

router.patch("/:id", (req, res, next) => {
  const editedSnap = req.body;

  Snap.findById(req.params.id)
    .then(snapDocument => {
      if (snapDocument.user._id !== req.user._id) {
        return res
          .status(400)
          .json({ message: "Only the owner of a snap can edit the snap" });
      }

      Snap.updateOne(
        { _id: snapDocument._id },
        {
          title: editedSnap.title,
          description: editedSnap.description,
          category: editedSnap.category,
          location: editedSnap.location,
          image: editedSnap.image
        }
      )
        .then(response => {
          console.log(response);

          //TODO - update the score / category count
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => console.log(err));
});

router.delete("/:id", (req, res, next) => {
  Snap.findById(req.params.id)
    .then(snapDocument => {
      //check if snap was created by the logged in user. If not, the snap cannot be deleted
      if (snapDocument.user.toString() !== req.user._id.toString()) {
        console.log("not the same");
        return res
          .status(400)
          .json({ message: "Only the owner of a snap can delete the snap" });
      }

      //delete the snap in the database
      Snap.deleteOne({ _id: snapDocument._id })
        .then(response => console.log(response))
        .catch(err => console.log(err));

      //remove the snap from the user list of
      User.updateOne(
        { _id: snapDocument.user },
        {
          $pull: {
            snaps: snapDocument._id
          }

          //TODO - update the score / category count
        }
      )
        .then(response => {
          console.log(response);
          res.json({ message: "User updated" });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;

// for testing purposes:
/* title:should be deleted friday afternoon at 15:21
description:test
category:free
location:berlin
image:image */
