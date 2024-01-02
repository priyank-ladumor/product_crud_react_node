import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import axios from "axios"
import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getSingleProducts } from '../store/actions/product'


const SingleProduct = ({ settoggle }) => {
    useEffect(() => {
        settoggle(true)
    }, [])

    const dispatch = useDispatch()

    const [singleproducts, setSingleProducts] = useState(0)
    const { singleproduct } = useSelector((state) => state.product);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getSingleProducts(id))
    }, [])

    useEffect(() => {
        if (singleproduct) {
            setSingleProducts(singleproduct)
        }
    }, [singleproduct])

    return (
        <div>
            <div className='m-5' style={{ border: "", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                {singleproducts &&
                    <img src={singleproducts?.images[0]} alt="img" className='img-fluid' style={{ width: "1820px", height: "500px" }} />
                }                <div className='m-3'>
                    <h4>id: {singleproducts?._id}</h4>
                    <h4>title: {singleproducts?.title}</h4>
                    <h4>brand: {singleproducts?.brand}</h4>
                    <h4>discountPercentage: {singleproducts?.discountPercentage}</h4>
                    <h4>description: {singleproducts?.description}</h4>
                    <h4>price: {singleproducts?.price}</h4>
                    <h4>rating: {singleproducts?.rating}</h4>
                    <h4>stock: {singleproducts?.stock}</h4>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct
