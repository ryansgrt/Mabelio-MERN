import axios from 'axios'
import React, { useEffect } from 'react'
import { Table, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts, deleteProduct, createProduct } from '../actions/ProductActions'
import { PRODUCT_CREATE_RESET } from '../constants/ProductConstant'


const ProductListScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)

    const { loading, error, products, page, pages } = productList

    const productDelete = useSelector((state) => state.productDelete)

    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete

    const productCreate = useSelector((state) => state.productCreate)

    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createProduct,
    }

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({
            type: PRODUCT_CREATE_RESET
        })

        if (!userInfo || userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/product/${createProduct._id}/edit`)
        } else {
            dispatch(listProducts('', pageNumber))
        }
    }, [dispatch,
        history,
        userInfo,
        successCreate,
        successDelete,
        createProduct,
        pageNumber
    ])

    const deleteHandler = (id) => {
        if (window.confirm('Are You Sure')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    return (
        <>
            <Row className='align-item-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fa fa-plus'></i> Create Product
            </Button>
                </Col>
            </Row>
            {loading && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
            <>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {product.map((product) => (
                            <tr key={product._id}>
                                <th>{product._id}</th>
                                <th>{product.name}</th>
                                <th>${product.price}</th>
                                <th>{product.category}</th>
                                <th>{product.brand}</th>
                                <th>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(product._id)}
                                        >
                                            <i className='fas fa-trash'> </i>
                                        </Button>
                                    </td>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate pages={pages} page={page} isAdmin={true} />
            </>
        )}
        </>
    )
}

