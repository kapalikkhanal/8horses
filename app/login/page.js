'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Navbar from '../components/Navbar'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Basic client-side validation
    if (!email || !password) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`http://localhost:3001/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // Store the session token (consider using httpOnly cookies for production)
      if (data.session?.access_token) {
        localStorage.setItem('access_token', data.session.access_token)
      }

      // Store user data if needed
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user))
      }

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (err) {
      setError(err.message || 'Failed to sign in')
    } finally {
      setIsLoading(false)
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
          <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
          
          {error && (
            <div className="mb-4 p-2 bg-red-500 text-white rounded text-center">
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
                className="w-full px-4 py-2 rounded text-white border border-white/30 bg-black/50"
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
                minLength={6}
                className="w-full px-4 py-2 rounded text-white border border-white/30 bg-black/50"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded transition duration-300 ${
                isLoading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-orange-400 hover:underline">
                Sign Up
              </Link>
            </p>
            <p className="text-sm">
              <Link href="/login/forgot-password" className="text-orange-400 hover:underline">
                Forgot Password?
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