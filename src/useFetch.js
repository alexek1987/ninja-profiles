import { useEffect, useState, useRef } from "react";

function useFetch(url) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const unmountRef = useRef(false);

  // As long as the refernce is false, we can set state: with data || loading || error
  // When the component is about to unmount the reference will turn true, preventing stats from being set

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
  }, [url]);
  // returing the state values and also setter for data so filter and sort the data in ui
  return { loading, data, error, setData };
}

export default useFetch;
