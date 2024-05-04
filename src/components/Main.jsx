import { useEffect, useState } from "react"
import { getData, putData } from "../backend/api"
import { Button, Container, Form, Row, Col, Spinner } from "react-bootstrap";
import { History } from "./History";

export function Main() {
    const oneDay = 1000 * 60 * 60 * 24
    const today = new Date()
    const startDate = new Date(2024, 0, 1)
    const daysSince = Math.round(today.getTime() - startDate.getTime()) / (oneDay);
    const daysUntil = 365-daysSince
    const [data, setData] = useState();
    const [total, setTotal] = useState();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getHistory() {
            setLoading(true)
            try {

                const apiData = await getData();
                let filtered = []
                apiData.forEach(item => {
                    if (new Date(item.date) > startDate){
                        filtered.push(item)
                    }
                })
                setData(filtered)
                getTotal()

            }
            catch (error) {
                console.log(error);
            }
            setLoading(false)
        }
        getHistory();
    }, []);

    const getTotal = () => {
        let runningTotal = 0
        data.forEach(item => 
            {   
                runningTotal += parseFloat(item.distance)
            })
        setTotal(runningTotal.toFixed(1))
    }


    let request = {
        date: "", distance: 0
    }

    const handleFormChange = (e) => {
        request[e.target.name] = e.target.value
    }

    const handleFormSubmit = async () => {
        try {
            setLoading(true)
            const response = await putData(request)
            console.log(response)
            const apiData = await getData();
            setData(apiData)
            setTotal()
            setLoading(false)
            
        } catch (error) {
            console.log(error)
        }
        
    }

    const getSummaryMessage = () => {
        
        const progress = daysSince.toFixed(0) - total

        const rate = (progress / daysUntil.toFixed(0)) + 1
        console.log(daysUntil)
        if (progress > 0) {
            return (
                <><span>You are <span>{progress}</span> miles <span className="negative">behind</span> your goal. </span><br/><span style={{fontFamily: 'JetBrains Mono', fontSize: '16px'}}>-You need to run {rate.toFixed(2)} miles a day to reach your goal-</span></>
            )
        }
        else
            return (
                <span>You are <span>{progress}</span> miles <span className="positive">ahead</span> of your goal</span>
            )
    }

    if (data) {
        return (
            <Container>
                {loading && <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
                {!loading && data &&

                    <>
                        <div className="summary-section">{getSummaryMessage()}</div>
                        <Row >

                            <Col md={{ span: 3, offset: 2 }} sm={{ span: 3, offset: 2 }} xs={{ span: 8, offset: 2 }} className="summary-card"><div className="card-title">Day:</div>
                                <div className="card-value">{daysSince.toFixed(0)}</div></Col>
                            <Col md={2} sm={0}></Col>
                            <Col md={{span: 3, offset: 0}} xs={{span: 8, offset: 2}}className="summary-card"><div className="card-title">Miles:</div>
                                <div className="card-value">{total ? total : getTotal()}</div></Col>
                        </Row>
                        <Form className='entry-form'>
                            <Row className='form-row'>
                                <Col md={{ span: 4, offset: 1 }}>
                                    <Form.Group onChange={handleFormChange} required as={Row} className="mb-3">
                                        <Form.Label className="form-label">
                                            Date
                                        </Form.Label>
                                        <Form.Control className='form-input' name="date" type="date" />

                                    </Form.Group>
                                </Col>
                                <Col md={{ span: 4, offset: 2 }}>
                                    <Form.Group onChange={handleFormChange} as={Row} className="mb-3">
                                        <Form.Label className="form-label">
                                            Distance
                                        </Form.Label>
                                        <Form.Control className='form-input' name="distance" />

                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button onClick={handleFormSubmit} className='submit-button' type="submit">Submit</Button>
                        </Form></>}
                <History data={data}></History>
            </Container>
        );
    }
} 