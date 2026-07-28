
export default function Button({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={active ? 'button active' : 'button'}
    >
      {children}
    </button>
  )
}