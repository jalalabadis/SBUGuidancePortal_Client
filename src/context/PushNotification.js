import React, { useEffect } from 'react'
import { usePaymentData } from '../Database';
import { child, get, getDatabase, ref } from "firebase/database";
import addNotification from 'react-push-notification';

function PushNotification() {
  const db = getDatabase();
  const PaymentData = usePaymentData();
////Panding Payment data
useEffect(() => {
    const usersRef = ref(db, 'Client_Accounts');
    const filterPaymentData = PaymentData.filter(item => item.status?.toLowerCase().includes('pending')).splice(0, 1);
    const promises = filterPaymentData.map((post) => {
      const userId = post.userid;
      const agentID = post.agentid;
  const userPromise = userId ? get(child(usersRef, `${userId}`)).catch(() => "") : Promise.resolve("");
  const agentPromise = agentID ? get(child(usersRef, `${agentID}`)).catch(() => "") : Promise.resolve("");
      return Promise.all([userPromise, agentPromise]).then(([userSnapshot, agentSnapshot]) => {
        const user = userSnapshot!==""?userSnapshot.val():null;
        const agent = agentSnapshot!==""?agentSnapshot.val():null;
        post.user = user;
        post.agent = agent;
        return post;
      });
    });
  
     // Wait for all promises to resolve
     Promise.all(promises).then((OrderWithUserData) => {
     ///Send Notification
     if(OrderWithUserData){
addNotification({
    title: 'New Order Request',
    subtitle: `${OrderWithUserData[0]?.operatorname}`,
    message: `${OrderWithUserData[0]?.user.acountname} ${OrderWithUserData[0]?.operatorname} ${OrderWithUserData[0]?.amount}৳`,
    theme: 'darkblue',
    icon: '/images/logo.webp',
    native: true 
  });
}
    });
  }, [db, PaymentData]);
  return (
    <></>
  )
}

export default PushNotification