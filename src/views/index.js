import Header from '../component/Header';
import './app.scss';
import Landing from './Landing';
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProcessModal } from '../component/ProcessModal';


function App() {
  const [themeColor, setThemeColor] = useState("default")
  const setTheme = (type) => setThemeColor(type)

  return (
      <>
      <div className={themeColor}>
        <Header />
        <Landing setTheme={setTheme} color={themeColor} />
        {/* <ProcessModal isOpen={isLoading} message={loadingMessage}/> */}
      </div>
      <ToastContainer/>
      </>
  );
}

export default App;
