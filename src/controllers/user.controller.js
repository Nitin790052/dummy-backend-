import User from "../models/User.modal.js";
import fs from "fs";

export const createUser = async (req, res) => {
  try {

    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      firstName: req.body.firstName,
      email: req.body.email,
      mobile: req.body.mobile,
      image: req.file ? req.file.filename : null
    });

    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export const deleteUser = async (req, res) => {
  try {

    const { id } = req.params;

    const userDelete = await User.findByIdAndDelete(id);

    if (!userDelete) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (userDelete.image) {
      fs.unlinkSync(`uploads/${userDelete.image}`);
    }

    res.status(200).json({
      success: true,
      message: "Data has been deleted successfully",
      data: userDelete
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};




export const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateUser = async (req, res) => {
  try {

    const { id } = req.params;

    const { firstName, email, mobile } = req.body;

    const updateData = {
      firstName,
      email,
      mobile
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const userUpdate = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!userUpdate) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Data has been updated successfully",
      data: userUpdate
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};