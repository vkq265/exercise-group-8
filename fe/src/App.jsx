import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

// import Login from './pages/Login';
// import Regist from './pages/Regist';
import LoginRoute from './router/loginRoute';
import Loading from './components/common/alert/Loading.jsx'
import Alert from './components/common/alert/Alert';

// import SocketClient from './SocketClient'
import { getUserInfo } from './redux/action/authAction'
import HomeRoute from './router/homeRoute.js';
// import { getCodeExerCises, getQueueCodeExercises } from './redux/action/codeExerciseAction'

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getUserInfo()).then(() => {
      setIsLoading(false)
      console.log(auth)
    })
  }, [dispatch])



  if (isLoading) {
    return <Loading />;
  }


  return (
    <Router>
      {/* <SocketClient>*/}
      <Alert />
      <div className='main'>
        <Routes>
          <Route path='/auth/*' element={<LoginRoute />} />
          <Route path='/*' element={<HomeRoute />} />
          <Route path='/*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
      {/* </SocketClient> */}
    </Router>
  );
}

export default App;