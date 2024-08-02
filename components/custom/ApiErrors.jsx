export function ApiErrors({ error }) {
  if (!error?.message) return null
  return <div className="text-pink-500 text-md italic py-2 text-xs">{error.message}</div>
}