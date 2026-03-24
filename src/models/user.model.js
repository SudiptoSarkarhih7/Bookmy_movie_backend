import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
    },

    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      default: null,
    },

    theatreCount: {
      type: Number,
      default: 1,
    },

    businessRegistrationType: {
      type: String,
    },

    gstNumber: {
      type: String,
    },

    panNumber: {
      type: String,
    },
    
    officeAddress: {
      type: String,
    },
    
    licenseNumber: {
      type: String,
    },
    
    contactNumber: {
      type: String,
    },

    isVarified: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// 🔐 Password Hashing
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
