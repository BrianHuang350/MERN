let passport = require("passport");
let JwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt;
let GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models").user;
const googleUser = require("../models").googleUser;

//JWT驗證
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
opts.secretOrKey = process.env.PASSPORT_SECRET;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      let foundUser = await User.findOne({ _id: jwt_payload._id }).exec();
      if (foundUser) {
        return done(null, foundUser); // req.user <= foundUser
      } else {
        return done(null, false);
      }
    } catch (e) {
      return done(e, false);
    }
  })
);
//google OAuth驗證
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, cb) => {
      let foundUser = await googleUser
        .findOne({
          email: profile.emails[0].value,
        })
        .exec();
      if (foundUser) {
        return cb(null, foundUser);
      } else {
        let newUser = new googleUser({
          googleID: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
        });
        let saveUser = await newUser.save();
        return cb(null, saveUser);
      }
    }
  )
);
