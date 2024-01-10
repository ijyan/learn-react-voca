import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetch(url: string) {
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    axios(url).then((res) => setFetchData(res.data));
  }, [url]);

  return fetchData;
}
