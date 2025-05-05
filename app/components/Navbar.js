'use client'
import { useState, useEffect } from 'react'
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const router = useRouter()
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token')
            if (!token) {
                setLoading(false)
                return
            }

            try {
                const response = await fetch(`http://localhost:3001/api/auth/session`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                const data = await response.json()
                if (response.ok) {
                    setUser(data.user)
                }
            } catch (error) {
                console.error('Auth check error:', error)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [pathname]) // Re-check auth when route changes

    const handleSignOut = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/auth/signout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })

            if (response.ok) {
                localStorage.removeItem('access_token')
                localStorage.removeItem('user')
                setUser(null)
                router.push('/login')
            }
        } catch (error) {
            console.error('Sign out error:', error)
        }
    }

    const navLinks = [
        { href: '/', text: 'Home' },
        { href: '#about', text: 'About' },
        { href: '#products', text: 'Products' },
        { href: '#contact', text: 'Contact' },
    ]

    const authLinks = user
        ? [
            { href: '/dashboard', text: 'Dashboard', icon: <FaUser className="mr-2" /> },
            { 
                action: handleSignOut, 
                text: 'Sign Out', 
                icon: <FaSignOutAlt className="mr-2" /> 
            }
        ]
        : [
            { href: '/signup', text: 'Sign Up' },
            { href: '/login', text: 'Sign In' }
        ]

    const isActive = (href) => pathname === href

    if (loading) return null // Or return a loading skeleton

    return (
        <header className="bg-[#3B141C] bg-opacity-90 py-4 fixed w-full z-50 shadow-md">
            <nav className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-white text-2xl font-bold hover:text-gray-300 transition">
                    8 Horses
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {/* Main Links */}
                    <ul className="flex space-x-6">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link 
                                    href={link.href}
                                    className={`text-white hover:text-gray-300 transition ${isActive(link.href) ? 'font-semibold border-b-2 border-orange-500' : ''}`}
                                >
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Auth Links */}
                    <div className="flex items-center space-x-4 ml-6">
                        {authLinks.map((link, index) => link.href ? (
                            <Link
                                key={index}
                                href={link.href}
                                className={`flex items-center px-4 py-2 rounded-md transition ${link.text === 'Sign Up' 
                                    ? 'bg-orange-600 text-white hover:bg-orange-700' 
                                    : 'text-white hover:bg-white/10'}`}
                            >
                                {link.icon && link.icon}
                                {link.text}
                            </Link>
                        ) : (
                            <button
                                key={index}
                                onClick={link.action}
                                className="flex items-center px-4 py-2 text-white hover:bg-white/10 rounded-md transition"
                            >
                                {link.icon && link.icon}
                                {link.text}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white text-2xl focus:outline-none"
                    onClick={() => setIsMenuOpen(true)}
                    aria-label="Open menu"
                >
                    <FaBars />
                </button>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden fixed inset-0 bg-black bg-opacity-95 z-50 overflow-y-auto">
                        <div className="container mx-auto px-4 py-8">
                            <div className="flex justify-between items-center mb-12">
                                <Link 
                                    href="/" 
                                    className="text-white text-2xl font-bold"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    8 Horses
                                </Link>
                                <button
                                    className="text-white text-2xl focus:outline-none"
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-label="Close menu"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            {/* Mobile Navigation Links */}
                            <ul className="space-y-6 mb-12">
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`block text-white text-xl py-3 ${isActive(link.href) ? 'font-semibold text-orange-400' : ''}`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* Mobile Auth Links */}
                            <div className="pt-6 border-t border-white/20">
                                {authLinks.map((link, index) => link.href ? (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className={`flex items-center text-white text-xl py-3 ${link.text === 'Sign Up' ? 'text-orange-400' : ''}`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.icon && <span className="mr-3">{link.icon}</span>}
                                        {link.text}
                                    </Link>
                                ) : (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            link.action()
                                            setIsMenuOpen(false)
                                        }}
                                        className="flex items-center text-white text-xl py-3 w-full"
                                    >
                                        {link.icon && <span className="mr-3">{link.icon}</span>}
                                        {link.text}
                                    </button>
                                ))}
                            </div>

                            {user && (
                                <div className="mt-8 pt-6 border-t border-white/20 text-white">
                                    <p className="flex items-center">
                                        <FaUser className="mr-3" />
                                        {user.email}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}