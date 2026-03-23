import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      trim: true,
    },
    permissions: {
      type: Array,
    },
    isEditable: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const RoleModel = mongoose.model("Role", roleSchema);
export default RoleModel;
