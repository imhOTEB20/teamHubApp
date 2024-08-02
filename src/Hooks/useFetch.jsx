import { useEffect, useState } from 'react';

export default function useFetch(url, opiniones = {}, mensajeError = "Error al realizar la peticion") {
    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setData(null);
        setIsError(false);
        setIsLoading(true);

        fetch(url, { ...opiniones })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw Error(mensajeError);
        })
        .then((data) => {
            setData(data);
        })
        .catch((e) => {
            setIsError(true);
            console.log(e);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [url]);

    return [data, isError, isLoading];
}