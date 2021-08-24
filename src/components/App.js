import '../sass/App.sass';
import { useState } from 'react';
import Products from './Products';
import ProductResponce from './responce';

function App() {
  const [atr, setAtr] = useState('');
  const [input, setInput] = useState('');

  const { dataProducts, isLoading, error } = ProductResponce();
  
  function getProducts() {
      setAtr(input);
  };

  function handleInput(evt) {
      setInput(evt.target.value.length <= 5 ?
        (evt.target.value.length === 0 ? '' : [...evt.target.value].filter(e => isFinite(e)).join('')) : // Disable inputs letter
        input
      );
  };

  function clearResponce() {
    setInput('');
    setAtr('');
  };

  return (
    <div className="App productsSearch">
      <div className="container">
        {isLoading ? <p>Загрузка базы поставщиков &#9203;</p> :
          <>
            <p>Поиск товара по артикулу</p>
            <p>Артикул - 5 цифр.</p>
            <input type="text" id="inputFilter" value={input} onChange={handleInput} placeholder="АРТИКУЛ"/>
            <button type="button" onClick={getProducts} disabled={input.length!==5 ? true : false}>ИСКАТЬ</button>
            <button type="button" disabled={!input} onClick={clearResponce}>ОЧИСТИТЬ ПОИСК</button>
            { error ? <p>⚠️ {error}</p> : 
                Products && <Products dataProducts={dataProducts}  atr={atr}/>
            }   
          </>
        }
      </div>
    </div>
  );
}

export default App;
