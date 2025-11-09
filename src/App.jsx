import { Route, Routes } from 'react-router-dom'
import './App.css'
import Authentication from './Authentication/Authentication'
import PageNotFound from './Authentication/PageNotFound'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/*' element={<PageNotFound/>}/>
      <Route path='/login' element={<Authentication authenticator />}/>
      <Route path='/register' element={<Authentication />}/>
      <Route path='/home' element={<HomePage/>}/>
    </Routes>

    </>
  )
}

export default App
