function StatCard({ title, count, subtitle, color }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>

      <h3 className="mt-3 text-3xl font-bold">
        {count}
      </h3>

      <p className={`mt-2 text-sm ${color}`}>
        {subtitle}
      </p>
    </div>
  )
}

export default StatCard