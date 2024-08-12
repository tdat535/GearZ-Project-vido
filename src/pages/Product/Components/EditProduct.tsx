import { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ItemMenu, ListCategory } from '../ProductPage';

interface Props {
  show: boolean;
  product: ItemMenu | null;
  onClose: () => void;
  onConfirm: (updatedProduct: ItemMenu) => void;
}

interface State {
  img: string;
  name: string;
  price: number | null;
  amount: number | null;
  brand: string;
  category: string;
  status: string;
}

class EditProduct extends Component<Props, State> {
  state: State = {
    img: '',
    name: '',
    price: null,
    amount: null,
    brand: '',
    category: '',
    status: ''
  };

  // Cập nhật state khi nhận props mới
  componentDidUpdate(prevProps: Props) {
    if (this.props.product !== prevProps.product && this.props.product) {
      const { img, name, price, amount, brand, category, status } = this.props.product;
      this.setState({ img, name, price, amount, brand, category, status });
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    } as unknown as Pick<State, keyof State>);
  };

  imgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ img: reader.result as string });
      };
      reader.readAsDataURL(file);
    } else {
      this.setState({ img: '' });
    }
  };

  handleSave = () => {
    const { name, img, price, amount, brand, category, status } = this.state;
    const updatedProduct: ItemMenu = {
      name,
      img,
      price: price !== null && !isNaN(price) ? price : null,
      amount: amount !== null && !isNaN(amount) ? amount : null,
      brand,
      category,
      status
    };
    this.props.onConfirm(updatedProduct); // Gọi hàm onConfirm với sản phẩm đã chỉnh sửa
  };

  render() {
    const { show, onClose } = this.props;
    const { img, name, price, amount, brand, category, status } = this.state;

    if (!show) return null;

    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: 'center' }}>
            <img
              src={img}
              alt={name}
              style={{ width: '300px', height: '300px', objectFit: 'cover' }}
            />
            <div style={{ margin: '0px auto', width: 'max-content', textAlign: 'left' }}>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="editProductName"><b>Name:</b></label>
                <input
                  id="editProductName"
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="imgInput"><b>Image:</b></label>
                <input
                  id="imgInput"
                  type="file"
                  accept="image/*"
                  onChange={this.imgInput}
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                  aria-required
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="editProductPrice"><b>Price:</b></label>
                <input
                  id="editProductPrice"
                  type="number"
                  name="price"
                  value={price !== null ? price.toString() : ''}
                  onChange={this.handleChange}
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="editProductAmount"><b>Amount:</b></label>
                <input
                  id="editProductAmount"
                  type="number"
                  name="amount"
                  value={amount !== null ? amount.toString() : ''}
                  onChange={this.handleChange}
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="editProductBrand"><b>Brand:</b></label>
                <input
                  id="editProductBrand"
                  type="text"
                  name="brand"
                  value={brand}
                  onChange={this.handleChange}
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="editProductCategory"><b>Category:</b></label>
                <select
                  id="editProductCategory"
                  name="category"
                  value={category}
                  onChange={this.handleChange}
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                >
                  <option value="" disabled>Select a Category</option>
                  {ListCategory.map((item) => (
                    <option
                      key={item.category}
                      value={item.category}
                      disabled={item.category === ""}
                    >
                      {item.text}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="editProductStatus"><b>Status:</b></label>
                <select
                  id="editProductStatus"
                  name="status"
                  value={status}
                  onChange={this.handleChange}
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                >
                  <option value="" disabled>Select Status</option>
                  <option value="New">New</option>
                  <option value="Old">Old</option>
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditProduct;
