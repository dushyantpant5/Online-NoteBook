import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotesState from "./context/notes/NotesState";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
function App() {
  return (
    <NotesState>
      <BrowserRouter>
        <Navbar />

        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route exact path="/about" element={<About />} />

            <Route exact path = "/login" element={<Login/>}/>

            <Route exact path = "/signup" element={<SignUp/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </NotesState>
  );
}

export default App;
