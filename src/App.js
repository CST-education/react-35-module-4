import { useState, useCallback, useMemo } from 'react';
import { useLS } from './hooks/useLS';
import { useToggle } from './hooks/useToggle';

import { ProductList } from './components/Products/ProductList';
import { Modal } from './components/Modal/Modal';
import { Form } from './components/Forms/Form';
import { SearchFrom } from './views/PexelsImages/SearchForm';
import { ImagesList } from './views/PexelsImages/ImagesList';
import './App.css';
// import { SolidTitle } from './components/Titles/SolidTitle';
function App() {
  //   const [counter, setCounter] = useState(0);
  //   const [isOpen, setIsOpen] = useState(false);
  // === свои хуки
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useToggle(false);
  // === свои хуки

  // - список
  const [filter, setFilter] = useState('');
  const [allProducts, setAllProducts] = useLS('products', []);
  const filteredProducts = useMemo(() => {
    let normFilter = filter.toLowerCase();
    return allProducts.filter(prod =>
      prod.title.toLowerCase().includes(normFilter),
    );
  }, [filter, allProducts]);
  // - список

  const [perPage, setPerPage] = useState(5);
  const getSearchValues = (searchValue, perPage) => {
    setSearchValue(searchValue);
    setPerPage(perPage);
  };

  const addNewProduct = obj => setAllProducts(zuzuzu => [...zuzuzu, obj]);
  const deleteProduct = id =>
    setAllProducts(zuzuzu => zuzuzu.filter(prod => prod.id !== id));

  const handleChangeFilter = useCallback(e => setFilter(e.target.value), []);

  // console.log('filteredProducts', filteredProducts);
  // console.log('showModal', setShowModal);

  return (
    <div className="App">
      <SearchFrom getSearchValues={getSearchValues} />
      <ImagesList searchValue={searchValue} perPage={perPage} />

      {showModal && (
        <Modal toggleModal={setShowModal}>
          <Form addNewProduct={addNewProduct} />
        </Modal>
      )}
      <h1>FE-35 Product</h1>
      {/* <SolidTitle titleText="FE-35 Product" /> */}
      <button type="button" onClick={setShowModal}>
        Add Product
      </button>
      {/* === FILTER СПИСКА ПРОДУКТОВ === */}
      <br />
      <label htmlFor="filter">Filter</label>
      <br />
      <input
        type="text"
        id="filter"
        value={filter}
        onChange={handleChangeFilter}
      />
      <br />
      {/* === РЕНДЕР КОМПОНЕНТА СПИСКА ПРОДУКТОВ === */}
      <ProductList
        products={filteredProducts}
        onDeleteProduct={deleteProduct}
      />
    </div>
  );
}

export default App;
