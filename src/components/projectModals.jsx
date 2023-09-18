import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { projectDetailsAction } from "../redux/actions";

export function CreateProjectModal(props) {
    const { show, projectDetails } = props;
    return (
      <Modal
        show={show}
        onHide={props.onHide}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Project Name</label>
            <br />
            <input
              name="projectName"
              value={projectDetails.projectName}
              onChange={props.handleChange}
            />
            <br />
            <label>Description</label>
            <br />
            <input
              name="projectDescription"
              value={projectDetails.projectDescription}
              onChange={props.handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleCreateProject}>
            Create Project
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  export function DeleteProjectModal(props) {
    const { show, projectDetails } = props;
  
    return (
      <Modal
        show={show}
        onHide={props.onHide}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card.Text>
            Are you sure, you want to delete project{" "}
            {props.deletingProjectDetails.projectName} ?
          </Card.Text>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="danger" onClick={props.handleDeleteProject}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
export function ProjectCard(props) {
  const dispatch=useDispatch()
    const { _id, projectName, projectDescription, createdBy, createdAt } =
      props.data;
    const navigate = useNavigate();
    function handleStart() {
      dispatch(projectDetailsAction(props.data))
      window.localStorage.setItem("projectDetails", JSON.stringify(props.data));
      navigate("/dashboard");
    }
    return (
      <Card key={_id} className="my-2" style={{ height: "100%" ,}}>
        <Card.Header as="h5">{projectName}</Card.Header>
        <Card.Body>
          <Card.Text as="i">Description :</Card.Text>
          <Card.Text className="">{projectDescription}</Card.Text>
          <Card.Text as="i">Created by :</Card.Text>
          <Card.Text>{createdBy}</Card.Text>
          <Card.Text as="i">Created Time :</Card.Text>
          <Card.Text>{createdAt}</Card.Text>
          <Container>
            <Row className="row">
              <Col className="m-0 p-0">
                <Button variant="primary" onClick={handleStart}>
                  Start
                </Button>
              </Col>
              <Col className="m-0 p-0 d-flex justify-content-end">
                <Button
                  variant="danger"
                  onClick={() => {
                    props.handleDeleteFromCard({ projectID: _id, projectName });
                  }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }
  