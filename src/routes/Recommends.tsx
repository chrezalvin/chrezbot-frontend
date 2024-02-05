import { useEffect, useState } from "react";
import { RecommendDoc, getAllRecommends } from "../functions/API";
import { Card, Col, Container, Row } from "react-bootstrap";

function displayRecommend(recommend: RecommendDoc){
    return (
        <Card>
            <Card.Img variant="top" src={recommend.data.imgUrl} className="img-fluid w-50"/>
            <Card.Body>
                <Card.Title>{recommend.data.title}</Card.Title>
                <Card.Text className="text-dark">{recommend.data.description}</Card.Text>
            </Card.Body>
        </Card>
    );
    // return (
    //     <div>
    //         title: <a href={recommend.data.link}>{recommend.data.title}</a>
    //         description: <p>{recommend.data.description}</p>
    //         image: <img src={recommend.data.imgUrl} width={40} height={80}/>
    //     </div>
    // )
}

function Recommends(){
    const [recommends, setRecommend] = useState<RecommendDoc[]>();

    useEffect(() => {
        getAllRecommends().then((recs) => {
            setRecommend(recs);
        });
    }, [])

    const recommendDisplayList = recommends?.map(rec => {
        return (
            <Col lg={4}>
                {displayRecommend(rec)}
            </Col>
        );
    });

    return (
        <>
            <Container>
                <Row>
                    {recommendDisplayList}
                </Row>
            </Container>
        </>
    )
}

export default Recommends;