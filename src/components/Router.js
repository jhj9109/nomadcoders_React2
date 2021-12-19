import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navigation from "components/Navigation";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Profile from "routes/Profile";

// 인증 여부에 따라 route 주소가 달라질 것임
// 로그인시 보여줄 컴포넌트가 더 많아서 Fragment 활용
const AppRouter = ({ isLoggedIn, userObj, onLogout }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation onLogout={onLogout} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home userObj={userObj} />} />
            <Route exact path="/profile" element={<Profile userObj={userObj} />} />
          </>
        ) : (
          <>
            <Route exact path="/" element={<Auth />} />
            <Route exact path="/profile" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
