import { type Request, type Response } from "express";
import { CustomerSchema } from "./customer.validation";
import {
  createCustomerRepo,
  deleteCustomerRepo,
  getAllAndSearchCustomer,
  getCustomerById,
  updateCustomerRepo,
} from "./customer.repository";

const getCustomer = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { id } = req.params;
  const customerId = id;
  try {
    const result = await getCustomerById(customerId as string, userId);
    if (result.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "customer not found" });
    }

    return res.status(200).json({ success: true, customers: result[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const searchAndGetAllCustomer = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  try {
    const search =
      typeof req.query.search === "string" ? req.query.search.trim() : "";

    const result = await getAllAndSearchCustomer(
      search as string,
      userId as string,
    );
    return res.status(200).json({
      success: true,
      count: result.length,
      customers: result,
    });
  } catch (error) {
    console.error("Fetch/Search Customers Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const createCustomer = async (req: Request, res: Response) => {
  const getData = CustomerSchema.safeParse(req.body);
  const userId = (req as any).user.id;

  if (!getData.success) {
    return res
      .status(400)
      .send({ message: "Invalid data", errors: getData.error.issues });
  }

  const customerData = getData.data;
  const result = await createCustomerRepo(customerData, userId);

  return res.status(201).json({ message: "data stored successfull" });
};

// update customer
const updateCustomer = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { id } = req.params;

  const validatedData = CustomerSchema.safeParse(req.body);
  try {
    if (!validatedData.success) {
      return res.status(400).json({
        success: validatedData.success,
        message: validatedData.error,
      });
    }

    const data = validatedData.data;
    const result = await updateCustomerRepo(data, id as string, userId);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Customer not found for update",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      customer: result[0],
    });
  } catch (error) {
    console.error("Database Update Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during update",
    });
  }
};

// delete customer
const deleteCustomer = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { id } = req.params;

  try {
    const result = await deleteCustomerRepo(id as string, userId);
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "customer not found" });
    }

    return res.status(200).json({
      success: true,
      message: "customer deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export {
  getCustomer,
  searchAndGetAllCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
