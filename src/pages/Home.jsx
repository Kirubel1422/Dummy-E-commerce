import { Tabs } from "antd";
import Products from "../components/Products";
import Users from "../components/Users";

const Home = () => {
  const items = [
    {
      key: "1",
      label: "Products",
      children: <Products />,
    },
    {
      key: "2",
      label: "Users",
      children: <Users />,
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} />;
};

export default Home;
