# Solution ΓÇö Design Intentional UX States

> **Instructor reference only.** Do not share with students before submission.

---

## Running the App

```bash
npm install
npm run dev
```

Change `SIMULATE` in `src/mockApi.js` to test each state:

| Value | State shown |
|-------|------------|
| `'loading'` | Γæá Animated shimmer skeleton rows |
| `'success'` | Γæí Full orders table with 8 rows |
| `'empty'`   | Γæó Illustrated empty state + CTA button |
| `'error'`   | Γæú Error card with real message + Retry button |

---

## What Was Implemented

### Γæá Loading State (`SkeletonRow`)
- 6 animated shimmer rows with staggered animation delays
- Each skeleton column matches the real column width ΓÇö sets layout expectations
- Shimmer direction left ΓåÆ right via CSS `background-position` animation

### Γæí Success State (`OrderRow`)
- Per-row component for clean separation
- `STATUS_CONFIG` object maps status ΓåÆ color/bg/dot (no long switch statements)
- Hover background transition for interactivity feel

### Γæó Empty State (`EmptyState`)
- Circular illustrated icon with amber dashed border
- Clear heading + explanatory copy telling the user *why* and *what to do*
- Primary CTA button ("Create First Order") + secondary link
- No generic "No data found" ΓÇö contextual and actionable

### Γæú Error State (`ErrorState`)
- Real error message displayed in a `monospace` styled code pill
- Two actions: **"Try Again"** (calls `onRetry`) + **"Contact Support"**
- Fallback guidance paragraph at the bottom

### State indicator dot (bonus)
- Top-right corner of the table panel shows a live state indicator
- Pulses amber during loading, green on success, red on error

---

## Architecture Notes

The conditional logic is extracted into a single `renderTableBody()` function that returns JSX based on `loading ΓåÆ error ΓåÆ empty ΓåÆ success`. This keeps the JSX template clean and each state isolated in its own component.

```js
const renderTableBody = () => {
  if (loading)          return <SkeletonRows />
  if (error)            return <ErrorState ... />
  if (orders.length===0) return <EmptyState />
  return orders.map(o => <OrderRow ... />)
}
```
