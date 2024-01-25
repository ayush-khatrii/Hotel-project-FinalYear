import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res, next) => {
	try {

		const existingUser = await User.findOne({ email: req.body.email });

		if (existingUser) {
			return res.status(404).json({ message: "User  Already exist!" });
		}

		// Password Hashing
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hash,
		});


		// Save the user in database
		await newUser.save();
		res.status(201).json({ message: "User has been  created successfully!" });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};




export const loginUser = async (req, res, next) => {
	try {
		const email = await User.findOne({ email: req.body.email });

		// Check if user exists
		if (!email) {
			return res.status(404).json({ message: "User not found!" });
		}

		// Comparing entered password by user with hashed password in DB
		const isPass = await bcrypt.compare(req.body.password, email.password);

		//Check if password is incorrect
		if (!isPass) {
			return res.status(404).json({ message: "Email or Password is incorrect!" });
		}

		const token = jwt.sign({ id: email._id, isAdmin: email.isAdmin }, process.env.JWT);

		const { password, bookings, isAdmin, ...others } = email._doc;

		res.cookie("access_token", token, {
			httpOnly: true
		});

		res.status(200).json({ ...others });

	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};