import { Button, Form, Modal, ModalProps, Spinner } from "react-bootstrap";
import { RecommendCard } from "./RecommendsCard";
import { useState } from "react";
import { Recommend } from "../../../API/models";

interface AddRecommendPreviewCardModalProps extends ModalProps {
  recommend: Recommend;
  onConfirm?: () => void;
  imgBlob?: Blob;
  error?: string | null;
  isLoading?: boolean;
}

function AddRecommendPreviewCardModal(props: AddRecommendPreviewCardModalProps) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Preview Recommend
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-dark d-flex justify-content-center">
        <RecommendCard
          recommend={props.recommend}
          allowEdit={false}
          onSelectDelete={() => {}}
          style={{ width: "300px" }}
        />
        {props.error && <div className="text-danger text-center">Error: {props.error}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={props.onConfirm}
          disabled={props.isLoading}
        >
          Add this Recommend 
        </Button>
        <Button variant="warning" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );

}

interface AddRecommendModalProps extends ModalProps {
  onSuccessful?: () => void;
  onConfirm?: () => void;
  isLoading?: boolean;
  error?: string | null;

  linkError?: string | null;
  titleError?: string | null;
  descriptionError?: string | null;
  categoriesError?: string | null;
  fileError?: string | null;

  title?: string;
  description?: string;
  link?: string;
  categories?: string;
  image?: File | null;
  showPreview?: boolean;

  setTitle?: (title: string) => void;
  setDescription?: (description: string) => void;
  setLink?: (link: string) => void;
  setCategories?: (categories: string) => void;
  setImage?: (image: File | null) => void;
  setShowPreview?: (show: boolean) => void;
}

export function AddRecommendModal(){
  return <></>;
}

// export function AddRecommendModal(
//   props: AddRecommendModalProps
// ) {
//   const handleRequestPreview = () => {
//     if (validation()) {
//       setShowPreview(true);
//     }
//   }

//   const handleClose = () => {
//     resetInputFields();
//     props.onHide?.();
//   }

//   const handleCloseSuccessful = () => {
//     resetInputFields();
//     props.onSuccessful?.();
//     props.onHide?.();
//   }

//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <AddRecommendPreviewCardModal
//         recommend={{
//           title,
//           description,
//           link,
//           category: categories.split(",").map(cat => cat.trim()),
//           imgUrl: image ? URL.createObjectURL(image) : null,
//           recommend_id: 0,
//         }}
//         show={props.showPreview}
//         onHide={() => props.setShowPreview(false)}
//         onConfirm={handleCloseSuccessful}
//         imgBlob={image ? new Blob([image], { type: image.type }) : undefined}
//         isLoading={props.isLoading}
//         error={props.error}
//       />
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           Create New Recommend
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body className="text-dark">
//         <Form>
//           <Form.Group className="mb-3" controlId="recommendTitle">
//             <Form.Label>Title<span className="text-danger">*</span></Form.Label>
//             <Form.Control 
//               type="text" 
//               placeholder="Enter title" 
//               value={title} 
//               onChange={(e) => setTitle(e.target.value)}
//               isInvalid={!!titleError}
//             />
//             {
//               titleError && <Form.Control.Feedback type="invalid">{titleError}</Form.Control.Feedback>
//             }
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="recommendDescription">
//             <Form.Label>Description<span className="text-danger">*</span></Form.Label>
//             <Form.Control 
//               as="textarea" 
//               rows={3} 
//               placeholder="Enter description" 
//               value={description} 
//               onChange={(e) => setDescription(e.target.value)} 
//               isInvalid={!!descriptionError}
//             />
//             {
//               descriptionError && <Form.Control.Feedback type="invalid">{descriptionError}</Form.Control.Feedback>
//             }
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="recommendLink">
//             <Form.Label>Link</Form.Label>
//             <Form.Control 
//               type="text" 
//               placeholder="Enter Link" 
//               value={link}
//               onChange={(e) => setLink(e.target.value)} 
//               isInvalid={!!linkError}
//             />
//             {
//               linkError && <Form.Control.Feedback type="invalid">{linkError}</Form.Control.Feedback>
//             }
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="recommendTitle">
//             <Form.Label>Categories<span className="text-danger">*</span></Form.Label>
//             <Form.Control 
//               type="text" 
//               placeholder="Enter categories (comma separated)" 
//               value={categories} 
//               onChange={(e) => setCategories(e.target.value)} 
//               isInvalid={!!categoriesError}
//             />
//             {
//               categoriesError && <Form.Control.Feedback type="invalid">{categoriesError}</Form.Control.Feedback>
//             }
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="recommendTitle">
//             <Form.Label>Image</Form.Label>
//             <Form.Control 
//               type="file" 
//               accept="image/*" 
//               onChange={(e) => {
//                 const target = e.target as HTMLInputElement;
//                 const file = target.files?.[0];
//                 if (file)
//                   setImage(file);
//               }}
//               isInvalid={!!fileError}
//             />
//             {
//               fileError && <Form.Control.Feedback type="invalid">{fileError}</Form.Control.Feedback>
//             }
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button
//           variant="primary"
//           onClick={handleRequestPreview}
//         >
//           See Preview
//         </Button>
//         <Button variant="warning" onClick={handleClose}>Cancel</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }