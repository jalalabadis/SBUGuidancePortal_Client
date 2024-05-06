import { onValue, ref } from 'firebase/database';
import { useState, useEffect } from 'react';
import { getDatabase } from 'firebase/database';

const useTicketData = () => {
  const db = getDatabase();
  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
const ticketDataListener = onValue(ref(db, 'Tickets'), (snapshot) => {
  const records = [];
  if(snapshot.exists()){
  snapshot.forEach(childsnapshot => {
  records.push(childsnapshot.val());
});}
setTicketData(records);
    });
    return () => {
      ticketDataListener();
    };
  }, [db]);

  return ticketData;
};

export default useTicketData;

  

  