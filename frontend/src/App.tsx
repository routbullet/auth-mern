import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginView, RegistrationView } from "./view";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/registration" element={<RegistrationView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
