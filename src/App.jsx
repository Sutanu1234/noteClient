import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./auth/Login";
import AdminRegister from "./auth/AdminRegister";
import UserRegister from "./auth/UserRegister";
import SideBar from "./SideBar";
import JoinTenant from "./pages/member/JoinTeam";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
    <Toaster />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-admin" element={<AdminRegister />} />
        <Route path="/register-user" element={<UserRegister />} />
        <Route path="/join/:inviteCode" element={<JoinTenant />} />
        <Route path="/*" element={<SideBar />} />
      </Routes>
    </>
  );
}

export default App;
