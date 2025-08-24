import { Button, Modal, ModalProps, Spinner } from "react-bootstrap";
import { Recommend } from "../../../API/models";

interface DeleteRecommendModalProps extends ModalProps {
  recommend?: Recommend,
  isLoading?: boolean;
  error?: string | null;
  onConfirmDelete?: () => void;
}

export function DeleteRecommendModal(
  props: DeleteRecommendModalProps
) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirmation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-dark">
        <h4>Are you sure you want to delete <span className="text-success">{props.recommend?.title}</span>?</h4>
        <p>
          {props.recommend?.description}
        </p>
      </Modal.Body>
      {
        props.error && (
          <div className="alert alert-danger m-3" role="alert">
            {props.error}
          </div>
        )
      }
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={props.onConfirmDelete}
          disabled={props.isLoading}
        >
          {props.isLoading ? <Spinner animation="border" size="sm" /> : "Yes, Delete this recommend"}
        </Button>
        <Button variant="warning" onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}