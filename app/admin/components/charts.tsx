'use client'

import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'

const COLORS = ['#22a366', '#fbbf24', '#f97316', '#3b82f6', '#8b5cf6', '#ec4899']

const tooltipStyle = {
  contentStyle: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: '#e2e8f0',
    fontSize: '13px',
  },
  labelStyle: { color: '#94a3b8' },
}

export function VisitorAreaChart({ data }: { data: { datum: string; besucher: number; seitenaufrufe: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="gradBesucher" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22a366" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#22a366" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradSeiten" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="datum" stroke="#64748b" fontSize={12} tickLine={false} />
        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
        <Area type="monotone" dataKey="besucher" name="Besucher" stroke="#22a366" fill="url(#gradBesucher)" strokeWidth={2} />
        <Area type="monotone" dataKey="seitenaufrufe" name="Seitenaufrufe" stroke="#3b82f6" fill="url(#gradSeiten)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function TrafficSourcesBar({ data }: { data: { quelle: string; besucher: number; anteil: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
        <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} />
        <YAxis type="category" dataKey="quelle" stroke="#94a3b8" fontSize={12} tickLine={false} width={130} />
        <Tooltip {...tooltipStyle} />
        <Bar dataKey="besucher" name="Besucher" fill="#22a366" radius={[0, 4, 4, 0]} barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function DevicePieChart({ data }: { data: { geraet: string; anteil: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          dataKey="anteil"
          nameKey="geraet"
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={3}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip {...tooltipStyle} formatter={(value) => `${value}%`} />
        <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function KeywordTrendChart({ data }: { data: Record<string, unknown>[] }) {
  const keywords = Object.keys(data[0] || {}).filter(k => k !== 'woche')
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="woche" stroke="#64748b" fontSize={12} tickLine={false} />
        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} reversed domain={[1, 'auto']} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
        {keywords.map((kw, i) => (
          <Line key={kw} type="monotone" dataKey={kw} stroke={COLORS[i % COLORS.length]} strokeWidth={2} dot={{ r: 4 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export function SeaSpendChart({ data }: { data: { datum: string; ausgaben: number; conversions: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="datum" stroke="#64748b" fontSize={12} tickLine={false} />
        <YAxis yAxisId="left" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
        <Bar yAxisId="left" dataKey="ausgaben" name="Ausgaben (€)" fill="#f97316" radius={[4, 4, 0, 0]} barSize={30} />
        <Bar yAxisId="right" dataKey="conversions" name="Conversions" fill="#22a366" radius={[4, 4, 0, 0]} barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  )
}
