
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


// Import dealer pages 
import {
  DeviceManagementcompForDealer,
  AlertForDealer,
  ManageCustomerForDealer,
  DealerDashboard,
} from "./pages/Dealer/Dealer.js";

// Import Components 
import {
  Header,
  Login,
  ResetPassword,
  ForgetPassword,
  OTPVerification
} from "./components/index.js";

import {  ProtectedRouteForDealer } from "./ProtectedRoute/ProtectedRoute.jsx";

function App() {



  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
              <Navigate to="/DealerDashboard" />
          }
        />

        <Route
          path="/reset-password"
          element={
              <ResetPassword />
          }
        />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/otp-verification" element={<OTPVerification />} />



       

        <Route
          path="/AlertForDealer"
          element={
            <ProtectedRouteForDealer>
              <AlertForDealer />
            </ProtectedRouteForDealer>
          }
        />

        <Route
          path="/DealerDashboard"
          element={
            <ProtectedRouteForDealer>
              <DealerDashboard />
            </ProtectedRouteForDealer>
          }
        />
        <Route
          path="/DeviceManagementcompForDealer"
          element={
            <ProtectedRouteForDealer>
              <DeviceManagementcompForDealer />
            </ProtectedRouteForDealer>
          }
        />
        <Route
          path="/ManageCustomerForDealer"
          element={
            <ProtectedRouteForDealer>
              <ManageCustomerForDealer />
            </ProtectedRouteForDealer>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
