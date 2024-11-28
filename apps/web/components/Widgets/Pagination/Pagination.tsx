import {
  Pagination as _Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/shadcnUI/pagination";

interface Props {
  size: number;
  currPage: number;
  total: number;
  LIMIT: number;
  onChange: (page: number) => void;
}
export function Pagination({ size, currPage, total, onChange }: Props) {
  const LIMIT = 5
  const totalPages = Math.ceil(total / size);
  let startPage = Math.max(1, currPage - Math.floor(LIMIT / 2));
  let endPage = Math.min(totalPages, startPage + LIMIT - 1);
  if (endPage - startPage + 1 < LIMIT) {
    startPage = Math.max(1, endPage - LIMIT + 1);
  }
  const pageList = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  return (
    <_Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onChange(currPage - 1)}
            className={currPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>
        {startPage > 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                type="button"
                onClick={() => onChange(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {startPage > 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
          </>
        )}
        {pageList.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              className="cursor-pointer"
              type="button"
              isActive={currPage === page}
              onClick={() => onChange(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                type="button"
                onClick={() => onChange(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext 
            onClick={() => onChange(currPage + 1)}
            className={currPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>
      </PaginationContent>
    </_Pagination>
  )
}