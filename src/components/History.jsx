import moment from "moment"
import { Container, Form, Row, Col } from "react-bootstrap"

export const History = (props) => {
    const pastRuns = props.data
    const sorted = pastRuns.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });


    return (
        <Container>
            <Row>
                <Col md={{span: 3, offset: 3}} xs={{span: 4, offset: 2}} >Date</Col>
                <Col md={3} xs={5}>Distance</Col>
            </Row>
            {sorted.map((item) => {
                return (
                    <Row className="history-data">
                        <Col md={{span: 3, offset: 3}} xs={{span: 4, offset: 2}} title="Date">{moment(item.date).format("MMM Do")}</Col>
                        <Col md={3} xs={5} title="Distance">{item.distance}</Col>
                    </Row>
                )

            })}
        </Container>
    )
}