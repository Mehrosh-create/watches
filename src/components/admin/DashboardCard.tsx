'use client'

interface DashboardCardProps {
  title: string
  value: string
  icon: string
  trend: 'up' | 'down' | 'neutral'
}

export default function DashboardCard({ title, value, icon, trend }: DashboardCardProps) {
  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500'
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className={`mt-4 flex items-center ${trendColors[trend]}`}>
        {trend === 'up' && (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
          </svg>
        )}
        {trend === 'down' && (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        )}
        <span className="text-sm font-medium">
          {trend === 'up' && 'Increased'}
          {trend === 'down' && 'Decreased'}
          {trend === 'neutral' && 'No change'} today
        </span>
      </div>
    </div>
  )
}