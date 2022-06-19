import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get('/api/v1/users', { withCredentials: true })
      .then((response) => {
        if (response.data.current_user) {
          setUser(response.data.current_user);
        } else {
          setUser({ message: 'not login' });
        }
      })
      .catch((error) => console.log(error));
  }, []);
  return { user };
}
