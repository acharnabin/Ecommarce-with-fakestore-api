

export interface IProductListResponse {
    status: string;
    message: string;
    products: IProduct[];
  }


  type Tcta='male'|'female'

  export interface IProduct {
    id: number;
    title: string;
    image: string;
    price: number;
    description: string;
    brand: string;
    model: string;
    color: string;
    category: Tcta;
    discount?: number;
    popular?: boolean;
    onSale?: boolean;
  }


  export interface IProductDetailsResponse {
    message:string;
    status:string;
    product:IProduct
  }