import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginView, RegistrationView, UsersView } from "./view";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/registration" element={<RegistrationView />} />
          <Route path="/user-view" element={<UsersView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
