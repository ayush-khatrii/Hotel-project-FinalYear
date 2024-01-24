import User from "../models/users.model.js"

// Get All Users
const handleGetAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        next(error);
    }
};


// // Get Users by ID
const handleGetUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}



// // Update User by ID
const handleUpdateUsersById = async (req, res, next) => {
    const UserId = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(UserId, { $set: req.body }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found!" });
        }
        return res.status(200).json({ message: "User Updated Successfully" });

    } catch (error) {
        next(error);
    }
}



// Delete User by ID
const handleDeleteUsersById = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User Deleted Successfully!", status: 200 });
    } catch (error) {
        next(error);
    }
};




export default {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUsersById,
    handleDeleteUsersById
}