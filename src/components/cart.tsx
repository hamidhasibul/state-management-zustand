import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CircleX, ShoppingCart, Trash } from "lucide-react";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/shallow";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ChangeQtyButtons from "./change-qty-btns";

type Props = {};

export default function Cart({}: Props) {
  const { resetCart, cartProducts, removeProduct, totalPrice } = useStore(
    useShallow((state) => ({
      resetCart: state.resetCart,
      cartProducts: state.products,
      removeProduct: state.removeProduct,
      totalPrice: state.totalPrice,
    }))
  );
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"secondary"} size={"icon"}>
          <ShoppingCart />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="overflow-y-scroll space-y-2 w-72">
        <div className="flex items-center">
          <h1>Cart:</h1>
          <Button onClick={resetCart} variant={"destructive"} size={"icon"}>
            <CircleX />
          </Button>
        </div>
        <div className="space-y-2">
          {cartProducts.map((item) => (
            <Card className="flex flex-col" key={item.id}>
              <CardHeader className="flex flex-row items-center gap-2">
                <CardTitle>{item.name}</CardTitle>
                <Button
                  variant={"destructive"}
                  onClick={() => removeProduct(item.id)}
                >
                  <Trash />
                </Button>
              </CardHeader>
              <CardContent>{item.price}$/unit</CardContent>
              <CardFooter>
                <ChangeQtyButtons productId={item.id} />
              </CardFooter>
            </Card>
          ))}
        </div>
        <p>Total: {totalPrice}$</p>
      </PopoverContent>
    </Popover>
  );
}
