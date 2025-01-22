
import { Provider } from 'react-redux'
import { store } from './store/store'
import Home from './pages/Home'
import Header from './components/Header'
import { Route, Routes } from 'react-router'
import Footer from './components/Footer'
import Shop from './pages/Shop'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Account from './pages/Account'



function App() {


  return (
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Shop' element={<Shop />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/Account' element={<Account />} />
      </Routes>
      <Footer />
    </Provider>
  )
}

export default App
