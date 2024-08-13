import Jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    profile_picture: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
    confirmpassword: {
      type: String,
      default: null,
    },
    dob: {
      type: String,
      default: null,
    },
    otp: {
      type: Number,
      default: null,
    },
    emailverifyotp: {
      type: Number,
      default: null,
    },
    tokens: {
      type: String,
    },
    phoneno: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    postcode: {
      type: String,
      default: null,
    },
    authType: {
      type: String,
      default: null,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    usertype: {
      type: String,
      default: null,
    },
    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: [Number],
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  // Check if the password field is being modified or it's a new user
  if (this.isModified("password") || this.isNew) {
    try {
      const hash = await bcryptjs.hash(this.password, 12);
      this.password = hash;
      next();
    } catch (err) {
      return next(err);
    }
  } else {
    next();
  }
});
// we are hasing the password
userSchema.pre(["updateOne", "findOneAndUpdate"], async function (next) {
  if (
    this?.getUpdate()?.password !== "" &&
    this?.getUpdate()?.password !== undefined
  ) {
    this.getUpdate().password = bcryptjs.hashSync(
      this.getUpdate().password,
      12,
    );
  }

  next();
});

// we are generating token
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = Jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    // this.tokens = this.tokens.concat({ token: token });
    this.tokens = token;
    await this.save();
    return token;
  } catch (e) {
    console.log(e);
  }
};

const User = new mongoose.model("user", userSchema);
export default User;
