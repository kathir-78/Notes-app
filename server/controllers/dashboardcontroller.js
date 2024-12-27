const Note = require("../models/Note");
const mongoose = require("mongoose");

// GET DASHBOARD

exports.dashboard = async (req, res) => {
  let perPage = 8;
  let page = req.query.page || 1; //req.query contains the query strings which has a key value and it is in object format inside the object all the value are in string

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
      .limit(perPage) // limiting per page
      .exec(); // Execution

    const count = await Note.countDocuments();
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
};

// GET method for view data
exports.viewNote = async (req, res) => {

  const locals = {
    title: "View notes",
    description: "view notes for particular note"
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid user ID format",
      });
    }
    const note = await Note.findById(req.params.id).where({
      user: req.user.id,
    }); // check for the user is accessing his data

    res.render("./dashboard/user-view", {
      note,
      noteID: req.params.id,
      locals,
      layout: "./layouts/dashboard",
    });

  } catch (e) {
    console.log(e.message);
  }
};

// Add notes GET method
exports.dashboardAddnote = async (req, res) => {
  const locals = {
    title: "Add Notes",
    description: "Dashboard for the notes app",
  };

  try {
    res.render("./dashboard/add", {
      locals,
      layout: "./layouts/dashboard",
    });
  } catch (e) {
    console.log(e.message);
  }
};

// Add notes POST method
exports.dashboardAddnoteSubmit = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Note.create(req.body);
    res.status(200).redirect("/dashboard");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("An error occured while adding notes");
  }
};

// update method
exports.updateNote = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid user ID format",
      });
    }
    await Note.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now(),
    }).where(req.user.id);
    res.status(200).redirect("/dashboard");
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .send({ error: "An error occurred while updating the note" });
  }
};

// Delete method
exports.deleteNote = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid user ID format",
      });
    }
    await Note.findByIdAndDelete(req.params.id).where({ user: req.user.id }); // where the user is deleting his data
    res.status(200).redirect("/dashboard");
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .send({ error: "An error occurred while deleting the note" });
  }
};

// GET method for dashboard search
exports.dashboardsearch = async (req, res) => {
 
  const locals = {
    title: "Search",
    description: "Search notes"
  }

  try {
    res.render("./dashboard/search", {
      searchResults: "",
      locals,
      layout: "./layouts/dashboard",
    });
  } catch (e) {
    console.log(e.message);
  }
};

// POST method for dashboard search                      // main method is used for searching 
exports.dashboardsearchSubmit = async (req, res) => {

  const locals = {
    title: "Search",
    description: "Search notes"
  }

  try {
    const searchTerm = req.body.searchTerm;

    //filter to accept only alphabets and numbers
    const searchTermFilter = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

    const searchResultNote = await Note.find({
      // whether any of the condition in true either title or body

      $or: [
        { title: { $regex: searchTermFilter, $options: "i" } }, // regex is pattern matching used in mongodb
        { body: { $regex: searchTermFilter, $options: "i" } },
      ],
    }).where({ user: req.user.id });

    res.render("./dashboard/search", {
      searchResults: searchResultNote,
      locals,
      layout: "./layouts/dashboard",
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error occured while searching notes");
  }
};
