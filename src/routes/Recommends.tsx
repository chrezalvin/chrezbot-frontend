import { useEffect, useState } from "react";
import { Recommend, RecommendDoc, getAllRecommends } from "../API/API";
import { Button, Card, Col, Container, Dropdown, DropdownButton, Form, InputGroup, Modal, ModalProps, Row } from "react-bootstrap";

interface ConfirmDeleteModalProps extends ModalProps {
    recommend?: Recommend,
}

function ConfirmDeleteModal(
    props: ConfirmDeleteModalProps
) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          <h4>Are you sure you want to delete <span className="text-success">{props.recommend?.title}</span>?</h4>
          <p>
            {props.recommend?.description}
          </p>
        </Modal.Body>
        <Modal.Footer>
            <Button
            variant="danger"
            onClick={
                async () => {
                    // TODO: delete recommend
                }}
            >
                Yes, Delete this recommend
            </Button>
          <Button variant="warning" onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
}

function DisplayRecommend(recommend: RecommendDoc, onSelectDelete: (recommend: RecommendDoc) => void){
    const title = recommend.data.title;
    const description = recommend.data.description;
    const id = recommend.id;

    return (
        <Card
            key={id}
            className="h-100 py-2 px-1"
        >
            <Card.Img
                variant="top"
                src={recommend.data.imgUrl}
                width={100}
                height={180}
                className="object-fit-contain"
            />
            <Card.Body
                className="p-2"
            >
                <Card.Title
                    className="text-dark"
                >
                    {title.length > 20 ? `${title.substring(0, 20)}...` : title}
                </Card.Title>
                <Card.Text
                    className="text-dark"
                >
                    {description.length > 60 ? `${description.substring(0, 60)}...` : description}
                </Card.Text>
            </Card.Body>
            <Card.Footer
                className="d-flex gap-2"
            >
                <Button
                    variant="success"
                >
                    Edit
                </Button>
                <Button
                    variant="danger"
                    onClick={() => {onSelectDelete(recommend)}}
                >
                    Delete
                </Button>
            </Card.Footer>
        </Card>
    );
}

function Recommends(){
    const [recommends, setRecommend] = useState<RecommendDoc[]>();
    const [search, setSearch] = useState<string>("");
    const [selectedDeleteRecommended, setSelectedDeleteRecommended] = useState<RecommendDoc>();

    const allCategories: string[] = [];

    if(recommends)
        for(let rec of recommends){
            if(rec.data.category)
                rec.data.category.forEach((cat) => {
                    const lowercasecat = cat.toLowerCase();
                    if(!allCategories.includes(lowercasecat)){
                        allCategories.push(lowercasecat);
                    }
                })
        }

    useEffect(() => {
        getAllRecommends().then((recs) => {
            setRecommend(recs);
        });
    }, [])

    const recommendDisplayList = recommends?.filter((rec) => {
        return rec.data.title.toLowerCase().includes(search.toLowerCase()) || rec.data.description.toLowerCase().includes(search.toLowerCase());
    }).map(rec => {
        return (
            <Col lg={4}>
                {DisplayRecommend(rec, (recommend) => {setSelectedDeleteRecommended(recommend)})}
            </Col>
        );
    });

    return (
        <>
            <ConfirmDeleteModal
                recommend={selectedDeleteRecommended?.data}
                show={selectedDeleteRecommended !== undefined}
                onHide={() => setSelectedDeleteRecommended(undefined)}
            />
            <Container fluid>
                <Row>
                    <Col className="col-12 text-center">
                        <h1>Recommends</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <InputGroup className="mb-3 w-50">
                        <DropdownButton
                            variant="outline-secondary"
                            title="category"
                            id="input-group-dropdown-1"
                        >
                            {
                                allCategories.map((cat) => {
                                    return (
                                        <Dropdown.Item href="#">{cat}</Dropdown.Item>
                                    )
                                })
                            }
                        </DropdownButton>
                            <Form.Control
                                placeholder="Search title or description"
                                aria-label="Search title or description"
                                aria-describedby="basic-addon2"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="g-3">
                    {recommendDisplayList}
                </Row>
            </Container>
        </>
    )
}

export default Recommends;