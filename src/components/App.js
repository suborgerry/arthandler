import '../sass/App.sass';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [dataProducts, setDataProducts] = useState(null);
  const [atr, setAtr] = useState('')
  const [input, setInput] = useState('');

  async function responseProducts() {
    try {
      const response = await axios.get('../prices.json');
      setDataProducts(response.data.catalog);
      console.log('responseProducts');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{responseProducts()},[]);

  async function getProducts() {
    setAtr(input);
    console.log('getProducts')
  };

  function handleInput(evt) {
    setInput(evt.target.value);
    console.log('handleInput');
  };

  const Products = atr && dataProducts && dataProducts[1].products.map((product, index) => 
  (product.sku?.includes(atr) && !(atr.length===4)) &&
    <>
      <p>
        <b>Товар: </b><span>{product.name}</span>
      </p>
      <p>
        <b>Цена: </b><span>{product.price}</span>
      </p>
      <p>
        <b>Общее количество: </b><span>{product.quantity}</span> 
      </p>
      <ul className="dillersHeader">
            <li key="cell0" className="cell">Поставщик</li>
            <li key="cell1" className="cell">Остаток</li>
            <li key="cell2" className="cell">Цена</li>
      </ul>
      <ul className="dillersContainer">
          { product.suppliers && product.suppliers.map((suppilier, index) => 
            <>
              { suppilier.name !== 'Сантехстрой - исходник' && 
                <li key={index} className="cellContainer">
                  <span className="cell">{suppilier.name}</span>
                  <span className="cell">{suppilier.product.quantity}</span>
                  <span className="cell">{suppilier.product.price}</span>
                </li> 
              }
            </>
          ) }
      </ul>
    </>
  );

  return (
    <div className="App">
      <div className="container">
      <p>Поиск товара по артикулу</p>
      <input type="text" id="inputFilter" value={input} onChange={handleInput} placeholder="АРТИКУЛ"/>
      <button type="button" onClick={getProducts}>ИСКАТЬ</button>
        { Products && 
          <div className="dillers">
            {Products}
          </div> }
      </div>
    </div>
  );
}

export default App;
