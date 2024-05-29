import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Component/pages/HomePage";
import LoginPage from "./Component/pages/LoginPage";
import ProfilePage from "./Component/pages/ProfilePage";
import RegisterPage from "./Component/pages/RegisterPage";
import NotFoundPage from "./Component/pages/NotFoundPage";
import PrivateRoutes from "./routes/PrivateRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // const isOnline = useOnlineStatus();
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<HomePage />} path="/" exact />
          <Route element={<ProfilePage />} path="/me" />
        </Route>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* {isOnline ? toast.success("✅ Online") : toast.error("❌ Disconnected")} */}
    </>
  );
}

export default App;
