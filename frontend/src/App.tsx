import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import AddCustomerPage from "./pages/AddCustomerPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { ToastProvider } from "./context/ToastContext";
import { useState } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <ToastProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route
                path="/dashboard"
                element={
                  <Layout
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                  />
                }
              >
                <Route index element={<HomePage searchValue={searchValue} />} />
                <Route path="customer/:id" element={<CustomerDetailPage />} />
                <Route path="add-customer" element={<AddCustomerPage />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
