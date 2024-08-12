import { Component, ReactNode, CSSProperties } from 'react';
import AddNewProduct from './Components/AddNewProduct';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteProductModal from './Components/DeleteProductModal';
import ShowInfoProduct from './Components/ShowInfoProduct';
import EditProduct from './Components/EditProduct';
import { MDBInput } from 'mdb-react-ui-kit';

interface Props {}

export interface ItemMenu {
  img: string;
  name: string;
  price: number | null;
  amount: number | null;
  brand: string;
  category: string;
  status: string;
}

interface State {
  listProduct: ItemMenu[];
  filteredProduct: ItemMenu[];
  filteredStatusProduct: ItemMenu[];
  selectedCategory: string;
  selectedStatus: string;
  isAddProduct: boolean;
  isDeleteProduct: boolean;
  productToDelete: ItemMenu | null;
  isInfoProduct: boolean;
  productToShow: ItemMenu | null;
  isEditProduct: boolean;
  productToEdit: ItemMenu | null;
  searchItem: string; 
}

export interface Category {
  category: string;
  text: string;
}

const buttonCSS: CSSProperties = { textAlign: 'center', alignContent: 'center' };

const textHeader: CSSProperties = { textAlign: 'center', alignContent: 'center' };

const textBody: CSSProperties = { padding: "0px 16px", alignContent: 'center' }

const imgCSS: CSSProperties = { width: '50px', height: '50px', textAlign: 'center', alignContent: 'center' };

const listSearchCSS : CSSProperties = { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }

const dropdownFillterCSS: CSSProperties = { display:"flex", flexDirection: "row", gap: '8px'}



// eslint-disable-next-line react-refresh/only-export-components
export const ListCategory: Category[] = [
  { category: '', text: 'ALL' },
  { category: 'Keyboard', text: 'Keyboard' },
  { category: 'Headphone', text: 'Headphone' },
  { category: 'Mouse', text: 'Mouse' },
];

class Product extends Component<Props, State> {
  state: State = {
    listProduct: [],
    filteredProduct: [],
    filteredStatusProduct: [],
    selectedCategory: '',
    selectedStatus: '',
    isAddProduct: false,
    isDeleteProduct: false,
    productToDelete: null,
    isInfoProduct: false,
    productToShow: null,
    isEditProduct: false,
    productToEdit: null,
    searchItem: ''
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    const products = this.getProductsFromLocalStorage();
    this.setState({ 
      listProduct: products,
      filteredProduct: products
    }, this.filterProducts);
  };

  getProductsFromLocalStorage = () => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      return JSON.parse(storedProducts);
    }
    return [];
  };

  saveProductsToLocalStorage = (products: ItemMenu[]) => {
    localStorage.setItem('products', JSON.stringify(products));
  };

  handleShowModalAddProduct = () => {
    this.setState({ isAddProduct: true });
  };

  handleAddProduct = (newProduct: ItemMenu) => {
    const updatedList = [...this.state.listProduct, newProduct];
    this.setState({
      listProduct: updatedList,
      filteredProduct: updatedList,
      isAddProduct: false 
    });
    this.saveProductsToLocalStorage(updatedList);
  };

  handleCloseAddModal = () => {
    this.setState({ isAddProduct: false });
  };
  
  handleDeleteProduct = (product: ItemMenu) => {
    this.setState({
      isDeleteProduct: true,
      productToDelete: product,
    });
  };

  handleConfirmDelete = () => {
    const isConfirm = confirm("Do you want to delete this product?")
    if (isConfirm) {
      const { productToDelete, listProduct } = this.state;
      if (productToDelete) {
        const updatedList = listProduct.filter(
          (product) => product !== productToDelete
          
        );
        this.setState({
          listProduct: updatedList,
          filteredProduct: updatedList,
          isDeleteProduct: false,
          productToDelete: null,
        });

        this.saveProductsToLocalStorage(updatedList);
      }
    }
    else {
      this.handleCloseDeleteModal();
    }
  };

  handleCloseDeleteModal = () => {
    this.setState({
      isDeleteProduct: false,
      productToDelete: null,
    });
  };

  handleInforProduct = (product: ItemMenu) => {
    this.setState({
      isInfoProduct: true,
      productToShow: product,
    });
  };

  handleCloseInfoModal = () => {
    this.setState({
      isInfoProduct: false,
      productToShow: null,
    });
  };

  handleEditProduct = (product: ItemMenu) => {
    this.setState({
      isEditProduct: true,
      productToEdit: product,
    });
  };

  handleConfirmEdit = (updatedProduct: ItemMenu) => {
    const { productToEdit, listProduct } = this.state;
    if (productToEdit) {
      const updatedList = listProduct.map(product =>
        product === productToEdit ? updatedProduct : product
      );
      this.setState({
        listProduct: updatedList,
        filteredProduct: updatedList,
        isEditProduct: false,
        productToEdit: null,
      });
      this.saveProductsToLocalStorage(updatedList);
    }
  };

  handleCloseEditModal = () => {
    this.setState({
      isEditProduct: false,
      productToEdit: null,
    });
  };

  

  handleCategoryFilter = (category: string) => {
    this.setState({ selectedCategory: category }, this.filterProducts);
  };

  handleStatusFilter = (status: string) => {
    this.setState({ selectedStatus: status }, this.filterProducts);
  };

  handleSearchItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchItem: event.target.value }, this.filterProducts);
  };

  filterProducts = () => {
    const { listProduct, selectedCategory, selectedStatus, searchItem } = this.state;
    const filteredProduct = listProduct.filter((product) =>
      (selectedCategory === '' || product.category === selectedCategory) &&
      (selectedStatus === '' || product.status === selectedStatus) &&
      (searchItem === '' || product.name.toLowerCase().includes(searchItem.toLowerCase()))
    );
    this.setState({ filteredProduct });
  };

  render(): ReactNode {
    const {
      isAddProduct,
      filteredProduct,
      isDeleteProduct,
      productToDelete,
      isInfoProduct,
      productToShow,
      // isShowEditProductModal,
      // productToEdit
    } = this.state;

    return (
      <div className="container md">
        <div>
          <div className="row" style={{ marginBottom: '10px' }}>
            <div className="col-12 col-md-8">
              <h2>List Product</h2>
            </div>
            <div className="col-6 col-md-4" style={{ textAlign: 'right' }}>
              <button
              className='addBtn'
              onClick={this.handleShowModalAddProduct} 
              >
                Add New Product
              </button>
              <AddNewProduct
                show={isAddProduct}
                handleClose={this.handleCloseAddModal}
                handleAddNewProduct={this.handleAddProduct}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: '10px' }}>
            <div className="List-Search" style={listSearchCSS}>
              <div className="dropdownFillter" style={dropdownFillterCSS}>
                <div className="categoryFilter">
                <button className="btn btn-success dropdown-toggle" 
                  type="button" 
                  id="dropdownMenuButton" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false">
                    Category
                  </button>
                  <ul 
                  className="dropdown-menu" aria-labelledby="dropdownMenuButton" 
                  style={{ textAlign: 'left', paddingLeft: '12px' }}>
                    {ListCategory.map((item) => (
                      <li 
                      className='filterElement'
                      key={item.category} 
                      onClick={() => this.handleCategoryFilter(item.category)}>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="statusFillter">
                  <button className="btn btn-success dropdown-toggle" 
                  type="button" 
                  id="dropdownMenuButton" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false">
                    Status
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ textAlign: 'left', paddingLeft: '12px' }}>
                    <li 
                    className='filterElement'
                    onClick={() => this.handleStatusFilter('')}>ALL</li>
                    <li 
                    className='filterElement'
                    onClick={() => this.handleStatusFilter('New')}>New</li>
                    <li 
                    className='filterElement'
                    onClick={() => this.handleStatusFilter("Old")}>Old</li>
                  </ul>
                </div>
              </div>
              <div className="input-group" style={{width: "300px"}}>
                <MDBInput label="Search" type="search" 
                onChange={this.handleSearchItem}
                />
                <button type="button" className="btn btn-primary" data-mdb-ripple-init>
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="showproduct">
            <table className="table table-striped table-bordered ">
              <thead>
                <tr>
                  <td style={imgCSS}>ID</td>
                  <td style={imgCSS}>Image</td>
                  <td style={{ ...textHeader, width: '200px' }}>Name</td>
                  <td style={{ ...textHeader, width: '150px' }}>Brand</td>
                  <td style={{ ...textHeader, width: '150px' }}>Price</td>
                  <td style={{ ...textHeader, width: '150px' }}>Amount</td>
                  <td style={{ ...textHeader, width: '150px' }}>Status</td>
                  <td style={{ ...textHeader }}>Actions</td>
                </tr>
              </thead>
              <tbody>
                {filteredProduct.length > 0 && filteredProduct.map((item, index) => (
                  <tr key={index} >
                    <td style={{textAlign: 'center', ...textBody}}>
                      <span>{index + 1}</span>
                    </td>
                    <td>
                      <img src={item.img} style={imgCSS} alt="error" />
                    </td>
                    <td style={textBody}>
                      <span>{item.name}</span>
                    </td>
                    <td style={textBody}>
                      <span>{item.brand}</span>
                    </td>
                    <td style={{ textAlign: 'right', ...textBody }}>
                      <span>{item.price}</span>
                    </td>
                    <td style={{ textAlign: 'right', ...textBody }}>
                      <span>{item.amount}</span>
                    </td>
                    <td style={textBody}>
                      <span>{item.status}</span>
                    </td>
                    <td style={buttonCSS}>
                      <button
                        className='infoBtn'
                        onClick={() => this.handleInforProduct(item)}
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button
                        className='delBtn'
                        style={{margin: '0px 20.5px'}}
                        onClick={() => this.handleDeleteProduct(item)}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                      <button
                      className='editBtn'
                      onClick={() => this.handleEditProduct(item)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false}
            newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss
            draggable pauseOnHover theme="light"
            transition={Bounce}
          />
          <DeleteProductModal 
            show={isDeleteProduct} 
            product={productToDelete}
            onClose={this.handleCloseDeleteModal}
            onConfirm={this.handleConfirmDelete}
          />
          <ShowInfoProduct
            show={isInfoProduct}
            product={productToShow}
            onClose={this.handleCloseInfoModal}
          />
          <EditProduct
            show={this.state.isEditProduct}
            product={this.state.productToEdit}
            onClose={this.handleCloseEditModal}
            onConfirm={this.handleConfirmEdit}
          />
        </div>
      </div>
    );
  }
}

export default Product;
