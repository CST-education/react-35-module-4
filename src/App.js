import { useState } from 'react';
import { useLS } from './hooks/useLS';
import { ProductList } from './components/Products/ProductList';
import { Modal } from './components/Modal/Modal';
import { Form } from './components/Forms/Form';
import { SearchFrom } from './views/PexelsImages/SearchForm';
import { ImagesList } from './views/PexelsImages/ImagesList';
import './App.css';
function App() {
  //   const [counter, setCounter] = useState(0);
  //   const [isOpen, setIsOpen] = useState(false);
  const [allProducts, setAllProducts] = useLS('products', []);
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [perPage, setPerPage] = useState(5);
  const addNewProduct = obj => setAllProducts(zuzuzu => [...zuzuzu, obj]);
  const deleteProduct = id =>
    setAllProducts(zuzuzu => zuzuzu.filter(prod => prod.id !== id));
  const toggleModal = () => setShowModal(!showModal);
  const getSearchValues = (searchValue, perPage) => {
    setSearchValue(searchValue);
    setPerPage(perPage);
  };

  return (
    <div className="App">
      <SearchFrom getSearchValues={getSearchValues} />
      <ImagesList searchValue={searchValue} perPage={perPage} />

      {showModal && (
        <Modal toggleModal={toggleModal}>
          <Form addNewProduct={addNewProduct} />
        </Modal>
      )}
      <h1>FE-35 Product</h1>
      <button type="button" onClick={toggleModal}>
        Add Product
      </button>
      {/* === РЕНДЕР КОМПОНЕНТА СПИСКА ПРОДУКТОВ === */}
      <ProductList products={allProducts} onDeleteProduct={deleteProduct} />
    </div>
  );
}

export default App;
