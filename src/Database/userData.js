import { onValue, ref } from 'firebase/database';
import { useState, useEffect } from 'react';
import { getDatabase } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const useUserData = () => {
  const navigate = useNavigate();
  const db = getDatabase();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
  
const userDataListener = onAuthStateChanged(auth, (user) => {
    if (user) { 
        onValue(ref(db, "Client_Accounts/" + user.uid), snapshot=>{
            if(snapshot.exists()){
                setUserData(snapshot.val());
            }
        });
    }
    else{
      navigate('/login')
    }
    })
    return () => {
      userDataListener();
    };
  }, [db, navigate]);

  return userData;
};

export default useUserData;