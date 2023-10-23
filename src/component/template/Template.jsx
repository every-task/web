import { Outlet } from "react-router"
import Myheader from "./Myheader"


const Template = () => {



    return <>
        <Myheader />
        <Outlet />
    </>
}
export default Template
