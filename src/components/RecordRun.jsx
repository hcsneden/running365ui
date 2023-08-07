import { getData, putData } from "../backend/api"
export const RecordRun = (props) => {
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
            props.onSubmit
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <Form className='entry-form'>
            <Row className='form-row'>
                <Col md={{ span: 4, offset: 1 }}>
                    <Form.Group onChange={handleFormChange} as={Row} className="mb-3">
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
        </Form>
    )
}