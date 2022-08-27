import { ProductData } from "../../data/type";
import Product from "./Product";

const ProductList = ({ products }: any) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product: any, index: number) => {
          return (
            <div key={index}>
              <Product {...product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
