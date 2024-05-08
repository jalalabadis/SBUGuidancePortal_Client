import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const useAlluserData = () => {
  const [alluserData, setAlluserData] = useState();

  useEffect(() => {
    const cookie = Cookies.get('AuthToken');
    if (cookie) { 
    axios.post(`${process.env.REACT_APP_SERVER}/auth/all_user`, {token: cookie})
    .then(res=>{
        setAlluserData(res.data);
    })
    .catch(err=>{
      console.log(err);
    })
    };
  }, []);

  return alluserData;
};

export default useAlluserData;