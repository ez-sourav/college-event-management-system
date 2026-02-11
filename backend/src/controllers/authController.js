import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt.js";

export async function signup(req, res) {
  const { name, email, password, role } = req.body;

  const foundUser = await User.findOne({ email });

  if (foundUser) {
    return res
      .status(409)
      .json({ message: "User with this email already exists" });
  }

  const saltRound = 10;
  const passwordHash = await bcrypt.hash(password, saltRound);

  const user = await User.create({
    name,
    email,
    passwordHash,
    role,
  });

  const token = signToken({ id: user.id, role: user.role });

  res.status(201).json({ message: "User successfully created!", token });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  if (!userFound) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  const isMatch = await bcrypt.compare(password, userFound.passwordHash);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  const token = signToken({ id: userFound.id, role: userFound.role });

  res.status(200).json({ message: "Successfully logged in!", token });
}
