import debug from "debug";

import { useEffect, useState } from "react";
import { getAllActiveEvents } from "../../../API/service/ActiveEventService";
import { ActiveEvent } from "../../../API/models";
import { ActiveEventsCard } from "./ActiveEventsCard";
import { Col, Container, Dropdown, DropdownButton, Form, InputGroup, Row } from "react-bootstrap";

const log = debug("app:ActiveEvents");

function ActiveEvents(){
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [activeEvents, setActiveEvents] = useState<ActiveEvent[]>([]);
    const [search, setSearch] = useState<string|null>(null);

    async function loadActiveEvents(){
        setIsLoading(true);
        setError(null);

        try{
            const allActiveEvents = await getAllActiveEvents();
            setActiveEvents(allActiveEvents)
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
        loadActiveEvents();
    }, [])

    return (
        <>
            <Container className="position-relative" fluid>
                <div className="position-absolute top-0 end-0">
                    abcde
                </div>
                <Row className="position-relative">
                    <Col className="col-12 text-center">
                        <h1>Active Events</h1>
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
                                ["ongoing", "upcoming"].map((cat) => {
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
                    {
                        activeEvents
                        .filter(activeEvent => {
                            if(search == null) 
                                return true;

                            return activeEvent.title.toLowerCase().includes(search.toLowerCase());
                        })
                        .map(activeEvent => {
                            return (
                                <Col lg={4}>
                                    <ActiveEventsCard
                                        activeEvent={activeEvent}
                                    />
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>

        </>
    )
}

export default ActiveEvents;