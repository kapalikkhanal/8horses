'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FaLock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { supabase } from '@/utils/supabase.js'

export default function ChangePassword() {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [recoveryMode, setRecoveryMode] = useState(false)

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'PASSWORD_RECOVERY') {
                setRecoveryMode(true)
            }
        })

        return () => {
            authListener?.subscription?.unsubscribe()
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        setLoading(true)

        const { error } = await supabase.auth.updateUser({ password })

        try {
            if (error) {
                setError(error.message)
            } else {
                setSuccess('Password updated successfully!')
                setTimeout(() => {
                    router.push('/login')
                }, 2000)
            }

            setLoading(false)
        } catch (err) {
            setError(err.message || 'Failed to change password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white text-black p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="text-center mb-6">
                    <FaLock className="mx-auto text-4xl text-blue-500 mb-4" />
                    <h1 className="text-2xl font-bold text-gray-800">
                        {recoveryMode ? 'Reset Your Password' : 'Change Password'}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {recoveryMode
                            ? 'Enter your new password below'
                            : 'Please enter your current and new password'}
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
                        <FaTimesCircle className="mr-2" />
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md flex items-center">
                        <FaCheckCircle className="mr-2" />
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter new password"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirm new password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-md text-white font-medium ${loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {loading ? 'Processing...' : 'Change Password'}
                    </button>
                </form>

                {!recoveryMode && (
                    <div className="mt-4 text-center text-sm text-gray-600">
                        <Link href="/forgot-password" className="text-blue-600 hover:underline">
                            Forgot your password?
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}