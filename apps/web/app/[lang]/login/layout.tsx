import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: '...',
  description: '...',
}
export default ({ children }: PropsWithChildren) => {
  return children
}