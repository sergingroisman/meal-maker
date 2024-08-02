const IF = ({ condition, children }) => {
  if (condition) return children
  return null
}

export default IF