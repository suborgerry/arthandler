import { useEffect, useState } from 'react';
import axios from 'axios';

function ProductResponce() {
    const [dataProducts, setDataProducts] = useState(null);

    // States
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
  
    //Errors
    const catchError = `Ошибка в запросе. Проверьте правильность ввода и попробуйте еще раз`;

    async function responseProducts() {
        try {
            setIsLoading(true);
            const { data } = await axios.get('../prices.json');
            setDataProducts(data.catalog);
        } catch (error) {
            console.error(error);
            setError(catchError);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(()=>{responseProducts()},[]);

    return { dataProducts, isLoading, error }
}

export default ProductResponce;