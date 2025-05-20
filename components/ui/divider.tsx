import { cn } from "@/lib/utils"

interface DividerProps {
  text?: string
  className?: string
}

export function Divider({ text, className }: DividerProps) {
  return (
    <div className={cn("relative flex items-center py-4", className)}>
      <div className="flex-grow border-t border-border"></div>
      {text && <span className="mx-3 flex-shrink text-xs text-muted-foreground">{text}</span>}
      <div className="flex-grow border-t border-border"></div>
    </div>
  )
}
