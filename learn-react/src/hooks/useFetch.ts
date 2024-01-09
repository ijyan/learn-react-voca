import { useEffect, useState } from 'react';

export default function useFetch(url: string) {
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setFetchData(data));
  }, [url]);

  return fetchData;
}
