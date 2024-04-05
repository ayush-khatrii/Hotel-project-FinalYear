import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!(username && email && password)) {
      res.status(400).json({ message: "All fields are required!" });
    }

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(404).json({ message: "User  Already exist!" });
    }

    // Password Hashing
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: username,
      email: email,
      password: hash,
    });

    // Save the user in database
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "Resgisteration successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    // const { email, password } = req.body;

    const email = await User.findOne({ email: req.body.email });

    // Check if user exists
    if (!email) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Comparing entered password by user with hashed password in DB
    const isPass = await bcrypt.compare(req.body.password, email.password);

    //Check if password is incorrect
    if (!isPass) {
      return res
        .status(404)
        .json({ message: "Email or Password is incorrect!" });
    }

    const token = jwt.sign(
      { id: email._id, isAdmin: email.isAdmin },
      process.env.JWT
    );

    // using rest operatu
    const { password, ...others } = email._doc;

    // Sending res to the frontend with cookies
    res.cookie("access_token", token, {
      httpOnly: true,
    });
    res.status(201).json({ ...others, token, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const loginAdmin = async (req, res, next) => {
  try {
    const email = await User.findOne({ email: req.body.email });

    // Check if user exists
    if (!email) {
      return res.status(404).json({ message: "Admin not found!" });
    }
    if (!email.isAdmin) {
      return res.status(404).json({ message: "Users are not allowed" });
    }

    // Comparing entered password by user with hashed password in DB
    const isPass = await bcrypt.compare(req.body.password, email.password);

    //Check if password is incorrect
    if (!isPass) {
      return res
        .status(404)
        .json({ message: "Email or Password is incorrect!" });
    }

    const token = jwt.sign(
      { id: email._id, isAdmin: email.isAdmin },
      process.env.JWT
    );

    // using rest operatu
    const { password, ...others } = email._doc;

    // Sending res to the frontend with cookies
    res.cookie("access_token", token, {
      httpOnly: true,
    });
    res.status(201).json({ ...others, token, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user data function
export const getUser = async (req, res) => {
  const token = req.header("Authorization");
  const jwtToken = token.replace("Bearer", "").trim();

  if (!token) {
    res.status(401).json({ message: "Unauthorized  Token not provided!" });
  }

  try {
    const verifiedUser = jwt.verify(jwtToken, process.env.JWT);
    const userId = verifiedUser.id;
    const user = await User.findById(userId).select("-password");

    res.status(200).json({ user: user });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized. Invalid token!" });
  }
};
