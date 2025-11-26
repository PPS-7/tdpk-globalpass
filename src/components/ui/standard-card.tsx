import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/*  
NOTE FOR FUTURE:  
This standardized card component ensures consistent sizing across all pages.
All cards will maintain equal height, width, padding, and styling.
*/

interface StandardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const StandardCard = React.forwardRef<HTMLDivElement, StandardCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "h-full flex flex-col items-start justify-between",
          "p-6 border rounded-xl shadow-sm",
          "hover:shadow-xl transition-all duration-300",
          "border-primary/10",
          className
        )}
        {...props}
      >
        {children}
      </Card>
    );
  }
);

StandardCard.displayName = "StandardCard";

export { StandardCard };
