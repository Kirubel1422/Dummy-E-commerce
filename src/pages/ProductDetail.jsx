import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../api/shopApiSlice";
import Loading from "../components/state/Loading";
import { Button } from "antd";
import { ShoppingCartOutlined, StarTwoTone } from "@ant-design/icons";
const ProductDetail = () => {
  const params = useParams();
  const {
    data: product,
    isFetching,
    isError,
  } = useGetProductQuery(
    { id: params.productId },
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );
  if (isFetching) {
    return <Loading item={"Product id: " + params.productId} />;
  }

  if (isError) {
    return <h1>{JSON.stringify(product.error)}</h1>;
  }

  if (!product) {
    return <h1>No Product found.</h1>;
  }

  return (
    <div className="bg-BG h-screen">
      <h1 className="text-4xl font-semibold text-start">
        Product: {params.productId}
      </h1>
      <div className="product-wrapper w-fit bg-[#fcfcfc] drop-shadow-md  mt-10 p-6">
        <div className="flex items-start gap-10">
          <div>
            <img className="w-64 h-64" src={product.image} />
          </div>
          <div className="w-[200px]">
            <p className="text-lg capitalize mt-8 mb-5 text-center font-semibold">
              {product.category}
            </p>
            <p className="flex items-center justify-center gap-10 mt-4 font-semibold">
              $ {product.price} <Button icon={<ShoppingCartOutlined />} />
            </p>
            <p className="flex justify-center gap-1 mt-4">
              <StarTwoTone color="#f1f1" /> {product.rating.rate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
