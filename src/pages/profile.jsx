import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/navbar";
import DefaultDP from "../defaultDP.png";
import { NavLink, useFetcher, useLocation } from "react-router-dom";
import { GET_PROFILE_IMAGE } from "../config";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";


function getImageData(image_path) {
    return axios
        .get(`${GET_PROFILE_IMAGE}?url=${image_path}`)
        .then((res) => res.data);
}
function Profile(props) {
    const { t } = useTranslation()
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
            <h1>{t("Profile Page")}</h1>
            {profileData !== null ?
                <div>
                    <div className="d-flex align-items-center">
                        <img src={image === "" ? DefaultDP : image} width="200" height="200" />
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-start my-2">
                                <label>{t("Name")}:</label>
                                <span className="">{profileData.extracted_json_data?.name}</span>
                            </div>
                            <div className="d-flex justify-content-start  my-2">
                                <label>{t("Role")}:</label>
                                <span>{profileData.extracted_json_data?.role}</span>
                            </div>
                            <div className="d-flex justify-content-start  my-2">
                                <label>{t("Email")}:</label>
                                <span>{profileData.extracted_json_data?.email}</span>
                            </div>{" "}
                            <div className="d-flex justify-content-start  my-2">
                                <label>{t("Phone")}:</label>
                                <span>{profileData.extracted_json_data?.phone_number}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        {profileData?.extracted_json_data?.summary ? (
                            <div>
                                <u>
                                    <h5>{t("Summary")}</h5>
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
                                    <h5>{t("Education")}</h5>
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
                                    <h5>{t("Skills")}</h5>
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
                                    <h5>{t("Certifications")}</h5>
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
                                    <h5>{t("Work Experience")}</h5>
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
                                    <h5>{t("Languages")}</h5>
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
                       {t("No project selected, please go back to dashboard page and click any ofthe listed profile")}!!
                    </i>
                    <NavLink to="/dashboard">{t("Click here")}</NavLink>
                </React.Fragment>
            }
        </div>
    );
}

export default Profile;
