function Products(props) {
    const handleProducts = props.atr && 
                           props.dataProducts && 
                           props.dataProducts[1].products.map((product, index) => 
    product.mpn === props.atr &&
        <div key="productContainer">
            <p key="product">
                <b>Товар: </b><span>{product.name}</span>
            </p>
            <p key="price">
                <b>Цена: </b><span>{product.price}</span>
            </p>
            <p key="quantity">
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
                )}
            </ul>
        </div>
    );
            
    return (
        <>
            { handleProducts &&
            <div className="dillers">
                {handleProducts}
            </div> }
        </>
    )
}


export default Products;