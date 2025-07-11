import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StoreCard from '../components/StoreCard';

const Dashboard = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      const res = await axios.get('/api/stores', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setStores(res.data);
    };
    fetchStores();
  }, []);

  const handleRate = async (storeId, rating) => {
    await axios.post('/api/stores/rate', { store_id: storeId, rating }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    alert('Rating submitted!');
  };

  return (
    <div>
      <h2>Store Listings</h2>
      {stores.map(store => (
        <StoreCard
          key={store.id}
          store={store}
          userRating={0} // Replace with actual user rating if available
          onRate={(rating) => handleRate(store.id, rating)}
        />
      ))}
    </div>
  );
};

export default Dashboard;
