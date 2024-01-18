import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {
    const navigate = useNavigate();


    const [details, setDetails] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleFormSubmit = async () => {

        const response = await axios.post(`${BASE_URL}/api/admin/login`, details);

        if (response.status == 201) {
            alert(response.data.error);
        } else if (response.status == 200) {
            navigate(`/dashboard`);
        }
    };

    const handleChangeFormDetails = (formdata) => {
        setDetails({ ...details, ...formdata });
    };


    useEffect(() => {
    }, []);

    return (
        <>
            <div className="logReg">
                <form className="form" onSubmit={(e) => handleSubmit(e)}>

                    <div className="formItems">
                        <input
                            className="logRegFromField"
                            placeholder="User Name"
                            type="text"
                            onChange={(e) =>
                                handleChangeFormDetails({ userName: e.target.value.trim() })
                            }
                        />
                    </div>

                    <div className="formItems">
                        <input
                            placeholder="Password"
                            className="logRegFromField"
                            type="text"
                            onChange={(e) =>
                                handleChangeFormDetails({ password: e.target.value.trim() })
                            }
                        />
                    </div>
                    <div className="formItemsButtons">
                        <button className="isRegLogButton">
                            <span onClick={() => handleFormSubmit()} >Login</span>
                        </button>
                    </div>
                </form>

            </div>
        </>
    );
};
export default Login;