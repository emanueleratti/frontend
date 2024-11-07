import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ChiSiamo } from "./pages/ChiSiamo";
import { Contatti } from "./pages/Contatti";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { BookDetails } from "./pages/BookDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageNotFound } from "./pages/PageNotFound";
import { ProtectedRoutes } from "../middlewares/ProtectedRoutes.jsx";
import { MyAccount } from "./pages/MyAccount.jsx";
import { SuccesLoginPage } from "./pages/SuccesLoginPage.jsx";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chi-siamo" element={<ChiSiamo />} />
        <Route path="/contatti" element={<Contatti />} />
        <Route path="/book/details/:_id" element={<BookDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success/:token" element={<SuccesLoginPage />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/myaccount" element={<MyAccount />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
