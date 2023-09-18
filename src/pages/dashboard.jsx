import React, {
    useState,
    useMemo,
    useRef,
    useEffect,
} from "react";
import Navbar from "../components/navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import axios from "axios";
import { DOWNLOAD_RESUME, GET_RESUME_DATA, UPLOAD_RESUME } from "../config";
import LoadingBar from "react-top-loading-bar";
import { useDispatch, useSelector } from "react-redux";
import { profileDetailsAction } from "../redux/actions";

const MAX_NUMBER_OF_PDF_UPLOAD_LIMIT = 20;

function getResumeData(projectID) {
    return axios
        .get(`${GET_RESUME_DATA}?projectID=${projectID}`)
        .then((res) => res.data);
}

function Dashboard(props) {
    const ProjectDetailsReduxState = useSelector(state => state.ProjectDetailsReduxState)
    const filterState = useRef();
    const dispatch = useDispatch()
    const tableRef = useRef();
    const navigate = useNavigate();
    const loadingRef = useRef(null);

    const [files, setFiles] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [columnDefs] = useState([
        {
            field: "extracted_json_data.name",
            headerName: "Name",
            filterParams: {
                maxNumConditions: 3,
            },
        },
        { field: "extracted_json_data.role", headerName: "Role" },
        {
            field: "extracted_json_data.year_of_experience",
            headerName: "Experience(years)",
            filter: "agNumberColumnFilter",
            filterParams: {
                filterOptions: [
                    "equals",
                    "lessThan",
                    "lessThanOrEqual",
                    "greaterThan",
                    "greaterThanOrEqual",
                    "inRange",
                ],
                maxNumConditions: 1,
            },
        },
        {
            field: "extracted_json_data.skills",
            headerName: "Skills",
            filterParams: {
                filterOptions: ["contains", "notContains", "notBlank", "blank"],
                maxNumConditions: 10,
            },
        },
        { field: "extracted_json_data.email", headerName: "Email" },
        { field: "extracted_json_data.phone_number", headerName: "Phone" },
        {
            field: "pdf_url",
            headerName: "Pdf",
            filter: false,
            cellRenderer: function (params) {
                return (
                    <a
                        href={`${DOWNLOAD_RESUME}?url=${params.value.split("s3.amazonaws.com/")[1]
                            }`}
                        ref={(ref) => {
                            if (!ref) return;
                            ref.onclick = (e) => {
                                e.stopPropagation();
                            };
                        }}
                    >
                        Pdf
                    </a>
                );
            },
        },
    ]);

    const fileInputRef = useRef(null);
    const defaultColDef = useMemo(() => {
        return {
            sortable: true,
            filter: true,
            flex: 1,
            suppressMovable: true,
            floatingFilter: true,
            filterParams: {
                buttons: ["reset"],
                filterOptions: ["startsWith", "endsWith", "contains"],
            },
        };
    }, []);
    const [selectedFiles, setSelectedFiles] = useState([]);
    let remainingFiles =
        MAX_NUMBER_OF_PDF_UPLOAD_LIMIT - tableData.length - selectedFiles.length;

    const handleFileEvent = (event) => {
        const newFiles = Array.from(event.target.files || []);

        // Check for duplicates by comparing file names
        // for (const newFile of newFiles) {
        //   if (selectedFiles.some((file) => file.name === newFile.name)) {
        //     alert(`Duplicate file selected: ${newFile.name}`);
        //     event.target.value = ""; // Clear the input field
        //     return;
        //   }
        // }

        setSelectedFiles([...newFiles]);
    };

    function handleUpload() {
        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append("files", file);
        });

        formData.append("projectID", ProjectDetailsReduxState._id);
        if (selectedFiles.length > 0) {
            if (
                selectedFiles.length + tableData.length <=
                MAX_NUMBER_OF_PDF_UPLOAD_LIMIT
            ) {
                loadingRef.current.continuousStart();
                axios
                    .post(UPLOAD_RESUME, formData)
                    .then((res) => {
                        console.log(res);
                        setTableData((prev) => [...prev, ...res.data.data]);
                        setSelectedFiles([]);
                        loadingRef.current.complete();
                        alert(`Uploaded ${selectedFiles.length} files successfully`);
                    })
                    .catch((err) => {
                        console.log(err);
                        loadingRef.current.complete();
                    });
            } else {
                alert("Max limit reached");
                setSelectedFiles([]);
                loadingRef.current.complete();
            }
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } else {
            alert("No Files Selected to upload!!");
        }
    }
    function handleShowAllAppliedFilter() {
        const filterState = tableRef.current.api.getFilterModel();
        // console.log(Object.keys(filterState));
    }
    useEffect(() => {
        loadingRef.current.continuousStart();
        console.log(ProjectDetailsReduxState?._id)
        getResumeData(ProjectDetailsReduxState?._id)
            .then((res) => {
                console.log(res.data);
                setTableData(res?.data);
                loadingRef.current.complete();
            })
            .catch((err) => {
                console.log(err);
                loadingRef.current.complete();
            });
    }, []);
    return (
        <div>
            <Navbar handleLogout={props.handleLogout} />
            <h1>Dashboard</h1>
            <LoadingBar color="#0d6efd" ref={loadingRef} />
            {console.log(ProjectDetailsReduxState !== null)}
            {ProjectDetailsReduxState !== null ?


                <div>
                    <h3>{ProjectDetailsReduxState.projectName}</h3>
                    <p>
                        File limit that can be uploaded {MAX_NUMBER_OF_PDF_UPLOAD_LIMIT}{" "}
                        files
                    </p>

                    <input
                        ref={fileInputRef}
                        id="fileInput"
                        type="file"
                        multiple
                        accept="application/pdf"
                        onChange={handleFileEvent}
                    />

                    <p className="text-danger">
                        {remainingFiles > 0
                            ? remainingFiles + " more file to reach limit"
                            : remainingFiles === 0
                                ? "Limit reached"
                                : "Limit exceeded"}
                    </p>

                    <br />

                    <label>
                        <button onClick={handleUpload} >
                            Upload Files
                        </button>
                    </label>

                    <button onClick={() => tableRef.current.api.setFilterModel({})}>
                        Clear All Filters
                    </button>

                    <Container>
                        <div className="ag-theme-alpine">
                            <AgGridReact
                                ref={tableRef}
                                rowData={tableData}
                                columnDefs={columnDefs}
                                defaultColDef={defaultColDef}
                                onRowClicked={(e) => {
                                    console.log("row clicked", e.data)
                                    dispatch(profileDetailsAction(e.data))

                                    navigate("/profile", { state: { profile: e.data } });
                                }}
                                domLayout="autoHeight"
                                pagination={true}
                                paginationPageSize={10}
                            ></AgGridReact>
                        </div>
                    </Container>
                </div>
                :

                <React.Fragment>
                    <i className="text-danger">
                        No project selected, please go back to home page and start any of
                        the listed project!!
                    </i>
                    <NavLink to="/">Click here</NavLink>
                </React.Fragment>
            }
        </div>
    )
}

export default Dashboard
