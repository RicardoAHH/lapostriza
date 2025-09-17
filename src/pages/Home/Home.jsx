import React from 'react'
import Carousel from '../../components/Home/Carousel.jsx';
import Promociones from '../../components/Home/Promociones.jsx';
import { promociones } from '../../data/promocionesdata.js';
import CotizacionCTA from '../../components/Home/Cotizaciones.jsx';
import ProcesoCompra from '../../components/Home/ProcesoCompra.jsx';
export default function Home() {
    return (
        <div className=" min-h-screen bg-[#F8F5EE]">
            <Carousel />
            <ProcesoCompra />
            <Promociones promocionesData={promociones} />
            <CotizacionCTA />
        </div>
    )
}
