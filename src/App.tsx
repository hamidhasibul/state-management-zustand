import { PRODUCTS } from "@/db/data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "./store/store";
import { useShallow } from "zustand/shallow";
import ChangeQtyButtons from "@/components/change-qty-btns";
import Cart from "@/components/cart";

function App() {
  const { addProduct, cartProducts } = useStore(
    useShallow((state) => ({
      addProduct: state.addProduct,
      cartProducts: state.products,
    }))
  );

  return (
    <>
      <main className="bg-slate-800 dark   h-screen container mx-auto ">
        <Cart />
        <h1 className="text-2xl font-bold text-white">Products:</h1>

        {/* Products Container */}
        <div className="space-y-2">
          {PRODUCTS.map((product) => (
            <Card key={product.id}>
              <CardHeader>{product.name}</CardHeader>
              <CardContent>${product.price}</CardContent>
              <CardFooter>
                {cartProducts.find((item) => item.id === product.id) ? (
                  <>
                    <ChangeQtyButtons productId={product.id} />
                  </>
                ) : (
                  <>
                    <Button onClick={() => addProduct(product)}>
                      Add to Cart
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
