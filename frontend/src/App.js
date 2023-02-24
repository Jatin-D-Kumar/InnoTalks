import { Routes, Route } from "react-router-dom";
import Chatpage from "./pages/Chatpage";
import Homepage from "./pages/Homepage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/chats" element={<Chatpage />} />
      </Routes>
    </div>
  );
}

export default App;
