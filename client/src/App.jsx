import Login from "./components/Login";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Portal from "./components/Portal";
import Cancel from "./components/Cancel";
import Signin from "./components/Signin";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
        <Route path="/portal" element={<Portal />}/>
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/signin" element={<Signin/>} />
          
    </Routes>
    </BrowserRouter>
  )
}

export default App;
