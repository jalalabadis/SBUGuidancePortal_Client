import { onValue, ref } from 'firebase/database';
import { useState, useEffect } from 'react';
import axios from 'axios';

const useAllcalendarData = () => {
  const [alluserData, setAlluserData] = useState();

  useEffect(() => {
const alluserDataListener = ()  => { 
    axios.post(`${process.env.REACT_APP_SERVER}/calendar/all`)
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

export default useAllcalendarData;