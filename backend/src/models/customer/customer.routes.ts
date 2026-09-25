import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  searchAndGetAllCustomer,
  updateCustomer,
} from "./customer.controller";
import { protect } from "../../middlewares/auth";

const router = Router();

router.get("/customers", protect, searchAndGetAllCustomer);

router.post("/customers", protect, createCustomer);

router.get("/customer/:id", protect, getCustomer);

router.patch("/customer/:id", protect, updateCustomer);

router.delete("/customer/:id", protect, deleteCustomer);

export default router;
