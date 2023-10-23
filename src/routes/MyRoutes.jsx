import { BrowserRouter, Route, Routes } from "react-router-dom"
import Template from "../component/template/Template"

const MyRoutes = () => {


    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login></Login>} />
            <Route path="/signup" element={<SignUp></SignUp>} />
            <Route element={<Template />}>
                <Route />

            </Route>

        </Routes>
    </BrowserRouter>

}
export default MyRoutes