import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/navbar";
import DefaultDP from "../defaultDP.png";
import { NavLink, useFetcher, useLocation } from "react-router-dom";
import { GET_PROFILE_IMAGE } from "../config";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { useSelector } from "react-redux";


function getImageData(image_path) {
    return axios
        .get(`${GET_PROFILE_IMAGE}?url=${image_path}`)
        .then((res) => res.data);
}
function Profile(props) {
    const location = useLocation();
    const loadingRef = useRef(null);
    const profileData = useSelector(state => state.ProfileDetailsReduxState)
    const image_path = profileData?.image_url?.split("s3.amazonaws.com/")[1];
    const [image, setImage] = useState("");
    useEffect(() => {
        if (image_path !== undefined) {
            loadingRef.current.continuousStart();
            console.log(image_path);
            getImageData(image_path)
                .then((res) => {
                    setImage(`data:image/jpeg;base64,${res.data}`);
                    loadingRef.current.complete();
                })
                .catch((err) => {
                    console.log(err)
                    loadingRef.current.complete();
                });
        }
    }, []);

    return (
        <div>
            <LoadingBar color="#0d6efd" ref={loadingRef} />
            <Navbar handleLogout={props.handleLogout} />
            <h1>Profile Page</h1>
            {profileData !== null ?
                <div>
                    <div className="d-flex align-items-center">
                        <img src={image === "" ? DefaultDP : image} width="200" height="200" />
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-start my-2">
                                <label>Name:</label>
                                <span className="">{profileData.extracted_json_data?.name}</span>
                            </div>
                            <div className="d-flex justify-content-start  my-2">
                                <label>Role:</label>
                                <span>{profileData.extracted_json_data?.role}</span>
                            </div>
                            <div className="d-flex justify-content-start  my-2">
                                <label>Email:</label>
                                <span>{profileData.extracted_json_data?.email}</span>
                            </div>{" "}
                            <div className="d-flex justify-content-start  my-2">
                                <label>Phone:</label>
                                <span>{profileData.extracted_json_data?.phone_number}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        {profileData?.extracted_json_data?.summary ? (
                            <div>
                                <u>
                                    <h5>Summary</h5>
                                </u>
                                <p>{profileData.extracted_json_data.summary}</p>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div>
                        {profileData?.extracted_json_data?.education ? (
                            <div>
                                <u>
                                    <h5>Education</h5>
                                </u>
                                <p>{profileData.extracted_json_data?.education}</p>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div>
                        {profileData?.extracted_json_data?.skills ? (
                            <div>
                                <u>
                                    <h5>Skills</h5>
                                </u>
                                <p>{profileData.extracted_json_data?.skills}</p>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div>
                        {profileData?.extracted_json_data?.certifications ? (
                            <div>
                                <u>
                                    <h5>Certifications</h5>
                                </u>
                                <p>{profileData.extracted_json_data?.certifications}</p>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div>

                        {profileData?.extracted_json_data?.work_experience ? (
                            <div>
                                <u>
                                    <h5>Work Experience</h5>
                                </u>
                                <p>{profileData.extracted_json_data?.work_experience}</p>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div>
                        {profileData?.extracted_json_data?.languages ? (
                            <div>
                                <u>
                                    <h5>Languages</h5>
                                </u>
                                <p>{profileData.extracted_json_data?.languages}</p>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                :
                <React.Fragment>
                    <i className="text-danger">
                        No project selected, please go back to dashboard page and click any of
                        the listed profile!!
                    </i>
                    <NavLink to="/dashboard">Click here</NavLink>
                </React.Fragment>
            }
        </div>
    );
}

export default Profile;
