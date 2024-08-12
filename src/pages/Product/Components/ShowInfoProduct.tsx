import { Component } from 'react';
import { Modal } from 'react-bootstrap';
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
}

class ShowInfoProduct extends Component<Props> {
  render() {
    const { show, product, onClose } = this.props;

    if (!show || !product) return null;

    return (
      <Modal show={show} onHide={onClose} >
        <Modal.Header closeButton>
          <Modal.Title>Information Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: 'left' }}>
            <img
              src={product.img}
              alt={product.name}
              style={{ width: '300px', height: '300px', objectFit: 'cover'}}
            />
            <div style={{ margin: '0px auto', width:"max-content", textAlign: "left"}}>
              <p><b>Name:</b> {product.name}</p>
              <p><b>Brand:</b> {product.brand}</p>
              <p><b>Price:</b> {product.price}</p>
              <p><b>Amount:</b> {product.amount}</p>
              <p><b>Category:</b> {product.category}</p>
              <p><b>Status:</b> {product.status}</p>
            </div>
          </div>
        </Modal.Body>
        
      </Modal>
    );
  }
}

export default ShowInfoProduct;
