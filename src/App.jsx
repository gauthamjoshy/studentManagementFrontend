import { Route, Routes } from 'react-router-dom'
import './App.css'
import Authentication from './Authentication/Authentication'
import PageNotFound from './Authentication/PageNotFound'
import Counter from './components/Counter'
import LandingPage from './pages/LandingPage'

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/*' element={<PageNotFound/>}/>
      <Route path='/login' element={<Authentication authenticator />}/>
      <Route path='/register' element={<Authentication />}/>
      <Route path='/counter' element={<Counter/>}/>
    </Routes>

    </>
  )
}

export default App
