import asyncHandler from "express-async-handler";
import Product from "../model/ProductModel";

const getProduct = asyncHandler(async (req, res, next) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {}
    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword})
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    res.json({products, page, pages: Math.ceil(count / pageSize)})
})




const getProductById = asyncHandler(async (req, res, ) => {
    const product = await Product.findById(req.params.id)
    if (product){
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})


const deleteProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if(product){
        await product.remove()
        res.json({
            message: 'Product deleted'
        })
    }else {
        res.status(404)
        throw new Error('Product not found')
    }
})

