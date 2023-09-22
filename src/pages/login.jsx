import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOGIN_URL } from '../config'
import LoadingBar from 'react-top-loading-bar'
import axios from 'axios'
import { LoginEmailAction } from '../redux/actions'
import { useDispatch } from 'react-redux'


function Login(props) {
    const loadingRef = useRef(null)
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    function handleChange(event) {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });

    }
    function handleLoginSubmit() {
        loadingRef.current.continuousStart();
        if (credentials.email === "" || credentials.password === "") {
            alert("Email or Password can't be empty!!")
        }
        else {
            axios.post(LOGIN_URL, credentials, {
                headers: {
                    "Access-Control-Allow-Origin": "https://www.resume-sort-app.cosbe.inc"
                },
                withCredentials: true
            })
                .then((res) => {
                    console.log(res.data)
                    dispatch(LoginEmailAction(res.data.email))
                    loadingRef.current.complete()
                    props.setAuthenticated(true)
                    navigate("/");
                }).catch(err => {

                    alert(err?.response?.data?.detail)
                    loadingRef.current.complete()

                })
        }
    }

    return (
        <div>
            <LoadingBar color="#0d6efd" ref={loadingRef} />
            <div className="container">
                <div className="row vh-100 d-flex justify-content-center align-items-center">
                    <div className="col col-lg-4 col-md-8 col-xs-12">
                        <div className="border border-3 border-primary"></div>
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">
                                        Resume Sort App
                                    </h2>
                                    <p className="card-subtitle text-muted">Powered by CosBE</p>
                                    <br />
                                    <p className=" mb-3">Please enter your login and password!</p>
                                    <div className="mb-3">
                                        <form>
                                            <div className="mb-3 from-group">
                                                <label className="form-label">Email address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    value={credentials.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3 from-group">
                                                <label className="form-label">Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    value={credentials.password}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3 from-group">
                                                <p className="small">
                                                    <a className="text-primary" href="#!">
                                                        Forgot password?
                                                    </a>
                                                </p>
                                            </div>
                                            <div className="d-grid">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={handleLoginSubmit}
                                                >
                                                    Login
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
