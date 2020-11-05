import React, {useState} from 'react'
import {Form, Button, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import{savePaymentMethod} from '../actions/CartActions'

const PaymentScreen = ({history}) => {
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart

    if (!shippingAddress){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    const dispatch = useDispatch()

    const submitHeader =(e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckOutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHeader}>
                <Form.Group>
                    <Form.Label as='legend'>
                    Select Method
                    <Col>
                    <Form.Check
                    type='radio'
                    label='Paypal Or Credit Card'
                    id='Paypal'
                    name='paymentMethod'
                    value='Paypal'
                    checked
                    onSubmit={(e) => setPaymentMethod(e.target.value)}
                    >
                    </Form.Check>
                    </Col>
                    </Form.Label>
                </Form.Group>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen