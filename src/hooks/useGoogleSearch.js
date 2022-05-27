import { useState, useEffect } from "react";
import API_KEY from "../keys/key";

const CONTEXT_KEY = "eaf3d80a3c0b0e873";

//the costume hook for fetch data
const useGoogleSearch = (term) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(
          `https://www.googleapis.com/customsearch/v1/siterestrict?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${term}`
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              setError(response.status);
            }
          })
          .then((result) => {
            setData(result);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [term]);

  return { data, error };
};

export default useGoogleSearch;
