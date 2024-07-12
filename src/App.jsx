import { Tabs } from "antd";
import Products from "./components/Products";
import Carts from "./components/Carts";
import Categories from "./components/Categories";
import Users from "./components/Users";
const App = () => {
  const items = [
    {
      key: "1",
      label: "Products",
      children: <Products />,
    },
    {
      key: "2",
      label: "Carts",
      children: <Carts />,
    },
    {
      key: "3",
      label: "Categories",
      children: <Categories />,
    },
    {
      key: "4",
      label: "Users",
      children: <Users />,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default App;
