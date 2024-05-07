import { onValue, ref } from 'firebase/database';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const useAlluserData = () => {
  const [alluserData, setAlluserData] = useState();

  useEffect(() => {
const alluserDataListener = ()  => {
    const cookie = Cookies.get('AuthToken');
    if (cookie) { 
    axios.post(`${process.env.REACT_APP_SERVER}/auth/all_user`, {token: cookie})
    .then(res=>{
        setAlluserData(res.data);
    })
    .catch(err=>{
      console.log(err);
    })
    }
    };
    return () => {
        alluserDataListener();
    };
  }, []);

  return alluserData;
};

export default useAlluserData;