const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const { isLoggedIn } = require("../middleware/checkAuth");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async function (accessToken, refreshToken, profile, done) {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage: profile.photos[0].value,
      };

      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);


// If authentication is successful, Passport.js will attach the authenticated user object to req.user.
// You can then access req.user in any subsequent middleware or route handler to get information about the authenticated user.

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login-failure" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/dashboard");
  }
);

router.get("/login-failure", (req, res) => {
  res.status(401).send("something wentwrong");
});

//Destroy user session
router.get("/logout", (req, res) => {
  req.logout((err) => {     //It removes the req.user property and clears the login session.
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {  // This function destroys the session data on the server.
      if (err) {
        return next(err);
      }
      res.redirect("/"); 
    });
  });
});

// Serialize user, Stores the user ID in the session.  persist user data after successful authentication
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialize user , Retrieves the user by ID from the database and attaches the user object to req.user , retrives user data from session
passport.deserializeUser(async function (id, done) {   // it gives the req.user parameter
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});


// check for the user is logged in if he is logged in he is directed to dashboard else redirect to sign page
router.get('/auth/dashboard', (req, res) => {
  if(req.user) {
    res.redirect('/dashboard');
  }
  else {
    res.redirect('/auth/google');
  }
})

module.exports = router;
