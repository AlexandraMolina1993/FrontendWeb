import type { ReactNode } from "react";

import { Inbox } from "lucide-react";

import {
  emptyStateActionStyle,
  emptyStateContainerStyle,
  emptyStateDescriptionStyle,
  emptyStateIconStyle,
  emptyStateTitleStyle,
} from "../../shared/styles/empty-state.styles.js";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`${emptyStateContainerStyle} ${className}`}>
      <div className={emptyStateIconStyle} aria-hidden="true">
        {icon ?? <Inbox size={26} />}
      </div>
      <h3 className={emptyStateTitleStyle}>{title}</h3>
      {description && (
        <p className={emptyStateDescriptionStyle}>{description}</p>
      )}
      {action && <div className={emptyStateActionStyle}>{action}</div>}
    </div>
  );
}
