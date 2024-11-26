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
}
export function Pagination({size, currPage, total}: Props) {
  const pages = Math.ceil(total / size);
  return (
    <_Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {
          Array.from({ length: pages }).map((_, index) => (
            <PaginationItem>
              <PaginationLink href="#" isActive={currPage === index + 1}>{ index + 1}</PaginationLink>
            </PaginationItem>
          ))
        }
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </_Pagination>
  )
}