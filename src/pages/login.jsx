import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOGIN_URL } from '../config'
import LoadingBar from 'react-top-loading-bar'
import axios from 'axios'
import { LoginEmailAction, changeLanguageAction } from '../redux/actions'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'


function Login(props) {
    const loadingRef = useRef(null)
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    // const { t } = useTranslation()
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

                withCredentials: true
            })
                .then((res) => {
                    console.log(res.data)
                    dispatch(LoginEmailAction(res.data.email))
                    loadingRef.current.complete()
                    props.setAuthenticated(true)
                    navigate("/");
                }).catch(err => {
                    // alert("Incorrect email or password!")
                    console.log(err)
                    alert(err?.response?.data?.detail)
                    loadingRef.current.complete()

                })
        }
    }
    // function languageChange(lang) {
    //     i18next.changeLanguage(lang)
    //     dispatch(changeLanguageAction(lang))
    // }

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
                                        {/* <div style={{ display: 'inline-flex' }}>
                                            <div style={{ cursor: 'pointer', color: '#0d6efd' }} onClick={() => languageChange('en')}>
                                                <u><span>English</span>
                                                    <i className="bi bi-translate mx-2"></i></u>
                                            </div>
                                            <div style={{ cursor: 'pointer', color: '#0d6efd' }} onClick={() => languageChange('ja')}>
                                                <u><span>Japanese</span>
                                                    <i className="bi bi-translate mx-2"></i></u>
                                            </div>
                                        </div> */}
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
