import { Card, Badge, Button } from "react-bootstrap";
import { Recommend } from "../../../API/models";

interface RecommendCardProps {
    recommend: Recommend;
    onSelectDelete: (recommend: Recommend) => void;
    allowEdit?: boolean;
    style?: React.CSSProperties;
}

export function RecommendCard(props: RecommendCardProps) {
    const title = props.recommend.title;
    const description = props.recommend.description;
    const id = props.recommend.recommend_id;
    const imgUrl = props.recommend.imgUrl;
    const category = props.recommend.category;

    return (
        <Card
            key={id}
            className="h-100 py-2 px-1 position-relative"
            style={props.style}
        >
            {
                category && (
                    <div className="position-absolute top-0 end-0 p-1">
                        <Badge className="rounded-pill bg-primary fw-light">
                            {category.join(", ")}
                        </Badge>
                    </div>
                )
            }
            {
                imgUrl && (
                    <Card.Img
                        variant="top"
                        src={imgUrl}
                        width={100}
                        height={180}
                        className="object-fit-cover"
                    />
                )
            }
            <Card.Body>
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
            {
                props.allowEdit && (
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
                            onClick={() => {props.onSelectDelete(props.recommend)}}
                        >
                            Delete
                        </Button>
                    </Card.Footer>
                )
            }
        </Card>
    );
}