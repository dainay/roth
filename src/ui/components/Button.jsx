import s from './Button.module.scss'

export default function Button({  className = '', children, active, onClick,  ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={typeof active === 'boolean' ? active : undefined}
      className={`${s.button} ${active ? s.active : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
