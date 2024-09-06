import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import AuthService from "../services/auth.service";

const RedirectProfile = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const makeJWT = async () => {
    const response = await Axios.get(
      "http://localhost:8080/auth/google/getJWT"
    );
    localStorage.setItem("user", JSON.stringify(response.data));
    setCurrentUser(AuthService.getCurrentUser());
    // window.localStorage.setItem("");

    window.alert("恭喜使用Google帳號登入成功，將重新導向");
    navigate("/profile");
  };
  useEffect(() => {
    try {
      makeJWT();
    } catch (e) {
      console.log(e);
    }
  }, []);
  // (async () => {
  //   const response = await Axios.get(
  //     "http://localhost:8080/auth/google/getJWT"
  //   );
  //   localStorage.setItem("user", JSON.stringify(response.data));
  //   setCurrentUser(AuthService.getCurrentUser());
  //   // window.localStorage.setItem("");
  //   window.alert("123");
  //   window.alert("恭喜使用Google帳號登入成功，將重新導向");
  //   navigate("/profile");
  // })();
  // const makeJWT = async () => {
  //   const responce = await Axios.get(
  //     "http://localhost:8080/auth/google/getJWT"
  //   );
  //   localStorage.setItem("user", JSON.stringify(response.data));
  //   setCurrentUser(AuthService.getCurrentUser());
  //   // window.localStorage.setItem("");
  //   window.alert("恭喜使用Google帳號登入成功，將重新導向");
  //   navigate("/profile");
  // };

  return <div></div>;
};

export default RedirectProfile;
