import React, {useEffect, useState} from 'react';
import {Login} from './pages/login'
import {Home} from "./pages/home";
function App() {
  const [authToken, setAuthToken] = useState('');
  useEffect(() => {
    const token: string | null = localStorage.getItem("auth_token")
    if(token !== null){
      setAuthToken(token)
    }
  }, []);

  return (
      <>
        {authToken === ""  && (
          <Login setAuthToken={setAuthToken}/>
        )}
        {authToken !== ""  && (
            <Home setAuthToken={setAuthToken}/>
        )}
      </>
  );
}

export default App;
