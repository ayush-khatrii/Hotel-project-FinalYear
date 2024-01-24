import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";




export const registerUser = async (req, res, next) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hash,
		});

		await newUser.save();
		res.status(201).json({ message: "User has been  created successfully!" });
	} catch (error) {
		next(error);
	}
};
export const loginUser = async (req, res, next) => {
	try {
		const email = await User.findOne({ email: req.body.email });

		// Check user (with email) if exist
		if (!email) res.status(404).json({ message: "User not found!" });

		// Comparing entered password by user with hashed password in DB
		const isPass = await bcrypt.compare(req.body.password, email.password);

		//Check if pass word is incorrect
		if (!isPass)
			res.status(404).json({ message: "Useremail or Password is incorrect!" });


		const token = jwt.sign({ id: email._id, isAdmin: email.isAdmin }, process.env.JWT)

		const { password, bookings, isAdmin, ...others } = email._doc;

		res.cookie("access_token", token, {
			httpOnly: true
		}).status(200).json({ ...others });

	} catch (error) {
		next(error);
	}
};
