import { type PropsWithChildren } from "react";
export interface PropsWithClassName {
  className?: string
}
export interface PropsWithCrCn extends PropsWithClassName, PropsWithChildren {}