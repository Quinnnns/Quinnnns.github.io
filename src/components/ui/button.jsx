// src/components/ui/button.jsx
export const Button = ({ children, ...props }) => {
  return (
    <button
      className="minimal-button"
      {...props}
    >
      {children}
    </button>
  )
}