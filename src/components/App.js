import '../sass/App.sass';
import { useState } from 'react';
import Products from './Products';
import ProductResponce from './responce';

function App() {
  const [atr, setAtr] = useState('');
  const [input, setInput] = useState('');

  const { dataProducts, isLoading, error } = ProductResponce();
  
  function getProducts() {
      setAtr(input.trim());
  };

  function handleInput(evt) {
      setInput(evt.target.value.length === 0 ? '' : evt.target.value);
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
            <input type="text" id="inputFilter" value={input} onChange={handleInput} placeholder="Введите артикул"/>
            <button type="button" onClick={getProducts} disabled={input.length<=0 ? true : false}>Искать</button>
            <button type="button" disabled={!input} onClick={clearResponce}>Очистить поиск</button>
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
