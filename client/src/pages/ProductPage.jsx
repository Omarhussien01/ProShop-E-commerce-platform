import { useParams, Link } from "react-router-dom";
import { useGetProductDetailsQuery } from "../slices/productsApiSilce";
import { addToCart } from "../slices/cartSlice";

import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
import SpinnerComponenet from "../components/SpinnerComponenet";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const handleAddtoCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity,
      })
    );
    navigate("/cart");
  };

  if (isLoading) {
    return <SpinnerComponenet />;
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Handle the error
  }

  if (!product) {
    return <div>Error: No Product</div>; // Or handle the case when product is not available
  }

  const handleDec = () => {
    if (quantity > 1) {
      setQuantity((prevState) => prevState - 1);
    }
  };

  const handleInc = () => {
    if (quantity < product.countInStock) {
      setQuantity((prevState) => prevState + 1);
    }
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>Price: ${product.price}</ListGroupItem>
            <ListGroupItem>Description: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>

                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "In Stock" : "Out of stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Quantity:</Col>
                  <Col>
                    <div className="d-flex align-items-center">
                      <Button
                        className="btn btn-light btn-md mx-2"
                        onClick={handleDec}
                      >
                        <strong>-</strong>
                      </Button>
                      <strong>{quantity}</strong>
                      <Button
                        className="btn btn-light btn-md mx-2"
                        onClick={handleInc}
                      >
                        <strong>+</strong>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                  onClick={handleAddtoCart}
                >
                  Add to cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ProductPage;
