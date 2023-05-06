import React, { useEffect } from 'react'
import "./Categorie.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom"
import { getCategories } from "../../store/store"



export const Categorie = () => {
    const categories = getCategories()
    return <>
        <div className="shop-by-category-heading">
            <h1>Shop By Category</h1>
        </div>
        <Row className="rows">
            {
                categories?.map((res, index) => {
                    return <Col key={index}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={res.image} />
                            <Card.Body>
                                <Card.Title>{res.title}</Card.Title>
                                <Card.Text>
                                    {
                                        res.text
                                    }
                                </Card.Text>
                                <Link to={`/`}>

                                    <Button variant="primary">Shop Now</Button>
                                </Link>

                            </Card.Body>
                        </Card>
                    </Col>
                })
            }
        </Row >
    </>
}
