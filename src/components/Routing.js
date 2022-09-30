import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import RequireAuth  from './RequireAuth';
import SiginForm from './SiginForm';
import Dashboard from './Dashboard';
import SignUpForm from './SignupForm';

const  Routing = () => {
  return (
    <Routes>
      <Route  path='/'  element = {<SiginForm />} />
      <Route  path='/logout'  element = {<SiginForm />} />  
      <Route  path='/signup' element = {<SignUpForm />}  />

      {/* Protected Routes */}
      <Route element={<RequireAuth />} >
      <Route  path='/dashboard' element = {<Dashboard />} exact  />
      </Route>

    </Routes> 
  )
}

export default Routing;

