import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/auth/login" element={<Login />} />
    //     <Route path="/auth/signup" element={<Signup />} />
    //   </Routes>
    // </BrowserRouter>
    <div className="min-h-screen flex items-center justify-center bg-blue-500 text-white text-3xl">
      Tailwind Not Works 🎉
    </div>
  );
}

export default App;
