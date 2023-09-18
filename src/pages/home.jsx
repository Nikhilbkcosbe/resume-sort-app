import { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import {
  CREATE_PROJECT_URL,
  DELETE_PROJECT_URL,
  GET_ALL_PROJECTS_URL,
} from "../config";
import { Card } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { CreateProjectModal, DeleteProjectModal, ProjectCard } from "../components/projectModals";
import { useSelector } from "react-redux";

function getAllProject() {
  return axios.get(GET_ALL_PROJECTS_URL).then((res) => res.data);
}
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}


export default function Home(props) {
  const [showProjectCreateModal, setShowProjectCreateModal] =
    useState(false);
  const [showProjectDeleteModal, setShowProjectDeleteModal] =
    useState(false);
  const [projectList, setProjectList] = useState([]);
  const [filteredSortedProjectList, setFilteredSortedProjectList] = useState([]);
  const [projectNameSortOrder, setProjectNameSortOrder] = useState("asc");
  const [createdBySortOrder, setCreatedBySortOrder] = useState("asc");
  const [createdAtSortOrder, setCreatedAtSortOrder] = useState("asc");

  const [projectDetails, setProjectDetails] = useState({ projectName: "", projectDescription: "" });
  const [deletingProjectDetails, setDeletingProjectDetail] = useState({ projectName: "", projectID: "" });
  const loadingRef = useRef(null);


  const email = useSelector(state=>state.LoginEmailReduxState);
  const handleCloseProjectCreateModal = () => setShowProjectCreateModal(false);
  const handleShowProjectCreateModal = () => setShowProjectCreateModal(true);
  const handleCloseProjectDeleteModal = () => setShowProjectDeleteModal(false);
  const handleShowProjectDeleteModal = () => setShowProjectDeleteModal(true);
  function handleChange(event) {
    setProjectDetails({
      ...projectDetails,
      [event.target.name]: event.target.value,
    });
  }
  function handleCreateProject() {
    loadingRef.current.continuousStart();
    let projectData = {
      ...projectDetails,
      createdBy: email,
    };
    axios
      .post(CREATE_PROJECT_URL, projectData)
      .then((res) => {
        if (res.status === 201) {
          console.log(res.data.data);
          handleCloseProjectCreateModal();
          setProjectDetails({ projectName: "", projectDescription: "" });
          setProjectList((projectList) => [...projectList, res.data.data]);
          setFilteredSortedProjectList((filteredSortedProjectList) => [
            ...filteredSortedProjectList,
            res.data.data,
          ]);
          loadingRef.current.complete();

        }
      })
      .catch((err) => {
        console.log(err)
         loadingRef.current.complete();
      })
  }
  function handleDeleteProject() {
    loadingRef.current.continuousStart();
    axios
      .delete(DELETE_PROJECT_URL + deletingProjectDetails.projectID)
      .then((res) => {
        
        let tmp = projectList.filter(
          (each) => each._id !== deletingProjectDetails.projectID
        );
        console.log(tmp);
        setProjectList(tmp);
        setFilteredSortedProjectList(tmp);
        handleCloseProjectDeleteModal();
        loadingRef.current.complete();
      }).catch((err) => {
        console.log(err)
         loadingRef.current.complete();
      })
  }

  function handleDeleteFromCard(obj) {
    setShowProjectDeleteModal(true);
    setDeletingProjectDetail(obj);
  }
  function handleSearchChange(e) {
    let filteredListTmp = projectList.filter((each) =>
      each.projectName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredSortedProjectList(filteredListTmp);
  }

  function handleSort(e) {
    const sortCriteria = e.currentTarget.name;
    const sortOrder = sortCriteria === "projectName" ? projectNameSortOrder :sortCriteria === "createdBy"? createdBySortOrder:createdAtSortOrder;
  
    const sortedList = [...filteredSortedProjectList].sort((a, b) => {
      const aValue = a[sortCriteria].toLowerCase();
      const bValue = b[sortCriteria].toLowerCase();
  
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
  
    setFilteredSortedProjectList(sortedList);
  
    if (sortCriteria === "projectName") {
      setProjectNameSortOrder(order => (order === "asc" ? "desc" : "asc"));
    } else if (sortCriteria === "createdBy") {
      setCreatedBySortOrder(order => (order === "asc" ? "desc" : "asc"));
    } else {
      setCreatedAtSortOrder(order => (order === "asc" ? "desc" : "asc"));
    }
  }
  
  
  
  
  
  
  
  useEffect(() => {
    getAllProject()
      .then((res) => {
        console.log(res);
        if (res.projects) {
          setProjectList(res.projects);
          setFilteredSortedProjectList(res.projects);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
        <LoadingBar color="#0d6efd" ref={loadingRef} />
      <Navbar handleLogout={props.handleLogout} />

      <h3>Projects</h3>

      <div>
        <h6>Search Projects</h6>
        {/* debounce is the technique to handle efficient way to handle api call for the frequently changing component like input,mouse hover */}
        <input
          type="text"
          onChange={debounce(handleSearchChange, 1000)}
          placeholder="&#x1F50D;enter project name"
        />
      </div>
      <div>
        <h6>Sort By</h6>
        <button name="projectName" onClick={handleSort}>
          Project Name{"\u2191"}
          {"\u2193"}
        </button>
        <button name="createdBy" onClick={handleSort}>
          Created by{"\u2191"}
          {"\u2193"}
        </button>
        <button name="createdAt" onClick={handleSort}>
        Created at{"\u2191"}
        {"\u2193"}
      </button>
      </div>
      <br />
      <button onClick={handleShowProjectCreateModal}>Create New Project</button>

      <Container className="my-2"style={{ display: "flex", flexWrap: "wrap" }}>
        <Row>
          {filteredSortedProjectList?.map((each, idx) => (
            <Col key={idx} lg={3} md={4} sm={6} xs={12} style={{ marginBottom: "1rem", flex: "1" }}>
              <ProjectCard
                data={each}
                showDeleteModal={handleShowProjectDeleteModal}
                handleDeleteFromCard={handleDeleteFromCard}
          
              />
            </Col>
          ))}
        </Row>
      </Container>
      <CreateProjectModal
        show={showProjectCreateModal}
        onHide={handleCloseProjectCreateModal}
        handleChange={handleChange}
        projectDetails={projectDetails}
        handleCreateProject={handleCreateProject}
      />
      <DeleteProjectModal
        show={showProjectDeleteModal}
        onHide={handleCloseProjectDeleteModal}
        handleChange={handleChange}
        deletingProjectDetails={deletingProjectDetails}
        handleDeleteProject={handleDeleteProject}
      />
    </div>
  );
}
