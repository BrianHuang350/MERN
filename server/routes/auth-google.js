const router = require("express").Router();
const googleUser = require("../models").googleUser;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("dotenv").config();

router.use((req, res, next) => {
  console.log("正在經過googleOAuth route");
  next();
});
router.use(cookieParser(process.env.COOKIE_SIGN));

//建立OAuth router
router.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    session: false,
  })
);

router.get(
  "/redirect",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    if (req.user.role == null) {
      return res
        .cookie("id", req.user.id, { signed: true })
        .redirect("http://localhost:3000/selectRole");
    } else {
      return res
        .cookie("id", req.user.id, { signed: true })
        .redirect("http://localhost:3000/redirectProfile");
      // let jwtObject = req.user;
      // let token =
      //   "JWT " + jwt.sign(jwtObject.toJSON(), process.env.PASSPORT_SECRET);

      // return res.redirect(`http://localhost:3000/profile/?token=${token}`);
    }
  }
);

//設定googleUser第一次登入時的selectRole route
router.post("/checkRole", async (req, res) => {
  let updateUser = await googleUser.findOneAndUpdate(
    { id: req.signedCookies.id },
    { role: req.body.role },
    { new: true }
  );
  console.log(updateUser);
  const tokenObject = { _id: updateUser._id, email: updateUser.email };
  const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
  res.clearCookie("id");
  return res.send({
    message: "成功登入",
    token: "JWT " + token,
    user: updateUser,
  });
});

router.get("/getJWT", async (req, res) => {
  let foundUser = await googleUser.findOne({ id: req.signedCookies.id });
  const tokenObject = { _id: foundUser._id, email: foundUser.email };
  const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
  res.clearCookie("id");
  return res.send({
    message: "成功登入",
    token: "JWT " + token,
    user: foundUser,
  });
});

module.exports = router;
