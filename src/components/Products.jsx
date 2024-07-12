import { useGetProductQuery, useGetProductsQuery } from "../api/shopApiSlice";
import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Loading from "./state/Loading";

const Products = () => {
  const products = useGetProductsQuery(undefined, {
    refetchOnFocus: true,
    skip: false,
  });

  if (products.isFetching) {
    return <Loading item={"Products"} />;
  }

  return (
    <div className="bg-[#f1f1f1]">
      <h1 className="text-4xl font-semibold py-4">Products</h1>

      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.isArray(products.data) &&
          products.data.map((prod, key) => (
            <li
              key={key}
              className="w-26 px-2 py-4 bg-[#fcfcfc] flex flex-col items-center"
            >
              <img
                src={prod.image}
                className="w-20 object-contain object-center h-20"
              />
              <p className="text-center mt-6">{prod.title}</p>
              <p className="text-center">{prod.category}</p>
              <p className="text-center gap-2 flex items-center font-semibold text-lg">
                $ {prod.price}
                <Button size={"large"} icon={<ShoppingCartOutlined />} />
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Products;
