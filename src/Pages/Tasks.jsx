import { useEffect, useState } from 'react'
import { Plus, Trash2, Check , Pencil,AlertCircle } from 'lucide-react'

function Tasks({tasks,setTasks}) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [editId,setEditId]=useState(null);
  const [status, setStatus] = useState('Pending');
  const [dueDate, setDueDate] = useState('');
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [toast, setToast] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterPriority, setFilterPriority] = useState('All');
  const [subtaskInput, setSubtaskInput] = useState('')
  const [subtasks, setSubtasks] = useState([])

  useEffect(() => {
    localStorage.setItem('task-manager-pro', JSON.stringify(tasks))
  }, [tasks])

  function showToast(message) {
    setToast(message)
    setTimeout(() => 
    {
      setToast('')
    }, 3000)
  }
function addSubtask() {
  if (!subtaskInput.trim()) {
    showToast('Please enter a subtask!')
    return
  }

  const newSubtask = {
    id: Date.now(),
    title: subtaskInput.trim(),
    completed: false,
  }

  setSubtasks((prev) => [...prev, newSubtask])
  setSubtaskInput('')
}
  function addTask(e) {
     e.preventDefault()
     if (!title.trim()) {
        showToast('Please enter a task title!')
     return
    }
    if (editId !== null) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editId
            ? { ...task, title: title.trim(), priority, dueDate ,status,subtasks}
            : task
        )
      )
      setEditId(null)
    } 
    else {
      const newTask = {
        id: Date.now(),
        title: title.trim(),
        status: 'Pending',
        priority,
        dueDate,
        subtasks
      }

      setTasks((prevTasks) => [...prevTasks, newTask])
    }
    showToast(editId !== null ? 'Task updated successfully!' : 'Task added successfully!')
    setTitle('')
    setPriority('Medium')
    setDueDate('')
    setStatus('Pending')
    setSubtasks([])
    setSubtaskInput('')     
  }
  function editTask(task) {
    setEditId(task.id)
    setTitle(task.title)
    setPriority(task.priority || 'Medium')
    setDueDate(task.dueDate || '')
    setStatus(task.status || 'Pending')
    setSubtasks(task.subtasks || [])
    
  }
  function cancelEdit() {
  setEditId(null)
  setTitle('')
  setPriority('Medium')
  setDueDate('')
  setStatus('Pending')
  setSubtasks([])
  setSubtaskInput('')
}
  function completeTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === 'Completed' ? 'Pending' : 'Completed',
            }
          : task
      )
    )
    showToast('Task status updated!')
  }

  function deleteTask(id) {
  const confirmed = window.confirm(
    'Are you sure you want to delete this task?'
  )

  if (!confirmed) return

  setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  showToast('Task deleted successfully!')
}
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesStatus = filterStatus === 'All' || task.status === filterStatus

    const matchesPriority =
      filterPriority === 'All' || (task.priority || 'Medium') === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })
    const sortedTasks = [...filteredTasks].sort((a, b) => {
   if (sortBy === 'dueDate') {
    if (!a.dueDate) return 1
    if (!b.dueDate) return -1
    return a.dueDate.localeCompare(b.dueDate)
  }

  if (sortBy === 'priority') {
    const priorityOrder = {
      High: 1,
      Medium: 2,
      Low: 3,
    }

    return (
      (priorityOrder[a.priority || 'Medium'] || 2) -
      (priorityOrder[b.priority || 'Medium'] || 2)
    )
  }

  return 0
})
  return (
    <>
    {toast 
      && 
      (
        <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-green-600 px-6 py-4 text-white shadow-lg">
          {toast}
        </div>
    )}
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold">My Tasks</h2>

      <form onSubmit={addTask} className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a task..."
          className="min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600"
        />
        {/* Subtask Input */}
        <div className="w-full basis-full">
          <label className="mb-2 block font-medium">
            Subtasks
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={subtaskInput}
              onChange={(e) => setSubtaskInput(e.target.value)}
              placeholder="Enter a subtask"
              className="flex-1 rounded-lg border p-2"
            />

            <button
              type="button"
              onClick={addSubtask}
              className="rounded-lg bg-teal-600 px-4 text-white"
            >
              <Plus size={18} />
            </button>
          </div>
        {/* Subtask Preview */}
        <div className="mt-3 space-y-2">
          {subtasks.map((subtask) => (
            <div
              key={subtask.id}
              className="flex items-center gap-2 rounded-lg bg-gray-100 p-2"
            >
              <span>{subtask.title}</span>
            </div>
          ))}
        </div>
      </div>
        <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-3"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          {editId !== null && (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-3"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        )}
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-3"
          />
        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-3 text-white hover:bg-teal-700"
        >
          <Plus size={18} />
          {editId !== null ? 'Update Task' : 'Add Task'}
        </button>
        {editId !== null && (
          <button
            type="button"
            onClick={cancelEdit}
            className="rounded-lg bg-gray-200 px-4 py-3 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
      </form> 
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-3"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-3"
        >
          <option value="All">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-3"
          >
            <option value="default">Sort By</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
      </div>
      {filteredTasks.length === 0 ? (
       <p className="py-8 text-center text-gray-500">
          No matching tasks found.
        </p>
      ) : (
        <div className="space-y-3">
          {sortedTasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 p-4"
            >
              <div>
                <p className={`font-medium ${task.status === 'Completed' ? 'text-gray-400 line-through' : ''}`}>
                  {task.title}
                </p>
                {/* Subtask Progress */}
                {(task.subtasks || []).length > 0 && (
                  <div className="mt-3 w-full max-w-md">
                    <p className="mb-2 text-sm text-gray-500">
                      {task.subtasks.filter((s) => s.completed).length}/
                      {task.subtasks.length} completed
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-3 h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-teal-600 transition-all"
                        style={{
                          width: `${
                            (task.subtasks.filter((s) => s.completed).length /
                              task.subtasks.length) *
                            100
                          }%`,
                        }}
                      />
                    </div>

                    {/* Checklist */}
                    <div className="space-y-2">
                      {task.subtasks.map((subtask) => (
                        <label
                          key={subtask.id}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={subtask.completed}
                            onChange={() => {
                              setTasks((prevTasks) =>
                                prevTasks.map((t) =>
                                  t.id === task.id
                                    ? {
                                        ...t,
                                        subtasks: (t.subtasks || []).map((s) =>
                                          s.id === subtask.id
                                            ? { ...s, completed: !s.completed }
                                            : s
                                        ),
                                      }
                                    : t
                                )
                              )
                            }}
                          />

                          <span
                            className={
                              subtask.completed
                                ? "text-gray-400 line-through"
                                : "text-gray-700"
                            }
                          >
                            {subtask.title}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                  <p className={`mt-1 inline-block rounded-md px-2 py-1 text-sm font-medium ${
                    (task.priority || 'Medium') === 'High'
                      ? 'bg-red-100 text-red-700'
                      : (task.priority || 'Medium') === 'Medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                  }`}>
                    {task.priority || 'Medium'} Priority
                  </p>

                    {task.dueDate && (
                      <p
                        className={`mt-2 flex items-center gap-1 text-sm font-medium ${
                          task.status !== 'Completed' &&
                          task.dueDate < new Date().toLocaleDateString('en-CA')
                            ? 'text-red-600'
                            : 'text-gray-500'
                        }`}
                      >
                      {task.dueDate < new Date().toLocaleDateString('en-CA') &&
                      task.status !== 'Completed' ? (
                        <>
                          <AlertCircle size={16} />
                          Due: {task.dueDate} — Overdue!
                        </>
                      ) : (
                        <>Due: {task.dueDate}</>
                      )}
                    </p>
                  )}
            </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => editTask(task)}
                  aria-label="Edit task"
                  title="Edit Task"
                  className="rounded-lg bg-blue-100 p-2 text-blue-700 hover:bg-blue-200"
                >
                  <Pencil size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => completeTask(task.id)}
                  aria-label="Toggle task status"
                  title="Task Status"
                  className="rounded-lg bg-green-100 p-2 text-green-700 hover:bg-green-200"
                >
                  <Check size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  aria-label="Delete task"
                  title="Delete Task"
                  className="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
    </>
  )
}

export default Tasks