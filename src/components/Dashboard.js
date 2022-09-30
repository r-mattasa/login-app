import React, {useContext } from 'react';
import {  useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const Dashboard = () =>   {
   
    const history = useNavigate();
    const { setAuthUser }  = useContext(AuthContext);

    const handleLogOut = () => {
    
		localStorage.removeItem('user');
		setAuthUser({});
		history('/');
	};

   return (
    <div>
      Welcome User!<br /><br />
      <button type='button' onClick={handleLogOut} > Log out </button>
    </div>
  );
}
 
export default Dashboard;