import axios from "axios";
import { BaseUrl } from "../endpoints/endpoints";

const axiosInstance=axios.create({
    baseURL:BaseUrl,
    // params:{
    //     apiKey:"somesdsdsdsthing"
    // }
})

// fakestore.com/products?test=something

export default axiosInstance