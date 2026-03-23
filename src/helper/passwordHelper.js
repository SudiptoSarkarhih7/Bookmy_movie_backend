import bcrypt from "bcryptjs";

export const passwordCheck = async (password, hashedPassword) => {
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  } catch (error) {
    throw new Error("Password check failed");
  }
};
 