'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Navbar from '../components/Navbar'

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '3' // Default to Customer
    })
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        setIsSubmitting(true)

        try {
            // Add your registration logic here
            console.log('Signing up with:', formData)

            // Redirect after successful registration
            router.push('/dashboard')
        } catch (err) {
            setError(err.message || 'Registration failed')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{
                backgroundImage: "url('/images/1.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Header Section */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center p-4 mt-20">
                <div className="bg-black/50 p-8 rounded-lg max-w-md w-full text-white">
                    {error && (
                        <div className="mb-4 p-2 bg-red-500 text-white rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block mb-1">Full Name:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder='John Doe'
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded text-white border border-white/30"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-1">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder='yourmail@mail.com'
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded text-white border border-white/30"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-1">Password:</label>
                            <input
                                type="password"
                                id="password"
                                placeholder='***********'
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded text-white border border-white/30"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block mb-1">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder='***********'
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded text-white border border-white/30"
                            />
                        </div>

                        <div>
                            <label htmlFor="role" className="block mb-1">Role:</label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded text-white border border-white/30"
                            >
                                <option value="1" className='text-black'>Admin</option>
                                <option value="2" className='text-black'>Designer</option>
                                <option value="3" className='text-black'>Customer</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-2 px-4 rounded transition duration-300 mt-6 ${isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-orange-500 hover:bg-orange-600 text-white'
                                }`}
                        >
                            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p>
                            Already have an account?{' '}
                            <Link href="/login" className="text-orange-400 hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer Section */}
            <footer className="bg-black/50 text-white py-4 text-center">
                <p>&copy; 2025 8 Horses. All rights reserved.</p>
            </footer>
        </div>
    )
}