import * as userService from "../services/userService.js";
import bcrypt from "bcryptjs";
import { sendToken } from "../utils/jwt.js";


export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(401).json({ message: "Please fill all the fields" });
    }
    const userExist = await userService.getUserByEmail(email);
    if (userExist) {
      return res.status(400).json({ message: "Email already exist" });
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await userService.createUser({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Registration Successfull",
      data: {
        userId: user.id,
        user: name,
        email: email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const user = await userService.getUsers();
    const {password, ...userData} = user;
    res.json(userData);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    if (!user) return res.status(404).json({ error: "User not Found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await userService.UpdateUser(Number(req.params.id), req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
   const user = await userService.deleteUser(Number(req.params.id));
    res.status(201).json({ message: "User is Deleted",
      user: user.name,
    }
    );
  } catch (error) {
    next(error);
  }
};

export const logout = async (req,res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production"
  })
  res.status(201).json({
    satus:"Success",
    message: "Logout out Successfully"
  })
}
