import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const GitHubRedirect = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      setTimeout(() => {
        navigate("/homepage");
      }, 1000);
    }
  }, [navigate, code]);

  return <div>{code && <p>Redirect alla homepage...</p>}</div>;
};
