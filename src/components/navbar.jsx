import React from "react";
import CosBE from "../cosbe_logo.svg";
import axios from "axios";
import { LOGOUT_URL } from "../config";
import { useNavigate } from "react-router-dom";
function Navbar(props) {
    const navigate=useNavigate()
    // function handleLogout(){
    //     // axios.get(LOGOUT_URL,{withCredentials:true}).then(res=>{
    //     //     console.log(res.data)
    //     //     navigate('/login')

    //     // }).catch(err=>console.log(err))
    // }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand p-0" href="/">
                        <img src={CosBE} alt="" width="50" height="50" />
                    </a>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                 
                            <div className="mx-2" style={{ "cursor": "pointer" }} onClick={()=>navigate("/")}>
                                <span>Home</span>
                                <i className="bi-house mx-2"></i>
                            </div>
                            <div className="mx-2" style={{ "cursor": "pointer" }} onClick={()=>props.handleLogout()}>
                                <span>logout</span>
                                <i className="bi-box-arrow-right mx-2"></i>
                            </div>

             


                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
