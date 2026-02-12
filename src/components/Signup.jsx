import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Signup() {
    const [selectedRole, setSelectedRole] = useState('Student')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { signUp } = useAuth()

    const roles = ['Student', 'Teacher', 'Parent', 'Admin']

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        setIsLoading(true)

        try {
            const { data, error: signUpError } = await signUp(email, password, {
                full_name: fullName,
                role: selectedRole,
            })

            if (signUpError) {
                setError(signUpError.message)
                setIsLoading(false)
                return
            }

            setSuccess(true)
        } catch (err) {
            setError('An unexpected error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            {/* Main Container */}
            <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Left Side: Visual/Branding */}
                <div className="hidden lg:flex flex-col justify-between p-12 bg-blue-500 relative overflow-hidden">
                    <div className="relative z-10">
                        <Link to="/" className="flex items-center gap-2 mb-12">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                <span className="material-icons text-blue-500">school</span>
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">EduPulse</span>
                        </Link>
                        <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
                            Start your learning <br /> journey today.
                        </h1>
                        <p className="text-blue-100 text-lg max-w-sm">
                            Create your account and join thousands of students and educators on our platform.
                        </p>
                    </div>
                    <div className="relative z-10 mt-12">
                        <div className="flex -space-x-3">
                            <img
                                className="w-10 h-10 rounded-full border-2 border-blue-400"
                                alt="Student"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu4FFC_Ix4T7Xyx1CTrnEzAoJOC8hYsfkvSrznINXLOqNSThauAI8uY88Et6Rk-1B_Sr9_HvqXg0HG1T8cQVlkAmHl2F7FASI8Gi9bLDHgvZ9qlwnnBPEjVgBgUK-PuHG1YYRz5tXZHdO-VK7pZGBJoyApGH4wuev3SleEkRiabOAZPUbxZCd7P3PCb3dtl5Agfq_9Yiis1r7KKL2XWqyzCB6gb_VN09pkxYXxkM8q28JJNPZULwYmxXUe4A45xoeukDgxVHU7zi3C"
                            />
                            <img
                                className="w-10 h-10 rounded-full border-2 border-blue-400"
                                alt="Teacher"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_EraGsUhs-ql916sFY_K_Ehco_WOZPVAGlEoYyiroGgiJ73Hpe03u_rK0KM4K5wiR-Wd7nJQcG5GrnrWEmu34kBvoom6PGEpxXOJxKE3wXSwSZ_1f8tOvFwNobRnWZ72FAOEyVOtcBk_HLP1Nvx7GWrMWwyf8GEclAopoGjAsokMGQ2AAjC6j3IbGfRnKYtTjmLGjQRpv0U8HIpiKDZQXAGaKRjCue4IRHpqSCnAc4fqBtXwrcZ8BcU1JvOvVCgOGlVmvY0VvjYKs"
                            />
                            <img
                                className="w-10 h-10 rounded-full border-2 border-blue-400"
                                alt="Student"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoMroKApqzbNGEW7b9i-c-nx3HNPLGPB-alVhBvrmUYQUJg63nA0Yxvm0lc9T2nHgL_GE4iFfD10gGYCxjEcVOgPW4ALAB_V_q2rItEUw_ebd150nLpSB1TcplFMKm13Fv6_b1AjTu1aDXu4pK2SvNhpZhwdskdVLreT3wcuuNt4pH60KeLQnHO8J2v93ux72qyZkzYltrKKNFMAKY7DZDXjKkwaVcdA9LfwWnCqwK75shxLk7vxvrTacH2hM2C13ryVQVufQjFZIE"
                            />
                            <div className="w-10 h-10 rounded-full border-2 border-blue-400 bg-white/20 flex items-center justify-center text-xs font-bold text-white">
                                +2k
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-blue-100 font-medium italic">
                            Join over 2,000+ students and teachers today.
                        </p>
                    </div>
                    {/* Abstract Background Decorations */}
                    <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                </div>

                {/* Right Side: Signup Form */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                    {/* Mobile Header */}
                    <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                            <span className="material-icons text-white text-sm">school</span>
                        </div>
                        <span className="text-xl font-bold text-gray-800">EduPulse</span>
                    </Link>

                    {success ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="material-icons text-green-500 text-3xl">check_circle</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Check Your Email</h2>
                            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                                We've sent a confirmation link to <span className="font-semibold text-gray-700">{email}</span>. Please verify your email to activate your account.
                            </p>
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                            >
                                <span>Go to Sign In</span>
                                <span className="material-icons text-sm">arrow_forward</span>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                                <p className="text-gray-500">Fill in your details to get started with EduPulse.</p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                                    {error}
                                </div>
                            )}

                            {/* Role Selector */}
                            <div className="grid grid-cols-4 gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
                                {roles.map((role) => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => setSelectedRole(role)}
                                        className={`py-2 text-xs font-semibold rounded-md transition-all ${selectedRole === role
                                                ? 'bg-white text-blue-500 shadow-sm'
                                                : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>

                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="fullName">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                                            person_outline
                                        </span>
                                        <input
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all outline-none"
                                            id="fullName"
                                            name="fullName"
                                            placeholder="John Doe"
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="signup-email">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                                            mail_outline
                                        </span>
                                        <input
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all outline-none"
                                            id="signup-email"
                                            name="email"
                                            placeholder="name@school.edu"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="signup-password">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                                            lock_outline
                                        </span>
                                        <input
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all outline-none"
                                            id="signup-password"
                                            name="password"
                                            placeholder="Min. 6 characters"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="confirmPassword">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                                            lock_outline
                                        </span>
                                        <input
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all outline-none"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            placeholder="Re-enter your password"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3.5 rounded-lg transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Creating Account...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Create Account</span>
                                            <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Sign In Link */}
                            <p className="mt-8 text-center text-sm text-gray-500">
                                Already have an account?{' '}
                                <Link to="/login" className="font-semibold text-blue-500 hover:text-blue-600 hover:underline">
                                    Sign In
                                </Link>
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* Footer Copyright */}
            <div className="fixed bottom-6 text-gray-400 text-sm">
                © 2024 EduPulse Learning Systems. All rights reserved.
            </div>
        </div>
    )
}

export default Signup
