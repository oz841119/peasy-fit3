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
export function Pagination({ size, currPage, total, LIMIT = 5, onChange }: Props) {
  let startPage = Math.max(1, currPage - Math.floor(LIMIT / 2));
  let endPage = Math.min(total, startPage + LIMIT - 1);
  if (endPage - startPage + 1 < LIMIT) {
    startPage = Math.max(1, endPage - LIMIT + 1);
  }
  const pageList = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  return (
    <_Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={() => onChange(currPage - 1)} />
        </PaginationItem>
        {
          pageList.map((page) => (
            <PaginationItem>
              <PaginationLink
                isActive={currPage === page}
                onClick={() => onChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))
        }
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" onClick={() => onChange(currPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </_Pagination>
  )
}