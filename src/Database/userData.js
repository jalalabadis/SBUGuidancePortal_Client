import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const useUserData = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
const userDataListener = () => {
  const cookie = Cookies.get('AuthToken');
    if (cookie) { 
      axios.post(`${process.env.REACT_APP_SERVER}/auth/check`, {token: cookie})
      .then(res=>{
           setUserData(res.data);
      })
      .catch(err=>{
        console.log(err);
        Cookies.remove('AuthToken');
      })
    }
    };

    return () => {
      userDataListener();
    };
  }, []);

  return userData;
};

export default useUserData;