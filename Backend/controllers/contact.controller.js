import Contact from "../models/contact.models.js";

const handlePostContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContactData = new Contact({
      name,
      email,
      message,
    });

    await newContactData.save();
    res.status(200).json({ message: "Message sent succeddfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const handleGetAllContact = async (req, res) => {
  try {
    const allContactData = await Contact.find({});
    res.status(200).json({ allContactData });
  } catch (error) {
    res.status(500).json({ message: error.message });
    f;
  }
};

export default {
  handleGetAllContact,
  handlePostContact,
};
