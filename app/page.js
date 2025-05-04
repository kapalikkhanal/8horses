'use client'
import {
  FaBars, FaTimes, FaFacebook, FaInstagram, FaTwitter,
  FaCrosshairs, FaEnvelope, FaPhone, FaClock
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Miniver, Poppins } from 'next/font/google';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const miniver = Miniver({
  weight: '400',
  subsets: ['latin'],
});

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  const products = [
    {
      name: "Sofas",
      image: "/images/sofa2.webp",
      feedback: "Sink into comfort with our stylish, cozy sofas."
    },
    {
      name: "Dining",
      image: "/images/dining.jpg",
      feedback: "Where meals turn into memories—elevate your dining space."
    },
    {
      name: "Living Room",
      image: "/images/livingroom.jpg",
      feedback: "Create a space you'll love to gather in every day."
    },
    {
      name: "Bedroom",
      image: "/images/bed.jpg",
      feedback: "Rest easy with bedroom pieces designed for calm and comfort."
    },
    {
      name: "Outdoor",
      image: "/images/outdoor.jpg",
      feedback: "Bring style outside—perfect pieces for open-air living."
    },
    {
      name: "Homewares",
      image: "/images/homeware.jpg",
      feedback: "Functional meets beautiful in every homeware detail."
    },
    {
      name: "Rugs",
      image: "/images/rug.jpg",
      feedback: "Add warmth, texture, and personality underfoot."
    },
    {
      name: "Wall Art",
      image: "/images/wall-art.jpg",
      feedback: "Turn empty walls into inspiring spaces with stunning wall art."
    }
  ];

  return (
    <div className="font-sans text-white">
      {/* Header */}
      <header className="bg-[#3B141C] bg-opacity-50 py-5 fixed w-full z-50">
        <nav className="px-10 mx-auto flex justify-between items-center">
          <a href="#" className="text-white text-3xl font-bold p-1">8 Horses</a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10">
            <li><a href="#home" className="text-white hover:text-gray-300 text-lg">Home</a></li>
            <li><a href="#about" className="text-white hover:text-gray-300 text-lg">About</a></li>
            <li><a href="#product" className="text-white hover:text-gray-300 text-lg">Product</a></li>
            <li><a href="#contact" className="text-white hover:text-gray-300 text-lg">Contact</a></li>
            <li><a href="/signup" className="text-white hover:text-gray-300 text-lg">Signup</a></li>
            <li><a href="/signin" className="text-white hover:text-gray-300 text-lg">Signin</a></li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsMenuOpen(true)}
          >
            <FaBars />
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-90 z-50">
            <div className="w-[90%] max-w-[1200px] mx-auto py-8 px-4">
              <button
                className="text-white text-2xl absolute top-5 right-5"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaTimes />
              </button>
              <ul className="flex flex-col gap-6 mt-16">
                <li><a href="#home" className="text-white text-xl" onClick={() => setIsMenuOpen(false)}>Home</a></li>
                <li><a href="#about" className="text-white text-xl" onClick={() => setIsMenuOpen(false)}>About</a></li>
                <li><a href="#product" className="text-white text-xl" onClick={() => setIsMenuOpen(false)}>Product</a></li>
                <li><a href="#contact" className="text-white text-xl" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
                <li><a href="/signup" className="text-white text-xl" onClick={() => setIsMenuOpen(false)}>Signup</a></li>
                <li><a href="/signin" className="text-white text-xl" onClick={() => setIsMenuOpen(false)}>Signin</a></li>
              </ul>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="py-4 min-h-screen bg-[#3B141C] flex items-center">
          <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12">

            {/* Text Content */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className={`text-4xl md:text-5xl ${miniver.className} font-bold text-[#F3961C] mb-4`}>Arkfei</h2>
              <h3 className={`text-2xl md:text-3xl text-white mb-4 max-w-md mx-auto md:mx-0 ${poppins.className}`}>Decorate your home using our site</h3>
              <p className={`text-base md:text-lg text-white mb-6 max-w-lg mx-auto md:mx-0 ${poppins.className}`}>
                Welcome to our design paradise, where you can build your dream house.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <a
                  href="#"
                  className="bg-[#F3961C] border hover:bg-[#e0553d] hover:border-white text-[#3B141C] px-6 py-3 rounded-3xl font-bold transition duration-300"
                >
                  Order Now
                </a>
                <a
                  href="#"
                  className="border border-white hover:bg-[#e0553d] text-white hover:text-[#3B141C] px-6 py-3 rounded-3xl font-bold transition duration-300"
                >
                  Contact Us
                </a>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src="/images/home.png"
                alt="Home Design"
                className="w-3/4 md:w-full max-w-md md:max-w-lg object-contain"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-10 bg-white">
          <div className="w-[90%] max-w-[1200px] mx-auto flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <img src="/images/about.jpg" alt="About Us" className="w-full rounded-full" />
            </div>

            <div className="md:w-1/2 text-center">
              <h2 className="text-4xl text-[#333] mb-3">About Us</h2>
              <div className="h-1 w-16 bg-[#F3961C] mx-auto mb-6" />

              <p className={`text-lg font-bold ${poppins.className} text-[#555] mb-6 leading-7 text-justify`}>
                Whether you need a new statement sofa or something small to finish your room, we have
                pieces big and small. We aim to inspire all Australians to express their individuality and sense of
                style in their home.
              </p>

              <p className={`text-lg font-bold ${poppins.className} text-[#555] mb-8 leading-7 text-justify`}>
                At 8 Horses, you can always find something that suits your home, tastes and lifestyle. Our range of
                furniture is carefully chosen for style and function and rigorously tested for
                durability so you can treat your home to a little luxury knowing you&apos;ll love it as much in years to
                come as you do today. And with 8 Horses stores all around the country, and beautiful new things
                arriving in-store and online all the time, there&apos;s no end to our story.
              </p>

              <div className="flex justify-center gap-6">
                <a href="#" className="text-2xl text-[#333] hover:text-[#ff6347]">
                  <FaFacebook />
                </a>
                <a href="#" className="text-2xl text-[#333] hover:text-[#ff6347]">
                  <FaInstagram />
                </a>
                <a href="#" className="text-2xl text-[#333] hover:text-[#ff6347]">
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Product Section */}
        <section id="product" className="py-10 bg-[#f9f9f9]">
          <div className="w-[90%] max-w-[1200px] mx-auto">
            <h2 className="text-4xl text-center text-[#333] mb-3">Products</h2>
            <div className="h-1 w-16 bg-[#F3961C] mx-auto mb-10" />
            <div className="relative px-4">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 }
                }}
                className="product-swiper"
              >
                {products.map((product, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                      <h3 className="text-xl font-semibold text-[#3B141C] mb-1">{product.name}</h3>
                      <p className="text-[#666]">{product.feedback}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Arrows */}
              <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#F3961C] text-white w-12 h-12 rounded-sm flex items-center justify-center cursor-pointer z-10 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </div>
              <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#F3961C] text-white w-12 h-12 rounded-sm flex items-center justify-center cursor-pointer z-10 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4' viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white text-black">
          <div className="w-[90%] max-w-[1200px] mx-auto">
            <h2 className="text-4xl text-[#333] text-center mb-3">Contact Us</h2>
            <div className="h-1 w-16 bg-[#F3961C] mx-auto mb-10" />

            <div className="flex flex-col md:flex-row gap-10">
              <div className="md:w-1/2">
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <FaCrosshairs className="text-[#F3961C] text-xl mt-1" />
                    <p className="text-[#555]">170 Bourke Street, Melbourne</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <FaEnvelope className="text-[#F3961C] text-xl mt-1" />
                    <p className="text-[#555]">abc123@gmail.com</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <FaPhone className="text-[#F3961C] text-xl mt-1" />
                    <p className="text-[#555]">(123) 456-78909</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <FaClock className="text-[#F3961C] text-xl mt-1" />
                    <p className="text-[#555]">Monday - Friday: 9:00 AM - 5:00 PM</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <FaClock className="text-[#F3961C] text-xl mt-1" />
                    <p className="text-[#555]">Saturday & Sunday: Closed</p>
                  </li>
                </ul>
              </div>

              <div className="md:w-1/2">
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6347]"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6347]"
                    required
                  />
                  <textarea
                    placeholder="Your message"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6347] h-32"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-[#F3961C] cursor-pointer hover:bg-[#e0553d] text-white py-3 rounded-lg font-bold"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#333] text-white py-10">
        <div className="w-[90%] max-w-[1200px] mx-auto text-center">
          <p className="mb-6">@ 8 Horses website</p>

          <div className="flex justify-center gap-4 mb-6">
            <a href="#" className="text-2xl hover:text-[#ff6347]">
              <FaFacebook />
            </a>
            <a href="#" className="text-2xl hover:text-[#ff6347]">
              <FaInstagram />
            </a>
            <a href="#" className="text-2xl hover:text-[#ff6347]">
              <FaTwitter />
            </a>
          </div>

          <div className="flex justify-center items-center gap-1">
            <a href="#" className="hover:text-[#ff6347]">Privacy policy</a>
            <span>.</span>
            <a href="#" className="hover:text-[#ff6347]">Refund policy</a>
          </div>
        </div>
      </footer>
    </div >
  );
}