import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import AuthService from "../services/auth.service";

//設定第一次使用google登入的使用者想註冊的身份
const SelectRole = ({ currentUser, setCurrentUser }) => {
  let [role, setRole] = useState("");
  const navigate = useNavigate();
  const checkRole = async () => {
    let response = await Axios.post(
      "http://localhost:8080/auth/google/checkRole",
      {
        role,
      }
    );
    console.log("test");
    localStorage.setItem("user", JSON.stringify(response.data));
    setCurrentUser(AuthService.getCurrentUser());
    // window.localStorage.setItem("");
    window.alert("恭喜使用Google帳號登入成功，將重新導向");
    navigate("/profile");
  };
  const handleRole = (e) => {
    setRole(e.target.value);
  };
  return (
    <div
      style={{
        padding: "1.5rem",
      }}
    >
      <div>第一次用google帳號登入的客戶，請選擇要註冊的身份</div>
      <br />
      <div>
        <select name="role" onChange={handleRole}>
          <option value="">選擇您要註冊的身份</option>
          <option value="student">學生</option>
          <option value="insructor">導師</option>
        </select>
      </div>
      <br />
      <button onClick={checkRole}>註冊</button>
    </div>
  );
};

export default SelectRole;
