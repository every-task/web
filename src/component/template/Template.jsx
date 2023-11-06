import { Outlet } from "react-router"
import Myheader from "./Myheader"
import MyFooter from "./MyFooter";


const Template = () => {



    return <>
        <Myheader />
        <Outlet />
        <MyFooter/>
    </>
}
export default Template
