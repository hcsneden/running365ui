import moment from "moment"
import { Container, Form, Row, Col, Table } from "react-bootstrap"

export const History = (props) => {
    const pastRuns = props.data
    const sorted = pastRuns.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });


    return (

        <Container style={{ paddingBottom: '5%', padding: '10%' }}>
            <Table size="sm">
                <thead>
                    <tr className="same-col-widths">
                        <th>Date</th>
                        <th>Distance</th>
                    </tr>
                </thead>
                <tbody className="history-data">
                    {sorted.map((item) => {
                        return (
                            <tr>
                                <td>{moment(item.date).format("MMM D")}</td>
                                <td>{item.distance}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    )
}