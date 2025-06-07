import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addProduct } from "@/api/functions/product.api";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface IAddProductDialogProps {
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const AddProductDialog = ({open,setOpen}:IAddProductDialogProps) => {
    const [product, setProduct] = useState({
        title: "",
        brand: "",
        model: "",
        color: "",
        category: "",
        discount: "0",
      });
    const queryClient=useQueryClient()
      // useMutation
  const {mutate,isPending}=useMutation({
    mutationKey:['use-add-product'],
    mutationFn:addProduct
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{

    e.preventDefault();

    mutate(product,{
      onSuccess:()=>{
        toast.success("Product added !");
        setOpen(false);
        // refetch()
        queryClient.invalidateQueries({
          queryKey:["use-get-product-list"]
        })
      },
      onError:()=>{
        toast.error("Unable to add product")
      }
    })

  }

  return (
    <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
          </DialogHeader>

          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <Input
                name="title"
                placeholder="Enter title"
                value={product.title}
                onChange={(e) => handleInputChange(e)}
              />
              <Input
                name="brand"
                placeholder="Enter brand"
                value={product.brand}
                onChange={(e) => handleInputChange(e)}
              />
              <Input
                name="model"
                placeholder="Enter model"
                value={product.model}
                onChange={(e) => handleInputChange(e)}
              />
              <Input
                name="color"
                placeholder="Enter color"
                value={product.color}
                onChange={(e) => handleInputChange(e)}
              />
              <Input
                placeholder="Enter category"
                name="category"
                value={product.category}
                onChange={(e) => handleInputChange(e)}
              />
              <Input
                name="discount"
                placeholder="Enter discount"
                value={product.discount}
                onChange={(e) => handleInputChange(e)}
              />

              <div className="flex  gap-3">
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button disabled={isPending} type="submit">
                  {isPending?"Submitting":"Submit"}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
  )
}

export default AddProductDialog