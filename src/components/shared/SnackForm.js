import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const SnackForm = (props) => {
    const {snack, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
            <h3>{ heading }</h3>
            <Form onSubmit={ handleSubmit }>
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                    placeholder="what snack is this?"
                    name="name"
                    id="name"
                    value= { snack.name }
                    onChange={ handleChange }
                />
                <Form.Label>Description:</Form.Label>
                <Form.Control 
                    placeholder="describe the snack..."
                    name="description"
                    id="description"
                    value= { snack.description }
                    onChange={ handleChange }
                />
                <Form.Check 
                    label="Is the snack spicy?"
                    name="isSpicy"
                    defaultChecked={ snack.isSpicy }
                    onChange={ handleChange }
                />
                <Form.Select
                    aria-label="snack type"
                    name="type"
                    defaultValue={snack.type}
                    onChange={handleChange}
                >
                    <option>Open this select menu</option>
                    <option value="crunchy">crunchy</option>
                    <option value="chewy">chewy</option>
                    <option value="soft">soft</option>
                </Form.Select>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default SnackForm