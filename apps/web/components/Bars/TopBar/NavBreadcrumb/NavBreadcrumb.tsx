'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcnUI/breadcrumb"
import { capitalizeFirstLetter } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

function getPath(breadcrumbList: string[]) {
  return '/' + breadcrumbList.join('/')
}

function IntermediateBreadcrumbItem({ children, href }: { children: ReactNode, href: string}) {
  return (
    <>
      <BreadcrumbItem>
        <BreadcrumbLink href={href}>{ children }</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator/>
    </>
  )
}
export function NavBreadcrumb() {
  const pathname = usePathname()
  const breadcrumbList = pathname.split('/').slice(1)
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <IntermediateBreadcrumbItem href="/">Home</IntermediateBreadcrumbItem>
        {
          breadcrumbList.map(((breadcrumb, index) => {
            const text = capitalizeFirstLetter(breadcrumb)
            const isCurrPage = index === breadcrumbList.length - 1
            if(!isCurrPage) {
              const path = getPath(breadcrumbList.slice(0, index + 1))
              return <IntermediateBreadcrumbItem href={path}>{ text } </IntermediateBreadcrumbItem>
            } else {
              return <BreadcrumbPage>{ text }</BreadcrumbPage>
            }
          }))
        }
      </BreadcrumbList>
    </Breadcrumb>
  )
}