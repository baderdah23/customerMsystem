import bcrypt from "bcrypt";
import { UserSchema } from "./user.validation";
import { addUser, findUser } from "./user.repository";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

const cookieOption = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = UserSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res
        .status(400)
        .json({ success: false, message: validatedData.error });
    }
    const { username, email, password } = validatedData.data;
    const result = await findUser(email);

    if (result.length > 0) {
      return res.status(400).json({
        success: false,
        message: "email or password is wrong",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const addToDb = await addUser(username, email, hashPassword);
    const token = generateToken(addToDb.id);
    res.cookie("token", token, cookieOption);

    return res.status(201).json({
      success: true,
      message: "user created successfully",
      user: addToDb,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await findUser(email);

    if (result.length === 0) {
      return res.status(400).json({
        success: false,
        message: "email or password is wrong",
      });
    }

    const passwordMatch = await bcrypt.compare(password, result[0].password);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "email or password is wrong" });
    }
    const token = generateToken(result[0].id);
    res.cookie("token", token, cookieOption);
    return res.status(200).json({
      success: true,
      message: "logged in successfully",
      user: result[0],
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      message: "user found successfully",
      user: (req as any).user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", cookieOption);
    return res.status(200).json({
      success: true,
      message: "logged out successfully ",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};
