

import Home from './pages/Home'
import Header from './components/Header'
import { Route, Routes } from 'react-router'
import Footer from './components/Footer'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Account from './pages/Account'
import About from './pages/About'
import Detail from './pages/Detail'

import { ShopContextProvider } from './context/ShopContext'
import { Shop } from './pages/Shop'
import GoTopButton from './components/GoTopButton'




function App() {


  return (
    <>
      <ShopContextProvider>
        <Header />
        <GoTopButton />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Shop' element={<Shop />} />
          <Route path='/About' element={<About />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Account' element={<Account />} />
          <Route path='/Detail/:id/:name' element={<Detail />} />
        </Routes>
        <Footer />
      </ShopContextProvider>
    </>
  )
}

export default App
