import moment from "moment"
import { Container, Form, Row, Col } from "react-bootstrap"

export const History = (props) => {
    const pastRuns = props.data
    return (
        <Container>
            <Row>
                <Col md={{span: 3, offset: 3}}>Date</Col>
                <Col md={3}>Distance</Col>
            </Row>
            {pastRuns.map((item) => {
                return (
                    <Row className="history-data">
                        <Col md={{span: 3, offset: 3}} title="Date">{moment(item.date).format("MMM Do YYYY")}</Col>
                        <Col md={3} title="Distance">{item.distance}</Col>
                    </Row>
                )

            })}
        </Container>
    )
}