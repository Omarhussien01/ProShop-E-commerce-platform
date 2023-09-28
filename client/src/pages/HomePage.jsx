import { useGetProductsQuery } from "../slices/productsApiSilce";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import SpinnerComponenet from "../components/SpinnerComponenet";

function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <SpinnerComponenet />
      ) : error ? (
        <h2>Something went wrong...</h2>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Container>
            <Row className="product-container">
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default HomePage;
