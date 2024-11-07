import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const isAuth = () => {
  const token = localStorage.getItem("isAuth");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const useSession = () => {
  const session = isAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/");
    }
  }, [navigate, session]);

  return session;
};

export const ProtectedRoutes = () => {
  const isAuthorized = isAuth();
  return isAuthorized ? <Outlet /> : <Login />;
};
