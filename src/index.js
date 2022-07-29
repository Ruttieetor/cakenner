import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Recipe from "./pages/Recipe";
import Recipes from "./pages/Recipes";
import Login from "./pages/Login";


export default function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar />}>
                    <Route index element={<Home />} />
                    <Route path="/recipe/:id" element={<Recipe />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);