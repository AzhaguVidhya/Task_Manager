import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="flex items-center justify-between bg-white px-8 py-5 shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">
          Task Manager
        </h1>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="rounded-lg px-5 py-2 font-medium text-slate-700 hover:bg-slate-100"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          Plan better. Work smarter.
        </p>

        <h2 className="max-w-3xl text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
          Manage Your Tasks.
          <span className="text-blue-600"> Achieve Your Goals.</span>
        </h2>

        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
          Organize your daily tasks, set priorities, track deadlines,
          and stay productive in one place.
        </p>

        <Link
          to="/signup"
          className="mt-8 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700"
        >
          Start Managing Tasks →
        </Link>

        <div className="mt-16 grid w-full max-w-3xl gap-5 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="text-3xl">📝</div>
            <h3 className="mt-3 font-semibold text-slate-800">
              Create Tasks
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Add and organize your daily work.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="text-3xl">🎯</div>
            <h3 className="mt-3 font-semibold text-slate-800">
              Set Priorities
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Focus on what matters most.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="text-3xl">📅</div>
            <h3 className="mt-3 font-semibold text-slate-800">
              Track Deadlines
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Keep your tasks organized.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home