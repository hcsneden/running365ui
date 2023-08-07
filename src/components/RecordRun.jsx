import { Button, Form, Spinner } from "react-bootstrap"
import { Row } from "react-bootstrap"
import { Col } from "react-bootstrap"
import { putData } from "../backend/api"
import { useState } from "react"

export const RecordRun = () => {
    let request = {
        date: "", distance: 0
    }
    const [loading, setLoading] = useState(false)
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
    return (
        <>
            {loading && <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>}
            <div>Record a Run</div>
            <Form onSubmit={handleFormSubmit}>
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
                <Button type="submit">Submit</Button>
            </Form></>
    )
}