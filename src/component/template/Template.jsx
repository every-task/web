import { Outlet } from "react-router";
import { Myheader } from "./Myheader";
import MyFooter from "./MyFooter";

const Template = () => {
  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        <Myheader />
        <Outlet />
      </div>
      <MyFooter />
    </>
  );
};
export default Template;
