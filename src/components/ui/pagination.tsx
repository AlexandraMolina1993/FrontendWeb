import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  paginationActiveButtonStyle,
  paginationButtonStyle,
  paginationContainerStyle,
  paginationControlsStyle,
  paginationEllipsisStyle,
  paginationInfoStyle,
} from "../../shared/styles/pagination.styles.js";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
  siblingCount?: number;
  className?: string;
}

type PageItem = number | "ellipsis-left" | "ellipsis-right";

function createPages(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): PageItem[] {
  const visiblePages = siblingCount * 2 + 5;

  if (totalPages <= visiblePages) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis) {
    const leftPages = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, index) => index + 1,
    );
    return [...leftPages, "ellipsis-right", totalPages];
  }

  if (!showRightEllipsis) {
    const start = totalPages - (2 + siblingCount * 2);
    const rightPages = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, index) => start + index,
    );
    return [1, "ellipsis-left", ...rightPages];
  }

  const middlePages = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, index) => leftSibling + index,
  );

  return [1, "ellipsis-left", ...middlePages, "ellipsis-right", totalPages];
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  siblingCount = 1,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const pages = createPages(safePage, totalPages, siblingCount);
  const firstItem = pageSize ? (safePage - 1) * pageSize + 1 : undefined;
  const lastItem =
    pageSize && totalItems
      ? Math.min(safePage * pageSize, totalItems)
      : undefined;

  return (
    <nav
      className={`${paginationContainerStyle} ${className}`}
      aria-label="Paginación"
    >
      <p className={paginationInfoStyle}>
        {firstItem && lastItem && totalItems !== undefined
          ? `Mostrando ${firstItem}-${lastItem} de ${totalItems}`
          : `Página ${safePage} de ${totalPages}`}
      </p>

      <div className={paginationControlsStyle}>
        <button
          type="button"
          onClick={() => onPageChange(safePage - 1)}
          disabled={safePage === 1}
          className={paginationButtonStyle}
          aria-label="Página anterior"
        >
          <ChevronLeft size={17} aria-hidden="true" />
        </button>

        {pages.map((page) =>
          typeof page === "number" ? (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`${paginationButtonStyle} ${page === safePage ? paginationActiveButtonStyle : ""}`}
              aria-current={page === safePage ? "page" : undefined}
              aria-label={`Ir a la página ${page}`}
            >
              {page}
            </button>
          ) : (
            <span key={page} className={paginationEllipsisStyle}>
              …
            </span>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(safePage + 1)}
          disabled={safePage === totalPages}
          className={paginationButtonStyle}
          aria-label="Página siguiente"
        >
          <ChevronRight size={17} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
