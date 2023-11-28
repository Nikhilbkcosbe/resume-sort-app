import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from '../components/navbar';
import { useSelector } from 'react-redux';
import { BASE_URL, DOWNLOAD_RESUME, JIS_PDF_URL } from '../config';

const Jis = (props) => {
    const { state } = useLocation();
    const profile_details = useSelector(state => state.ProfileDetailsReduxState)
    const original_resume_url = DOWNLOAD_RESUME + "?url=" + state.pdf_path
    const [loadingJIS, setLoadingJIS] = useState(true);
    const [loadingOriginal, setLoadingOriginal] = useState(true);
    const handleLoadJIS = () => {
        setLoadingJIS(false);
    };
    const handleLoadOriginal = () => {
        setLoadingOriginal(false);
    };
    const jis_resume_url = JIS_PDF_URL + "?resume-id=" + profile_details._id
    return (
        <div>

            <Navbar handleLogout={props.handleLogout} />
            <h1>Original Resume V/S JIS Resume</h1>
            {console.log(state.pdf_path)}
            <div className='container mx-10'>
                <div className='row'>
                    <div className='col-sm-6'>
                        {/* {original_resume_url} */}
                        {loadingOriginal && (
                            <div>
                                <p>Loading Original Resume...</p>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                        <iframe src={original_resume_url} title='original_resume' width="100%" height="500px"
                            onLoad={handleLoadOriginal}

                        />
                    </div>
                    <div className='col-sm-6'>
                        {loadingJIS && (
                            <div>
                                <p>Loading JIS Resume...</p>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                        <iframe src={jis_resume_url}
                            title='jis resume' width="100%" height="500px"

                            onLoad={handleLoadJIS}
                        />
                    </div>

                </div>

            </div>
            {/* {state?.pdf_path} */}
        </div>
    )
}

export default Jis