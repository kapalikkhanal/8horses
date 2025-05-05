'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/app/components/Navbar'
import LoadingSpinner from '@/app/components/LoadingSpinner'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const validateSession = async () => {
      try {
        // 1. Check if we have an access token
        const token = localStorage.getItem('access_token')
        if (!token) {
          throw new Error('No authentication token found')
        }

        // 2. Verify the token with the backend
        const response = await fetch(`http://localhost:3001/api/auth/session`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Session validation failed')
        }

        // 3. If valid, set the user data
        setUser(data.user)
      } catch (error) {
        console.error('Session validation error:', error)
        // Clear any existing auth data
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
        // Redirect to login
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    validateSession()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!user) {
    return null // The useEffect will handle the redirect
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Dashboard Navbar */}
      <Navbar user={user} />

      {/* Main Dashboard Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome back, {user.name}!</h1>
          
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Your Profile</h2>
              <p className="text-blue-600 mb-4">Email: {user.email}</p>
              <p className="text-blue-600">Role: {getRoleName(user.role)}</p>
            </div>

            {/* Card 2 */}
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <h2 className="text-xl font-semibold text-green-800 mb-2">Recent Activity</h2>
              <p className="text-green-600">Last login: {new Date().toLocaleDateString()}</p>
            </div>

            {/* Card 3 */}
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
              <h2 className="text-xl font-semibold text-purple-800 mb-2">Quick Actions</h2>
              <button 
                onClick={() => router.push('/profile')}
                className="bg-purple-100 text-purple-700 px-4 py-2 rounded-md hover:bg-purple-200 transition"
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>&copy; 2025 8 Horses. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

// Helper function to display role names
function getRoleName(roleId) {
  switch(roleId) {
    case 1: return 'Admin'
    case 2: return 'Designer'
    case 3: return 'Customer'
    default: return 'User'
  }
}