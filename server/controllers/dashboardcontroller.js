const Note = require("../models/Note");
const mongoose = require("mongoose");

// GET DASHBOARD

exports.dashboard = async (req, res) => {
  let perPage = 8;
  let page = req.query.page || 1;

  const locals = {
    title: "dashboard",
    description: "dashboard for the notes app",
  };

  try {
    const notes = await Note.aggregate([
      // array of the objects
      { $sort: { updatedAt: -1 } }, // Sorting
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } }, // Matching
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
        },
      },
    ])
      .skip(perPage * page - perPage) // Pagination
      .limit(perPage)  // limiting per page
      .exec(); // Execution

    const count = await Note.countDocuments();
    
    console.log(count);
    res.render("dashboard/index", {
      userName: req.user.firstName,
      notes,
      current: page,
      pages: Math.ceil(count / perPage),
      locals,
      layout: "./layouts/dashboard",
    });
  } catch (error) {
    console.log(error.message);
  }

  console.log(new mongoose.Types.ObjectId(req.user.id));
}; //676a7fef102c2b39f2d795c8  676a7fef102c2b39f2d795c8
