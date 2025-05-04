'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      // Add your authentication logic here
      // Example: const response = await signIn(email, password)
      console.log('Signing in with:', { email, password })

      // Redirect on successful login
      router.push('/dashboard')
    } catch (err) {
      setError(err.message || 'Failed to sign in')
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
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 mt-16">
        <div className="bg-black/50 p-8 rounded-lg max-w-md w-full text-white">
          {error && (
            <div className="mb-4 p-2 bg-red-500 text-white rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder='yourmail@mail.com'
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded text-white border border-white/30"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder='***********'
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded text-white border border-white/30"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded transition duration-300"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p>
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-orange-400 hover:underline">
                Sign Up
              </Link>
            </p>
            <p>
              <Link href="/forgot-password" className="text-orange-400 hover:underline">
                Forgot Password?
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-black/50 bg-opacity-50 text-white py-4 text-center">
        <p>&copy; 2025 8 Horses. All rights reserved.</p>
      </footer>
    </div>
  )
}