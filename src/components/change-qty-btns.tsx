import { useShallow } from "zustand/shallow";
import { useStore } from "@/store/store";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";

type Props = {
  productId: string;
};

export default function ChangeQtyButtons({ productId }: Props) {
  const { incQty, decQty, getProductById, setTotalPrice } = useStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
      incQty: state.incQty,
      decQty: state.decQty,
      setTotalPrice: state.setTotalPrice,
    }))
  );
  const product = getProductById(productId);

  useEffect(() => {
    const unSub = useStore.subscribe(
      (state) => state.products,
      (products) => {
        setTotalPrice(
          products.reduce((acc, item) => acc + item.price * item.qty, 0)
        );
      },
      {
        fireImmediately: true,
      }
    );

    return unSub;
  }, [setTotalPrice]);
  return (
    <>
      {product && (
        <>
          <div className="flex items-center gap-2">
            <Button onClick={() => decQty(product.id)}>
              <Minus />
            </Button>
            <p>{product.qty}</p>
            <Button onClick={() => incQty(product.id)}>
              <Plus />
            </Button>
          </div>
        </>
      )}
    </>
  );
}
