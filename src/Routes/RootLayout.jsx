import Header from "../Components/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../Components/Footer";

export default function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.endsWith("/")) {
      navigate("/main-page");
    }
  }, [location]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
