import { useEffect, useState } from "react";
import { Cart } from "./pages/Cart/Cart";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/Signup/Signup.jsx";
import { WishList } from "./pages/WishList/WishList";
import { useAuth } from "./context/auth";
import { ProductID } from "./pages/ProductID/ProductID";
import { AccountSettings } from "./pages/AccountSettings/AccountSettings";
import { PasswordSetting } from "./pages/AccountSettings/components/PasswordSettings";
import { ProfileSetting } from "./pages/AccountSettings/components/ProfileSettings";
import jwt_decode from "jwt-decode";
import { PrivateRoute } from "./pages/PrivateRoute/PrivateRoute";
import { ProductPage } from "./pages/Product/Product";
import { Home } from "./pages/Home/Home";
import { Checkout } from "./pages/Checkout/Checkout";
import { NoMatch } from "./pages/NoMatch/NoMatch";
import { getUserData } from "./api";
import { getTokenFromLocalStorage, checkExpToken } from "./pages/utils";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    authState: { isUserLogin },
    authDispatch,
  } = useAuth();

  useEffect(() => {
    (async function () {
      if (!isUserLogin) {
        const token = getTokenFromLocalStorage();
        if (token) {
          const { exp, userID } = jwt_decode(token);
          const expToken = checkExpToken(exp);
          if (!expToken) {
            const userDetails = await getUserData(token, userID);
            if (!userDetails.errMessage) {
              authDispatch({
                type: "REFRESH_USER_DATA",
                payload: userDetails,
              });
              navigate(location.pathname);
            } else {
              navigate("/login");
            }
          }
        } else {
          // navigate(location.search);
        }
      }
    })();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:productID" element={<ProductID />} />

        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />

        <Route
          path="/account"
          element={
            <PrivateRoute>
              <AccountSettings />
            </PrivateRoute>
          }
        >
          <Route index element={<ProfileSetting />} />
          <Route path="profile" element={<ProfileSetting />} />
          <Route path="password" element={<PasswordSetting />} />
        </Route>

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <WishList />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}
