import { BrowserRouter, Route, Routes } from "react-router-dom"
import Template from "../component/template/Template"
import Main from "../component/main/Main"

const MyRoutes = () => {


    return <BrowserRouter>
        <Routes>
            {/* <Route path="/login" element={<Login></Login>} />
            <Route path="/signup" element={<SignUp></SignUp>} /> */}
            <Route element={<Template />}>
                <Route path="/" element={<Main />} />
            </Route>

        </Routes>
    </BrowserRouter>

}
export default MyRoutes