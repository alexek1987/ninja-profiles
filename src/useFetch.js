import { useEffect, useState, useRef } from "react";

function useFetch(url) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const unmountRef = useRef(false);

  useEffect(() => {
    !unmountRef.current && setLoading(true);
    fetch(url)
      .then((result) => result.json())
      .then((data) => !unmountRef.current && setData(data))
      .catch((error) => {
        console.log(error);
        !unmountRef.current && setError(error.message);
      });
    !unmountRef.current && setLoading(false);

    return () => {
      unmountRef.current = true;
    };
  }, []);

  return { loading, data, error, setData };
}

export default useFetch;
