import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Component/pages/HomePage";
import LoginPage from "./Component/pages/LoginPage";
import ProfilePage from "./Component/pages/ProfilePage";
import RegisterPage from "./Component/pages/RegisterPage";
import NotFoundPage from "./Component/pages/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<HomePage />} path="/" exact />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<ProfilePage />} path="/me" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </>
  );
}

export default App;
