import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from '../components/navbar';
import { useSelector } from 'react-redux';
import { BASE_URL, DOWNLOAD_RESUME, JIS_PDF_URL } from '../config';
import axios from 'axios';

const Jis = (props) => {
    const { state } = useLocation();
    const profile_details = useSelector(state => state.ProfileDetailsReduxState)
    const original_resume_url = DOWNLOAD_RESUME + "?url=" + state.pdf_path
    const jis_resume_url = JIS_PDF_URL + "?resume-id=" + profile_details._id
    const [loadingJIS, setLoadingJIS] = useState(true);
    const [loadingOriginal, setLoadingOriginal] = useState(true);
    const [pdfFile, setPdfFile] = useState(null);
    const [jisFile, setJisFile] = useState(null);

    useState(async () => {
        setLoadingOriginal(true)
        try {
            const response = await axios.get(original_resume_url, {
                responseType: 'blob',
                headers:{
                    Accept:"application/pdf"
                } // Set responseType to 'blob' to handle binary data
            });

            // Create a blob URL from the received blob data
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const pdfBlobUrl = URL.createObjectURL(blob);

            // Set the PDF blob URL to the state
            setPdfFile(pdfBlobUrl);
        } catch (error) {
            console.error('Error fetching PDF file:', error);
        } finally {
            setLoadingOriginal(false); // Set loading to false after fetching completes (or encounters an error)
        }
    }, [])
    useState(async () => {
        setLoadingJIS(true)
        try {
            const response = await axios.get(jis_resume_url, {
                responseType: 'blob',
                headers:{
                    Accept:"application/pdf"
                } // Set responseType to 'blob' to handle binary data
            });

            // Create a blob URL from the received blob data
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const pdfBlobUrl = URL.createObjectURL(blob);

            // Set the PDF blob URL to the state
            setJisFile(pdfBlobUrl);
        } catch (error) {
            console.error('Error fetching PDF file:', error);
        } finally {
            setLoadingJIS(false); // Set loading to false after fetching completes (or encounters an error)
        }
    }, [])


    const handleLoadJIS = () => {
        setLoadingJIS(false);
    };
    const handleLoadOriginal = () => {
        setLoadingOriginal(false);
    };

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
                        <embed src={pdfFile} type="application/pdf" width="100%" height="500px" />

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
                        <embed src={jisFile} type="application/pdf" width="100%" height="500px" />
                   
                    </div>

                </div>

            </div>
            {/* {state?.pdf_path} */}
        </div>
    )
}

export default Jis