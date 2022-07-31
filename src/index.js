import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Recipe from "./pages/Recipe";
import Recipes from "./pages/Recipes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SendRecipe from "./pages/SendRecipe";
import ToBeRated from "./pages/ToBeRated";
import SendRated from "./pages/SendRated";


export default function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar />}>
                    <Route index element={<Home />} />
                    <Route path="/recipe/:id" element={<Recipe />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/sendRecipe" element={<SendRecipe />} />
                    <Route path="/sendRated/:id" element={<SendRated />} />
                    <Route path="/rate" element={<ToBeRated />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);