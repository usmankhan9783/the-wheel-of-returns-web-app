import Header from '../component/Header';
import './app.scss';
import Landing from './Landing';
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProcessModal } from '../component/ProcessModal';
import { useSelector } from 'react-redux';


function App() {
  const [themeColor, setThemeColor] = useState("default")
  const setTheme = (type) => setThemeColor(type)

  const state = useSelector(state=>state.web3Reducer);

  return (
      <>
      <div className={themeColor}>
        <Header />
        <Landing setTheme={setTheme} color={themeColor} />
        <ProcessModal isOpen={state?.isLoaderOpen} message={state?.loaderMessage}/>
      </div>
      <ToastContainer/>
      </>
  );
}

export default App;
