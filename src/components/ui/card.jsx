// src/components/ui/card.jsx
export const Card = ({ children }) => (
  <div className="minimal-card">{children}</div>
)

export const CardHeader = ({ children }) => (
  <div className="p-4 border-b border-border">{children}</div>
)

export const CardTitle = ({ children }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
)

export const CardDescription = ({ children }) => (
  <p className="text-sm text-muted-foreground">{children}</p>
)

export const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
)