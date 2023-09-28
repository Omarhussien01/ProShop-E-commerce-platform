import { Spinner } from "react-bootstrap"
function SpinnerComponenet() {
    return (
        <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Spinner animation="border" role="status"></Spinner>
      </div>
    )
}

export default SpinnerComponenet
