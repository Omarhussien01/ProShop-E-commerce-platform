import { Row, Col, Image, Card, Button, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, removeFromCart } from "../slices/cartSlice";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems, itemsPrice } = cart;

  const handleQuantityChange = (product, quantity) => {
    // Dispatch an action to update the cart with the new quantity
    dispatch(
      addToCart({
        ...product,
        quantity: quantity,
      })
    );
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = ()=>{
    navigate('/login?redirect=/shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is Empty <Link to="/">Continue Shopping</Link>{" "}
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt="product image" fluid rounded />
                  </Col>
                  <Col md={3}>
                    <span>{item.name}</span>
                  </Col>
                  <Col md={3}>
                    <span>
                      ${Number(item.quantity * item.price).toFixed(2)}
                    </span>
                  </Col>
                  <Col md={3}>
                    <div className="">
                      <Button
                        className="btn btn-light btn-md mx-2"
                        onClick={() => handleQuantityChange(item, Number(-1))}
                        disabled={item.quantity === 1} // Disable when quantity is 1
                      >
                        <strong>-</strong>
                      </Button>
                      <strong>{item.quantity}</strong>
                      <Button
                        className="btn btn-light btn-md mx-2"
                        onClick={() => handleQuantityChange(item, Number(1))}
                        disabled={item.quantity === item.countInStock} // Disable when quantity equals countInStock
                      >
                        <strong>+</strong>
                      </Button>
                    </div>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => handleRemove(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      {cartItems.length > 0 && (
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal (
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                  items
                </h2>
                ${itemsPrice}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      )}
    </Row>
  );
}

export default CartPage;
