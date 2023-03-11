import Home from "../pages/Home";
import Customer from "../pages/Customer";
import Inventory from "../pages/Inventory";
import Staff from "../pages/Staff";

export const route = [
  {
    exact: true,
    path: "/home",
    return: <Home />,
  },
  {
    exact: true,
    path: "/customer",
    return: <Customer />,
  },
  {
    exact: true,
    path: "/inventory",
    return: <Inventory />,
  },
  {
    exact: true,
    path: "/staff",
    return: <Staff />,
  },
];
