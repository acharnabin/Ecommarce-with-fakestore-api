import { type IProductDetailsResponse, type IProductListResponse } from "../../typescript/product.interface";
import axiosInstance from "../axios-instance/axios-instnace";
import { endpoints } from "../endpoints/endpoints";

//Get all products
export const getAllProducts = async (limit: number, page: number) => {
  const res = await axiosInstance.get<IProductListResponse>(
    endpoints.products.list,
    {
      params: {
        limit,
        page,
      },
    }
  );

  return res?.data;
};

// get single product details
export const getSingleProduct = async (id: number) => {
  const res = await axiosInstance.get<IProductDetailsResponse>(endpoints.products.details(id));
  return res?.data;
};

interface IProductAddPayload {
  title: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  discount: string;
}
// Add a new product
export const addProduct = async (data: IProductAddPayload) => {
  const res = await axiosInstance.post<IProductListResponse>(
    endpoints.products.list,
    data
  );

  return res;
};
