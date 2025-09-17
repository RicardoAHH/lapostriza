import { useState, useEffect } from "react"
import { Link } from "react-router" // He cambiado 'react-router' a 'react-router-dom' que es el paquete correcto para web

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const carouselImages = [
        {
            src: "/postres1.jpg",
            alt: "postres1",
        },
        {
            src: "/postres2.jpg",
            alt: "postres2",
        },
        {
            src: "/postres3.webp",
            alt: "postres3",
        },
    ]

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
    }

    // Nuevo useEffect para el movimiento automático
    useEffect(() => {
        // Configura un temporizador para cambiar de diapositiva cada 5000ms (5 segundos)
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
        }, 5000);

        // Limpia el temporizador cuando el componente se desmonte para evitar fugas de memoria
        return () => clearInterval(timer);
    }, [carouselImages.length]); // Se ejecuta cada vez que cambia el número de imágenes

    return (
        <section className="relative h-76 md:h-[500px] overflow-hidden">
            {carouselImages.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-transform duration-500 ease-in-out ${index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
                        }`}
                >
                    <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                        <div className="text-center pt-40 text-white">
                            <Link to='/ordenar'>
                                <button className="bg-[#FF3366] hover:bg-[#4ead9f] text-white border-1 border-white/10 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
                                    Comienza a ordenar
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {/* Controles del carrusel */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-300 hover:scale-110"
            >
                <svg className="h-6 w-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-300 hover:scale-110"
            >
                <svg className="h-6 w-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {carouselImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white scale-125" : "bg-white bg-opacity-50 hover:bg-opacity-75"
                            }`}
                    />
                ))}
            </div>
        </section>
    )
}
