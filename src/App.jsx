import { Route, Routes, useNavigate } from 'react-router';
import Home from './pages/Home/Home.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Cotizaciones from './pages/Cotizaciones/Cotizaciones.jsx';
import Ordenar from './pages/Ordenar/Ordenar.jsx';
import Nosotros from './pages/Nosotros/Nosotros.jsx';
import { CartProvider } from './context/CartContext.jsx';
import Checkout from './pages/Checkout/Checkout.jsx';
import Confirmacion from './pages/Confirmacion/Confirmacion.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Login from './pages/Login/Login.jsx';
function App() {
  return (
    <>
      <ScrollToTop />
      <CartProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cotizaciones' element={<Cotizaciones />} />
          <Route path='/ordenar' element={<Ordenar />} />
          <Route path='/nosotros' element={<Nosotros />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/confirmacion' element={<Confirmacion />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />
      </CartProvider>

    </>
  )
}

export default App
