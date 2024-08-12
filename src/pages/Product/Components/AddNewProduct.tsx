import React, { Component, ReactNode, CSSProperties } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './AddNewProduct.css';
import { ListCategory } from '../ProductPage';
import { toast } from 'react-toastify';
import { ItemMenu } from '../ProductPage';


interface Props {
  show: boolean;
  handleClose: () => void;
  handleAddNewProduct: (newProduct: ItemMenu) => void;
}

interface State {
  img: string;
  name: string;
  brand: string;
  price: number | null;
  stock: number | null;
  category: string;
  status: string;
}

const containerCSS: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const imgContainerCSS: CSSProperties = {
  textAlign: "center",
  display: "flex",
  flex: '1',
  marginRight: '20px',
  flexDirection: "column"
};

const inputContainerCSS: CSSProperties = {
  flex: '1',
};

const inputCSS: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const inputTextCSS: CSSProperties = {
  height: '40px',
  padding: '0 10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const inputFileCSS: CSSProperties = {
  height: '100%',
  //border: "0.5px solid black"
  padding: '10px'
}; 

const previewImageCSS: CSSProperties = {
  width: '100%',
  height: '400px',
  objectFit: 'cover',
  borderRadius: '8px',
};

class AddNewProduct extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      img: '',
      name: '',
      brand: '',
      price: null,
      stock: null,
      category: '',
      status: ''
    };
  }

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

  nameProductInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value });
  };

  brandInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ brand: e.target.value });
  };

  priceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    this.setState({ price: isNaN(value) ? null : value });
  };

  stockInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    this.setState({ stock: isNaN(value) ? null : value });
  };

  categoryInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ category: e.target.value });
  };

  statusInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ status: e.target.value });
  };

  handleClose = () => {
    this.setState({
      img: '',
      name: '',
      brand: '',
      price: null,
      stock: null,
      category: '',
      status: ''
    });
    this.props.handleClose();
  };

  handleReset = () => {
    this.setState({
      img: '',
      name: '',
      brand: '',
      price: null,
      stock: null,
      category: '',
      status: ''
    });
  };
  
  handleSubmit = () => {
    const { img, name, brand, price, stock, category,status } = this.state;
    if (img && name && brand && price !== null && stock !== null) {
      this.props.handleAddNewProduct({
        img,
        name,
        brand,
        price,
        stock,
        category,
        status
      })

      toast.success("Add Success");
      this.setState({
        img: '',
        name: '',
        brand: '',
        price: null,
        stock: null,
        category: '',
        status: ''
      });

      this.props.handleClose();

    }else {
      toast.error("Please fill out all the information below.")
    }
  };

  render(): ReactNode {
    const { show, handleClose } = this.props;
    const { img, category } = this.state;

    return (
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={containerCSS}>
            <div style={imgContainerCSS}>
              <label htmlFor="imgInput" style={{marginBottom: "15px"}}>
                <b>Product Image</b>
                <i className="fa-solid fa-star-of-life"></i>
                </label>
              <input
                id="imgInput"
                type="file"
                accept="image/*"
                onChange={this.imgInput}
                style={inputFileCSS}
                aria-required
              />
              {img && <img src={img} alt="Preview" style={previewImageCSS} />}
            </div>
            <div style={inputContainerCSS}>
              <div style={inputCSS}>
                <label htmlFor="nameProduct">
                  <b>Product Name</b>
                  <i className="fa-solid fa-star-of-life"></i>
                  </label>
                <input
                  id="nameProduct"
                  value={this.state.name}
                  onChange={this.nameProductInput}
                  type="text"
                  placeholder="Name Product"
                  style={inputTextCSS}
                  aria-required
                />
                <label htmlFor="brand">
                  <b>Product Brand</b>
                  <i className="fa-solid fa-star-of-life"></i>
                  </label>
                <input
                  id="brand"
                  value={this.state.brand}
                  onChange={this.brandInput}
                  type="text"
                  placeholder="Brand"
                  style={inputTextCSS}
                  aria-required
                />
                <label htmlFor="price">
                  <b>Product Price</b>
                  <i className="fa-solid fa-star-of-life"></i>
                  </label>
                <input
                  id="price"
                  value={this.state.price ?? ''}
                  onChange={this.priceInput}
                  type="number"
                  placeholder="Price"
                  style={inputTextCSS}
                  aria-required
                />
                <label htmlFor="stock">
                  <b>Product Stock</b>
                  <i className="fa-solid fa-star-of-life"></i>
                </label>
                <input
                  id="stock"
                  value={this.state.stock ?? ''}
                  onChange={this.stockInput}
                  type="number"
                  placeholder="stock"
                  style={inputTextCSS}
                  aria-required
                />
                <label htmlFor="status">
                  <b>Product Status</b>
                  <i className="fa-solid fa-star-of-life"></i>
                </label>
                <select
                  id="status"
                  name="status"
                  value={this.state.status}
                  onChange={this.statusInput}
                  style={inputTextCSS}
                  aria-required
                >
                  <option value="" disabled selected>Select an Status Product</option>
                  <option value="New">New</option>
                  <option value="Old">Old</option>
                </select>
                <label htmlFor="category">
                  <b>Product Category</b>
                  <i className="fa-solid fa-star-of-life"></i>
                </label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={this.categoryInput}
                  style={inputTextCSS}
                >
                  <option value="" disabled selected>Select an Caterogy Product</option>
                  {ListCategory.map((item) => (
                    <option 
                      key={item.category} 
                      value={item.category} 
                      disabled={item.category === ""}
                      aria-required
                    >
                      {item.text}
                    </option>
                  ))}
                  </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleReset}>
            Reset
          </Button>
          <Button variant="danger" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddNewProduct;