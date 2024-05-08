import { useState, useEffect } from 'react';
import axios from 'axios';

const useAllInventoryData = () => {
  const [alluserData, setAlluserData] = useState();

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_SERVER}/inventory/all`)
    .then(res=>{
        setAlluserData(res.data);
    })
    .catch(err=>{
      console.log(err);
    });
  }, []);

  return alluserData;
};

export default useAllInventoryData;