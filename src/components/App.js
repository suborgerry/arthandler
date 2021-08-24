import '../sass/App.sass';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [dataProducts, setDataProducts] = useState(null);
  const [atr, setAtr] = useState('');
  const [input, setInput] = useState('');

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  //Errors
  const catchError   = `Ошибка в запросе. Проверьте правильность ввода и попробуйте еще раз`;

  async function responseProducts() {
    try {
      setIsLoading(true);
      const { data } = await axios.get('../prices.json');
      console.log(data.catalog);
      setDataProducts(data.catalog);
    } catch (error) {
      console.error(error);
      setError(catchError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{responseProducts()},[]);

  async function getProducts() {
      setAtr(input);
  };

  function handleInput(evt) {
      setInput(evt.target.value.length <= 5 ?
        (evt.target.value.length === 0 ? '' : [...evt.target.value].filter(e => isFinite(e)).join('')) : // Disable inputs letter
        input
      );
      console.log(/[^0-9]/.test(input));
  };

  const Products = atr && dataProducts && dataProducts[1].products.map((product, index) => 
  product.sku?.includes(atr) &&
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
                  <span>{index}</span>
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
        {isLoading ? <p>Загрузка базы поставщиков &#9203;</p> :
          <>
            <p>Поиск товара по артикулу</p>
            <p>Артикул - 5 цифр.</p>
            <input type="text" id="inputFilter" value={input} onChange={handleInput} placeholder="АРТИКУЛ"/>
            <button type="button" onClick={getProducts} disabled={input.length!==5 ? true : false}>ИСКАТЬ</button>
              { error ? <p>⚠️ {error}</p> : 
                Products && 
                  <div className="dillers">
                    {Products}
                  </div> }
          </>
        }
      </div>
    </div>
  );
}

export default App;
