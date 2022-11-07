import { Form, Button, Container } from 'react-bootstrap'

const RedbullForm = (props) => {
    // here are the props we're going to bring into our form
    const { redbull, handleChange, heading, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            <h3>{ heading }</h3>
            <Form onSubmit={ handleSubmit }>
                <Form.Label>Flavor:</Form.Label>
                <Form.Control 
                    placeholder="what flavor is it?"
                    name="flavor"
                    id="flavor"
                    value= { redbull.flavor }
                    onChange={ handleChange }
                />
                <Form.Label>Size:</Form.Label>
                <Form.Control 
                    placeholder="what size is the redbull?"
                    name="size"
                    id="size"
                    value= { redbull.size }
                    onChange={ handleChange }
                />
                
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default RedbullForm