import { useEffect, useState } from "react"
import { getData, putData } from "../backend/api"
import { AttributeValue as db } from "dynamodb-data-types"
import { Button, Container, Form, Row, Col, Spinner } from "react-bootstrap";

export function History(props) {
    let runningTotal = 0
    const oneDay = 1000 * 60 * 60 * 24
    const today = new Date()
    const bday = new Date(today.getFullYear(), 6, 20)
    const daysSince = Math.round(today.getTime() - bday.getTime()) / (oneDay);
    const [data, setData] = useState();
    const [total, setTotal] = useState();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getHistory() {
            try {
                const apiData = await getData();
                setData(apiData)
            }
            catch (error) {
                console.log(error);
            }
        }
        getHistory();
    }, []);

    const getTotal = () => {
        console.log(typeof(runningTotal))
        data?.forEach(item => runningTotal = runningTotal + parseFloat(item.distance))
        
        return runningTotal
    }
    let request = {
        date: "", distance: 0
    }
    
    const handleFormChange = (e) => {
        request[e.target.name] = e.target.value
        console.log(request)
    }

    const handleFormSubmit = async () => {
        try{
            setLoading(true)
            const response = await putData(request)
            console.log(response)
            setLoading(false)
        }catch(error){
            console.log(error)
        }
        
    }

    if (data) {
        return (
            <Container>
                {loading && <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>}
            {!loading && 
                <><Row>
                        <Col className="card">Day: {daysSince.toFixed(0)}</Col>
                        <Col className="summary-card"><div className="card-title">Miles: </div><br></br>{getTotal()}</Col>
                    </Row><Form>
                            <Form.Group onChange={handleFormChange} as={Row} className="mb-3">
                                <Form.Label column sm="2">
                                    Date
                                </Form.Label>

                                <Col sm="4">
                                    <Form.Control name="date" type="date" />
                                </Col>
                            </Form.Group>
                            <Form.Group onChange={handleFormChange} as={Row} className="mb-3">
                                <Form.Label column sm="2">
                                    Distance
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control name="distance" />
                                </Col>
                            </Form.Group>
                            <Button onClick={handleFormSubmit} type="submit">Submit</Button>
                        </Form></>}
            </Container>
        );
    }
} 