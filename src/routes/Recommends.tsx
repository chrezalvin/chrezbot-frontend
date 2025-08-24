import debug from "debug";

import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Dropdown, DropdownButton, Form, InputGroup, Modal, ModalProps, Row, Spinner } from "react-bootstrap";
import { Recommend } from "../API/models";
import { getAllRecommends } from "../API/service/RecommendService";

const log = debug("app:Recommends");

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

function DisplayRecommend(recommend: Recommend, onSelectDelete: (recommend: Recommend) => void){
    const title = recommend.title;
    const description = recommend.description;
    const id = recommend.recommend_id;

    return (
        <Card
            key={id}
            className="h-100 py-2 px-1"
        >
            {
                recommend.imgUrl && (
                    <Card.Img
                        variant="top"
                        src={recommend.imgUrl}
                        width={100}
                        height={180}
                        className="object-fit-cover"
                    />
                )
            }
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
    const [recommends, setRecommend] = useState<Recommend[]>();
    const [search, setSearch] = useState<string>("");
    const [selectedDeleteRecommended, setSelectedDeleteRecommended] = useState<Recommend>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const allCategories: string[] = [];

    async function getRecommend(): Promise<void>{
        setIsLoading(true);
        setError(null);

        try{
            log("Getting all recommends");
            
            const recs = await getAllRecommends();
            setRecommend(recs);

            log("Sucessfully get all recommends");
        }
        catch(e){
            if(e instanceof Error)
                setError(e.message);
            else{
                log(`Unknown error: ${e}`);
                setError("An unknown error occurred");
            }
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getRecommend();
    }, [])

    const recommendDisplayList = recommends?.filter((rec) => {
        return rec.title.toLowerCase().includes(search.toLowerCase()) || rec.description.toLowerCase().includes(search.toLowerCase());
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
                recommend={selectedDeleteRecommended}
                show={selectedDeleteRecommended !== undefined}
                onHide={() => setSelectedDeleteRecommended(undefined)}
            />
            <Container className="w-100 h-100" fluid>
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
                {
                    isLoading ?
                    (
                        <Container className="w-100 h-100 d-flex justify-content-center align-items-center" fluid>
                            <Spinner />
                        </Container>
                    )
                    :
                    (
                        <Row className="g-3">
                            {recommendDisplayList}
                        </Row>
                    )
                    
                }
            </Container>
        </>
    )
}

export default Recommends;