export const BaseUrl=import.meta.env.VITE_PUBLIC_AXIOS_BASE_URL

export const endpoints={
    products:{
        list:'/products',
        details:(id:number)=>`/products/${id}`
    },
    cart:{},
    users:{},
    auth:{}
}