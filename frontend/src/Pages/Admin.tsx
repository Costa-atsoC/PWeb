import React, { useEffect } from 'react';
import Admin from './../Components/Admin/Admin';
import { Navigate } from 'react-router-dom';
import api from './../api/api';

interface Props {
  user: number | any;
}

const AdminPage: React.FC<Props> = ({ user }) => {
  const [admin, setAdmin] = React.useState<string>('admin');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.post('/admin', { id: user.id });

        if (res.data === 1) {
          setAdmin("admin");
          return ( <Admin />)
        } else {
          setAdmin("user")
        }
      } catch (error) {
        console.log(error);
        setAdmin("user")
      }
    };

    fetchData();
  }, [user.id]);

  // Check if it's necessary to redirect to home after 1 second
  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      if(admin !== "admin")
        <Navigate to="/" />
    }, 1000);

    return () => clearTimeout(redirectTimeout);
  }, []);

  if(user === undefined)
    return <Navigate to="/" />;
  console.log(admin);
  
  return (admin === "admin" ? <Admin /> : <Navigate to="/" />);
};

export default AdminPage;