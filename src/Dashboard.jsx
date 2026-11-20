import { useState,useEffect } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, ListTodo, CalendarDays, Settings, Search, Bell, LogOut, Sun,
  Moon} from "lucide-react";
import StatCard from './Components/StatCard'
import Tasks from './Pages/Tasks'
import Calendar from './Pages/Calendar'
import Setting from './Pages/Setting'
function Dashboard()
{
  const navigate=useNavigate()
  const location = useLocation()
  const activePage =
  location.pathname === "/dashboard"
    ? "Dashboard"
    : location.pathname === "/dashboard/tasks"
      ? "My Tasks"
      : location.pathname === "/dashboard/calendar"
        ? "Calendar"
        : "Settings";

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('task-manager-pro')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [theme, setTheme] = useState(
  () => localStorage.getItem("task-manager-theme") || "Light");
  const isDark = theme === "Dark";
  useEffect(() => {
    localStorage.setItem("task-manager-theme", theme);
  }, [theme]);
  useEffect(() => {
    localStorage.setItem('task-manager-pro', JSON.stringify(tasks))
  }, [tasks])
  
  useEffect(() => {
    function loadTasks() {
      const savedTasks = localStorage.getItem('task-manager-pro')
      setTasks(savedTasks ? JSON.parse(savedTasks) : [])
    }
    window.addEventListener('storage', loadTasks)

    return () => window.removeEventListener('storage', loadTasks)
  }, [])
  const totalTasks = tasks.length

  const pendingTasks = tasks.filter(
    (task) => task.status === 'Pending'
  ).length

  const inProgressTasks = tasks.filter(
    (task) => task.status === 'In Progress'
  ).length

  const completedTasks = tasks.filter(
    (task) => task.status === 'Completed'
  ).length
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "My Tasks", icon: ListTodo },
    { name: "Calendar", icon: CalendarDays },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div
    className={`min-h-screen md:flex ${
      isDark
        ? "bg-gray-950 text-white"
        : "bg-gray-100 text-gray-800"
    }`}
  >
      {/* Sidebar */}
     <div className="flex">
     <aside className="fixed left-0 top-0 z-20 h-screen w-64 overflow-y-auto bg-slate-900 p-5 text-white">
      
        <div className="mb-8 flex items-center justify-between gap-2">
          <h1 className="text-2xl font-bold">Task Flow</h1>

          <button
            onClick={() =>
              setTheme((prev) => (prev === "Light" ? "Dark" : "Light"))
            }
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle theme"
            className="rounded-lg bg-slate-800 p-2 text-white transition hover:bg-slate-700"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        <div className="h-180 flex flex-col justify-between">
        <nav className="flex flex-wrap gap-2 md:flex-col">
          {menuItems.map((item) => {
              const Icon = item.icon;

              const path =
                item.name === "Dashboard"
                  ? "/dashboard"
                  : `/dashboard/${item.name
                      .toLowerCase()
                      .replace("my tasks", "tasks")}`;

              return (
                <NavLink
                  key={item.name}
                  to={path}
                  end={item.name === "Dashboard"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 w-full rounded-lg px-4 py-3 text-left transition ${
                      isActive
                        ? "bg-teal-600 text-white"
                        : "text-slate-300 hover:bg-slate-800"
                    }`
                  }
                >
                  <Icon size={20} /> {item.name}
                </NavLink>
              );
            })}
        </nav>
        <button
          onClick={() => {
            localStorage.removeItem("task-manager-user");
            navigate("/login");
          }}
          className="mt-6 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-red-300 transition hover:bg-slate-800"
        >
          <LogOut size={20} />
          Logout
        </button>
        </div>
      </aside>
      </div>
      {/* Main Content */}
      <main className={`ml-64 min-w-0 flex-1 p-5 md:p-8 ${
          isDark ? "bg-gray-900 text-black" : "bg-gray-100 text-gray-800"
        }`}>
        {/* Navbar */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4"  >
            <div>
            <h2 className={`text-2xl font-bold ${
            isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
          }`}>{activePage}</h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label="Search"
              className="rounded-lg bg-white p-3 shadow-sm"
            >
              <Search size={20} />
            </button>
            <button
              aria-label="Notifications"
              className="rounded-lg bg-white p-3 shadow-sm"
            >
              <Bell size={20} />
            </button>
          </div>
        </header>
        {activePage === "My Tasks" ? (
          <Tasks tasks={tasks} setTasks={setTasks} isDark={isDark}/>
        ) : activePage==="Calendar" ? ( <Calendar tasks={tasks} isDark={isDark}/> ):
          activePage==="Settings" ? (<Setting isDark={isDark}/>): (
          <>
            {/* Dashboard Heading */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Total Tasks"
                count={totalTasks}
                subtitle="All your tasks"
                color="text-blue-600"
              />

              <StatCard
                title="Pending"
                count={pendingTasks}
                subtitle="Tasks to start"
                color="text-amber-600"
              />

              <StatCard
                title="In Progress"
                count={inProgressTasks}
                subtitle="Currently working"
                color="text-purple-600"
              />

              <StatCard
                title="Completed"
                count={completedTasks}
                subtitle="Tasks finished"
                color="text-green-600"
              />
            </div>
              <div className={`mb-6 mt-10 flex flex-wrap items-center justify-between gap-3  ${isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
              <div>
                <h3 className="text-xl font-bold">Overview</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Track your tasks and stay productive.
                </p>
              </div>

              <button
                onClick={() => navigate("/dashboard/tasks")}
                className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-3 font-medium text-white hover:bg-teal-700"
              >
                View My Tasks
              </button>
            </div>

            {/*Recent Tasks */}
            <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-bold">Recent Tasks</h3>
                <span className="text-sm text-gray-500">{tasks.length} task</span>
              </div>
              <div className="space-y-4">
                {tasks.length === 0 ? (
                  <p className="py-6 text-center text-gray-500">
                    No tasks yet. Add your first task!
                  </p>
                  ) : (
                    [...tasks].reverse().slice(0, 5).map((task) => (
                    <div
                      key={task.id}
                      className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="mt-1 text-sm text-gray-500">
                          Priority: {task.priority || "Medium"}
                          {task.dueDate ? ` · Due: ${task.dueDate}` : ""}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          task.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : task.status === "Pending"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                  ))
)}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
