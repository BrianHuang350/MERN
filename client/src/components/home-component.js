import React from "react";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <main>
      <div className="container py-4">
        <center>
          <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
              <h1
                className="display-5 fw-bold"
                style={{ paddingBottom: "1.5rem" }}
              >
                Introduction of website
              </h1>
              <p className="col-md-8 fs-4">
                <h4>本網站以MERN方式進行架設</h4>
                <h5>前端伺服器:</h5>
                <p>React.js</p>
                <h5>後端服務器:</h5>
                <p>Express.js、Node.js、MongoDB</p>
              </p>
              <button className="btn btn-secondary btn-lg" type="button">
                <a
                  href="https://www.mongodb.com/resources/languages/mern-stack"
                  target="_blank"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  認識MERN
                </a>
              </button>
            </div>
          </div>
        </center>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>作為一個學生</h2>
              <p>
                學生可以註冊他們喜歡的課程。本網站僅供練習之用，請勿提供任何個人資料，例如信用卡號碼。
              </p>
              <button className="btn btn-outline-secondary" type="button">
                <Link
                  to="/login"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  登錄會員或註冊會員
                </Link>
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>作為一個導師</h2>
              <p>
                您可以通過註冊成為一名講師，並開始製作在線課程。本網站僅供練習之用，請勿提供任何個人資料，例如信用卡號碼。
              </p>
              <button className="btn btn-outline-secondary" type="button">
                <Link
                  to="/login"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  登入教師帳號，即可創立課程
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeComponent;
