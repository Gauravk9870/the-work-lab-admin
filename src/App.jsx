import { useState } from "react";

import styles from "./App.module.scss";
import { Link, Route, Routes } from "react-router-dom";
import Freelancers from "./pages/freelancers/Freelancers";
import Organization from "./pages/organization/Organization";
import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";
import Logo from "./assets/logo.png";

function App() {
  return (
    <div className={styles.admin}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.left__container}>
            <div className={styles.top}>
              <div className={styles.logo}>
                <img src={Logo} alt="the-work-labs-logo" />
              </div>
            </div>
            <nav className={styles.bottom}>
              <ul>
                <Link to={"/"}>
                  <li>Home</li>
                </Link>
                <Link to={"/freelancers"}>
                  <li>Freelancers</li>
                </Link>
                <Link to={"/organizations"}>
                  <li>Organizations</li>
                </Link>
                <Link to={"/settings"}>
                  <li>Settings</li>
                </Link>
              </ul>
            </nav>
          </div>
        </div>
        <div className={styles.right}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/freelancers" element={<Freelancers />} />
            <Route path="/organizations" element={<Organization />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
