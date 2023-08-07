import { Container, Form, Row, Col } from "react-bootstrap"

export const History = (props) => {
    const pastRuns = props.data
    return (
        <Container>
            <Row>
                <Col md={3}>Date</Col>
                <Col md={3}>Distance</Col>
            </Row>
            {pastRuns.map((item) => {
                return (
                    <Row>
                        <Col md={3} title="Date">{item.date}</Col>
                        <Col md={3} title="Distance">{item.distance}</Col>
                    </Row>
                )

            })}
        </Container>
    )
}