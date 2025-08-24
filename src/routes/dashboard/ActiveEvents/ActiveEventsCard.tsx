import { Card, Badge, Container, Row, Col, ProgressBar } from "react-bootstrap";
import { ActiveEvent } from "../../../API/models";

function getDateProgressPercentage(start_date: string, end_date: string): number | null {
  // Convert dd-mm-yyyy to Date objects
  const convertToDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to midnight

  const startDate = convertToDate(start_date);

  const endDate = convertToDate(end_date);

  if(today >= startDate && today <= endDate){
    // Calculate total duration and elapsed time in milliseconds
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedTime = today.getTime() - startDate.getTime();

    // Calculate percentage (0 to 1)
    return elapsedTime / totalDuration;
  }
  else return null;
}

interface ActiveEventCardProps {
    activeEvent: ActiveEvent;
}

export function ActiveEventsCard(props: ActiveEventCardProps) {
    const title = props.activeEvent.title;
    const description = props.activeEvent.short_description ?? "";
    const imgUrl = props.activeEvent.img_path;
    const start_date = props.activeEvent.start_date;
    const end_date = props.activeEvent.end_date;
    const link = props.activeEvent.link;
    const progression = end_date ? getDateProgressPercentage(start_date, end_date) : null;

    return (
        <Card className="h-100 position-relative">
            <div className="position-absolute top-0 end-0 p-1">
                <Badge 
                    className={`rounded-pill fw-light ${progression == null ? "bg-primary":"bg-success"}`}
                >
                    {start_date} {end_date ? `- ${end_date}` : ""}
                </Badge>
            </div>
            {
                imgUrl && (
                    <Card.Img 
                        variant="top"
                        src={imgUrl}
                        width={100}
                        height={100}
                        className="object-fit-contain"
                    />
                ) 
            } 

            {
            progression && (
            <Card.Body className="p-0 m-0">
                <Container className="p-0" fluid>
                    <Row className="g-0">
                        <Col lg={10}>
                            <ProgressBar
                                className="rounded-0 w-100 h-100"
                                variant="success"
                                min={0}
                                max={100}
                                now={progression * 100}
                            />
                        </Col>
                        <Col lg={2}>
                            <div className="d-flex align-self-center justify-content-center">
                                <span
                                    className="text-dark"
                                >
                                    {Math.ceil(progression * 100)}%
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
            )
            }
            <Card.Body>
                <Card.Title 
                    className="text-dark fw-bold"
                >
                    <a href={link ?? undefined} target="_blank">{title}</a>
                </Card.Title>
                <Card.Text
                    className="text-dark"
                >
                    {description.length > 60 ? `${description.substring(0, 60)}...` : description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}