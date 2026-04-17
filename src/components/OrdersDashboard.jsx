//  SOLUTION ΓÇö Design Intentional UX States
//  FILE: src/components/OrdersDashboard.jsx
//
//  All four UX states are fully implemented:
//
//   LOADING  ΓÇö Animated shimmer skeleton rows
//   SUCCESS  ΓÇö Full order table with status badges
//   EMPTY    ΓÇö Illustrated empty state with CTA
//   ERROR    ΓÇö Friendly error card with working Retry button
//
//  Each state is in its own focused sub-component so the
//  conditional rendering logic in the main component stays
//  clean and readable.

import { useState, useEffect } from 'react'
import { fetchOrders } from '../mockApi'

//  LOADING ΓÇö SkeletonRow
//  Mirrors the exact columns and spacing of a real OrderRow.
//  This "content skeleton" technique tells the user the page
//  is loading AND sets expectations about what's coming.
function SkeletonRow() {
  return (
    <tr>
      {[48, 140, 190, 80, 88, 90].map((w, i) => (
        <td key={i} style={{ padding: '16px 20px' }}>
          <div style={{
            width: w,
            height: 13,
            borderRadius: 6,
            background: 'linear-gradient(90deg, var(--surface-2) 25%, var(--border) 50%, var(--surface-2) 75%)',
            backgroundSize: '200% 100%',
            animation: `shimmer 1.4s infinite ${i * 0.08}s`,
          }} />
        </td>
      ))}
    </tr>
  )
}

//  SUCCESS ΓÇö OrderRow
//  Each row is its own component for clean separation.
//  Status badges use a config object to avoid long switch chains.
const STATUS_CONFIG = {
  Delivered:  { color: '#10b981', bg: 'rgba(16,185,129,0.12)',  dot: '#10b981' },
  Shipped:    { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',  dot: '#3b82f6' },
  Processing: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', dot: '#f59e0b' },
  Pending:    { color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', dot: '#8b5cf6' },
  Cancelled:  { color: '#ef4444', bg: 'rgba(239,68,68,0.12)',  dot: '#ef4444' },
}

function OrderRow({ order }) {
  const s = STATUS_CONFIG[order.status] || STATUS_CONFIG.Pending

  return (
    <tr
      style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.15s' }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <td style={{ padding: '15px 20px', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--accent)', fontWeight: 500 }}>
        {order.id}
      </td>
      <td style={{ padding: '15px 20px', color: 'var(--text-primary)', fontWeight: 500 }}>
        {order.customer}
      </td>
      <td style={{ padding: '15px 20px', color: 'var(--text-secondary)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {order.product}
      </td>
      <td style={{ padding: '15px 20px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--mono)', fontSize: 13 }}>
        Γé╣{order.amount.toLocaleString()}
      </td>
      <td style={{ padding: '15px 20px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: s.bg, color: s.color, padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot }} />
          {order.status}
        </span>
      </td>
      <td style={{ padding: '15px 20px', color: 'var(--text-muted)', fontSize: 13 }}>
        {order.date}
      </td>
    </tr>
  )
}

//  EMPTY STATE
//  Not just a blank table ΓÇö this state explains *why* there's
//  nothing and gives the user a clear next step (CTA).
//  The illustration uses CSS shapes so no image assets are needed
function EmptyState() {
  return (
    <tr>
      <td colSpan={6}>
        <div style={{ padding: '72px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, textAlign: 'center' }}>

          {/* Illustration */}
          <div style={{ position: 'relative', width: 96, height: 96, marginBottom: 24 }}>
            <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'rgba(245,158,11,0.08)', border: '1px dashed rgba(245,158,11,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: 40 }}>≡ƒô¡</div>
            </div>
            {/* Orbiting dot */}
            <div style={{
              position: 'absolute', top: 4, right: 8,
              width: 14, height: 14, borderRadius: '50%',
              background: 'var(--surface-2)', border: '2px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 8,
            }}>Γ£¿</div>
          </div>

          <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, letterSpacing: '-0.3px' }}>
            No orders yet
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 340, lineHeight: 1.7, fontSize: 14, marginBottom: 28 }}>
            Orders will appear here once customers start purchasing.
            You can also create a manual order to get started.
          </p>

          {/* CTA */}
          <button style={{
            padding: '11px 28px',
            background: 'var(--accent)',
            color: '#000',
            border: 'none',
            borderRadius: 'var(--radius)',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'opacity 0.15s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            + Create First Order
          </button>

          {/* Secondary link */}
          <button style={{ marginTop: 14, background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}>
            Learn how orders work ΓåÆ
          </button>
        </div>
      </td>
    </tr>
  )
}

//  ERROR STATE
//  Shows the real error message (not just a generic "oops"),
//  gives the user a working Retry button, and has a secondary
//  support link ΓÇö so the user always has a path forward.
function ErrorState({ message, onRetry }) {
  return (
    <tr>
      <td colSpan={6}>
        <div style={{ padding: '72px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, textAlign: 'center' }}>

          {/* Icon */}
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, marginBottom: 20,
          }}>
            ≡ƒöî
          </div>

          <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, letterSpacing: '-0.3px' }}>
            Couldn't load orders
          </h3>

          {/* Real error message in a code-style pill */}
          <div style={{
            background: 'rgba(239,68,68,0.06)',
            border: '1px solid rgba(239,68,68,0.15)',
            borderRadius: 8,
            padding: '10px 18px',
            marginBottom: 28,
            maxWidth: 420,
          }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: '#ef4444', lineHeight: 1.6 }}>
              {message}
            </span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={onRetry}
              style={{
                padding: '11px 28px',
                background: 'var(--text-primary)',
                color: 'var(--bg)',
                border: 'none',
                borderRadius: 'var(--radius)',
                fontSize: 14, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Γå╗ Try Again
            </button>
            <button style={{
              padding: '11px 28px',
              background: 'transparent',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              fontSize: 14, fontWeight: 500, cursor: 'pointer',
            }}>
              Contact Support
            </button>
          </div>

          <p style={{ marginTop: 24, fontSize: 12, color: 'var(--text-muted)' }}>
            If this keeps happening, check your network connection or try again later.
          </p>
        </div>
      </td>
    </tr>
  )
}

//  MAIN COMPONENT
export default function OrdersDashboard() {
  const [orders,  setOrders]  = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const loadOrders = () => {
    setLoading(true)
    setError(null)
    setOrders([])

    fetchOrders()
      .then(data => {
        setOrders(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }

  useEffect(() => { loadOrders() }, [])

  const totalRevenue = orders.reduce((s, o) => s + (o.status !== 'Cancelled' ? o.amount : 0), 0)
  const delivered    = orders.filter(o => o.status === 'Delivered').length
  const pending      = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length

  // ΓöÇΓöÇ Render table body based on current state ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
  const renderTableBody = () => {
    // Loading ΓÇö show 6 skeleton rows
    if (loading) {
      return Array.from({ length: 6 }, (_, i) => <SkeletonRow key={i} />)
    }

    // Error ΓÇö show error card with retry
    if (error) {
      return <ErrorState message={error} onRetry={loadOrders} />
    }

    // Empty ΓÇö show empty state with CTA
    if (orders.length === 0) {
      return <EmptyState />
    }

    // Success ΓÇö map orders to rows
    return orders.map(order => <OrderRow key={order.id} order={order} />)
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px' }}>

      {/* Page header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ width: 38, height: 38, background: 'var(--accent)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>≡ƒôª</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>Orders</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Manage and track all customer orders in one place.</p>
        </div>
        <button onClick={loadOrders} style={{
          padding: '10px 20px', background: 'var(--accent)', color: '#000',
          border: 'none', borderRadius: 'var(--radius)', fontSize: 14,
          fontWeight: 600, cursor: 'pointer',
        }}>
          Γå╗ Refresh
        </button>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Total Revenue',   value: loading ? 'ΓÇö' : `Γé╣${totalRevenue.toLocaleString()}`, icon: '≡ƒÆ░', color: 'var(--accent)'  },
          { label: 'Delivered',       value: loading ? 'ΓÇö' : delivered,                            icon: 'Γ£à', color: 'var(--green)'  },
          { label: 'Needs Attention', value: loading ? 'ΓÇö' : pending,                              icon: 'ΓÅ│', color: 'var(--purple)' },
        ].map((card, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px 28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>{card.label}</span>
              <span style={{ fontSize: 20 }}>{card.icon}</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, color: card.color, fontFamily: 'var(--mono)' }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Orders table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>
            Recent Orders
            {!loading && !error && (
              <span style={{ marginLeft: 10, fontSize: 13, color: 'var(--text-muted)', fontWeight: 400 }}>
                {orders.length} {orders.length === 1 ? 'order' : 'orders'}
              </span>
            )}
          </h2>
          {/* Live state indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: loading ? 'var(--accent)' : error ? 'var(--red)' : 'var(--green)',
              animation: loading ? 'pulse 1.2s infinite' : 'none',
            }} />
            {loading ? 'loading' : error ? 'error' : orders.length === 0 ? 'empty' : 'success'}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 20px', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {renderTableBody()}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0 }
          100% { background-position:  200% 0 }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1 }
          50%       { opacity: 0.3 }
        }
      `}</style>
    </div>
  )
}
