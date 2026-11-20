import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  function handleLogin(e) {
    e.preventDefault()
    setError('')

    const savedUsers = JSON.parse(
      localStorage.getItem('task-manager-users') || '[]'
    )

    const user = savedUsers.find(
      (user) =>
        user.email === email.trim().toLowerCase() &&
        user.password === password
    )

    if (!user) {
      setError('Invalid email or password')
      return
    }

    localStorage.setItem(
      'task-manager-user',
      JSON.stringify({
        name: user.name,
        email: user.email,
      })
    )

    navigate('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <Link to="/" className="text-sm font-medium text-blue-600 hover:underline">
          ← Back to Home
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          Welcome Back!
        </h1>

        <p className="mt-2 text-slate-500">
          Login to manage your tasks.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login