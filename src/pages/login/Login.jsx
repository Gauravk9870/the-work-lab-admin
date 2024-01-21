import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./login.module.scss";
import Logo from "../../assets/logo.png";
import Loading from "../../components/loading/Loading";
import { useAuth } from "../../context/AuthContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const { authenticated, login, logout } = useAuth();
  // Redirect to dashboard if already authenticated
  if (authenticated) {
    return <Navigate to="/dashboard" />;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage("Logging in...");
      const response = await axios.post(`${BASE_URL}/api/admin/login`, details);

      if (response.status == 201) {
        setMessage(response.data.error);
      } else if (response.status == 200) {
        setMessage("Login Successful, Redirecting...");
        login();
        navigate(`/dashboard`);
      }
    } catch (err) {
      setMessage("Login Failed");
      setLoading(false);
      logout();
    } finally {
      console.log("finally");
      setLoading(false);
    }
  };

  const handleChangeFormDetails = (formdata) => {
    setDetails({ ...details, ...formdata });
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className={styles.login}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.logo}>
              <img src={Logo} alt="" />
            </div>
            <div className={styles.title}>
              <h1>Admin Login</h1>
            </div>
          </div>
          <div className={styles.bottom}>
            <form className={styles.form}>
              <div className={styles.item}>
                <input
                  className="logRegFromField"
                  placeholder="User Name"
                  type="text"
                  onChange={(e) =>
                    handleChangeFormDetails({ userName: e.target.value.trim() })
                  }
                />
              </div>

              <div className={styles.item}>
                <input
                  placeholder="Password"
                  className="logRegFromField"
                  type="text"
                  onChange={(e) =>
                    handleChangeFormDetails({ password: e.target.value.trim() })
                  }
                />
              </div>
              <div className={styles.item}>
                <button onClick={(e) => handleFormSubmit(e)}>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {loading && <Loading message={message} />}
    </>
  );
};
export default Login;
