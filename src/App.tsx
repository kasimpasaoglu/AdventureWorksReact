

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
import { AuthContextProvider } from './context/AuthContext'
import Register from './pages/Register'
import { CartContextProvider } from './context/CartContext'





function App() {


  return (
    <>
      <AuthContextProvider>
        <ShopContextProvider>
          <CartContextProvider>
            <Header />
            <GoTopButton />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/account' element={<Account />} />
              <Route path='/detail/:id/:name' element={<Detail />} />
            </Routes>
            <Footer />
          </CartContextProvider>
        </ShopContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
