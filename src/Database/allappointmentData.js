import { useState, useEffect } from 'react';
import axios from 'axios';

const useAllappointmentData = () => {
  const [alluserData, setAlluserData] = useState();

  useEffect(() => {
const alluserDataListener = ()  => { 
    axios.post(`${process.env.REACT_APP_SERVER}/appointment/all`)
    .then(res=>{
        setAlluserData(res.data);
    })
    .catch(err=>{
      console.log(err);
    })
    };
    return () => {
        alluserDataListener();
    };
  }, []);

  return alluserData;
};

export default useAllappointmentData;