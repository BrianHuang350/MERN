const mongoose = require("mongoose");
const { Schema } = mongoose;

const googleUserSchema = new Schema({
  googleID: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    // enum: ["student", "instructor"],
    default: null,
    // required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// instance methods
// googleUserSchema.methods.isStudent = function () {
//   return this.role == "student";
// };

// googleUserSchema.methods.isIsntructor = function () {
//   return this.role == "instructor";
// };

// mongoose middlewares
// 若使用者為新用戶，或者是正在更改密碼，則將密碼進行雜湊處理
// googleUserSchema.pre("save", async function (next) {
//   // this 代表 mongoDB 內的 document
//   if (this.isNew || this.isModified("password")) {
//     const hashValue = await bcrypt.hash(this.password, 10);
//     this.password = hashValue;
//   }
//   next();
// });

module.exports = mongoose.model("googleUser", googleUserSchema);
