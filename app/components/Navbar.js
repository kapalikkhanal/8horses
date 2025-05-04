'use client'
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div>
            {/* Header */}
            <header className="bg-[#3B141C] bg-opacity-50 py-5 fixed w-full z-50">
                <nav className="px-10 mx-auto flex justify-between items-center">
                    <a href="#" className="text-white text-3xl font-bold p-1">8 Horses</a>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center gap-10">
                        <li><a href="\" className="text-white hover:text-gray-300 text-lg">Home</a></li>
                        <li><a href="#about" className="text-white hover:text-gray-300 text-lg">About</a></li>
                        <li><a href="#product" className="text-white hover:text-gray-300 text-lg">Product</a></li>
                        <li><a href="#contact" className="text-white hover:text-gray-300 text-lg">Contact</a></li>
                        <li><a href="/signup" className="text-white hover:text-gray-300 text-lg">Signup</a></li>
                        <li><a href="/login" className="text-white hover:text-gray-300 text-lg">Signin</a></li>
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
                                <li><a href="\" className="text-white text-xl" onClick={() => setIsMenuOpen(false)}>Home</a></li>
                                <li><a href="#about" className="text-white text-xl" onClick={() => setIsMenuOpen(false)}>About</a></li>
                                <li><a href="#product" className="text-white text-xl" onClick={() => setIsMenuOpen(false)}>Product</a></li>
                                <li><a href="#contact" className="text-white text-xl" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
                                <li><a href="/signup" className="text-white text-xl" onClick={() => setIsMenuOpen(false)}>Signup</a></li>
                                <li><a href="/login" className="text-white text-xl" onClick={() => setIsMenuOpen(false)}>Signin</a></li>
                            </ul>
                        </div>
                    </div>
                )}
            </header>
        </div>
    )
}

export default Navbar