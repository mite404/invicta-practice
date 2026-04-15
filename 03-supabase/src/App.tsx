import TaskDashboard from './components/TaskDashboard'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Real-time Task Dashboard</h1>
          <p className="text-gray-600">Connected to Supabase. Tasks update in real-time across all clients.</p>
        </header>

        <TaskDashboard />
      </div>
    </div>
  )
}
