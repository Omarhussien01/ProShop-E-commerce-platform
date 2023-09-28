import { Container, Row, Col } from "react-bootstrap";
const curentYear = new Date().getFullYear();
function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>ProShop &copy; {curentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
