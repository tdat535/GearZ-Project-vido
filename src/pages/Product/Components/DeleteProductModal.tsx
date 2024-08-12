import { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ItemMenu } from '../ProductPage';


// interface Product {
//   img: string;
//   name: string;
//   price: number | null;
//   amount: number | null;
//   brand: string;
//   category: string;
//   status: string
// }

interface Props {
  show: boolean;
  product: ItemMenu | null;
  onClose: () => void;
  onConfirm: () => void;
}

class DeleteProductModal extends Component<Props> {
  render() {
    const { show, product, onClose, onConfirm } = this.props;

    if (!show || !product) return null;

    return (
      <Modal show={show} onHide={onClose} >
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: 'center' }}>
            <img
              src={product.img}
              alt={product.name}
              style={{ width: '300px', height: '300px', objectFit: 'cover'}}
            />
            <div style={{width:"max-content", textAlign: "left"}}>
              <p><b>Name:</b> {product.name}</p>
              <p><b>Brand:</b> {product.brand}</p>
              <p><b>Price:</b> {product.price}</p>
              <p><b>Amount:</b> {product.amount}</p>
              <p><b>Category:</b> {product.category}</p>
              <p><b>Status:</b> {product.status}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onConfirm}  >
            Delete 
          </Button>
        </Modal.Footer>
        
      </Modal>
    );
  }
}

export default DeleteProductModal;
