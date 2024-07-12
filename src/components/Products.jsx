import {
  useCreateProductMutation,
  useGetProductsQuery,
  useLoginMutation,
} from "../api/shopApiSlice";
import { Button, FloatButton, Modal, Space } from "antd";
import {
  AppstoreAddOutlined,
  ClearOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Loading from "./state/Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart } from "../app/features/cart/cartSlice";
import { useState } from "react";
import { logInUser, logout } from "../app/features/auth/authSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [login, { isLoading: logging, isError: loggingError }] =
    useLoginMutation();

  const products = useGetProductsQuery();
  const [createProduct, { isFetching: isCreating, isError: isCreatingError }] =
    useCreateProductMutation({
      title: "test product",
      price: 13.5,
      description: "lorem ipsum set",
      image: "https://i.pravatar.cc",
      category: "electronic",
    });

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    const creds = {
      username: "mor_2314",
      password: "83r5^_",
    };
    login(creds).then((resp) => {
      dispatch(logInUser({ token: resp.data.token, user: creds }));
      handleCancel();
    });
  };

  if (products.isFetching) {
    return <Loading item={"Products"} />;
  }

  return (
    <div className="bg-[#f1f1f1]">
      <div className="flex items-center justify-between pr-4">
        <h1 className="text-4xl font-semibold py-4">Products</h1>
        <Space>
          <Button onClick={showModal}>Login</Button>
          <Button
            icon={<LogoutOutlined />}
            onClick={() => {
              dispatch(logout());
            }}
          />
        </Space>

        <Modal
          title="Login / Signup"
          open={open}
          onOk={handleOk}
          confirmLoading={logging}
          onCancel={handleCancel}
        >
          <p>Tap OK to login</p>
        </Modal>
      </div>

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
                <Space>
                  <Button
                    size={"smal;"}
                    onClick={() => navigate(`/product/${prod.id}`)}
                  >
                    Checkout &gt;
                  </Button>
                  <Button
                    onClick={() => {
                      dispatch(addToCart(prod.id));
                    }}
                    icon={<ShoppingCartOutlined />}
                  />
                </Space>
              </p>
            </li>
          ))}
      </ul>

      <FloatButton.Group>
        <FloatButton
          type="primary"
          onClick={() => createProduct()}
          icon={
            <AppstoreAddOutlined
              disabled={isCreating}
              style={{
                color: isCreating ? "#e1e1e1" : "white",
              }}
            />
          }
        />

        <FloatButton
          type="primary"
          icon={
            <ClearOutlined
              onClick={() => {
                dispatch(clearCart());
              }}
            />
          }
        />
      </FloatButton.Group>
    </div>
  );
};

export default Products;
