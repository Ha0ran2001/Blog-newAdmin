import React, { useState, useEffect, useReducer, createContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import New from '@/pages/New';
import Login from '@/pages/Login';

import useToken from '@/utils/useToken';

function App() {

  const { token, setToken } = useToken();

  if (!token) {
    return <Router><Login setToken={setToken} /></Router>
  }

  return (
    <Router>
      <div className='dark:bg-[#101725] min-h-screen md:px-10 px-2 pt-5'>
        <Header />
        <Switch>
          <Route path='/home'><Home /></Route>
          {/* <Route path='/new'><New /></Route> */}
          <Route path='/'><Home /></Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
