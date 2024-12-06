import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcnUI/card"
import { PropsWithCrCn } from "@/types"
interface Props extends PropsWithCrCn {
  title: string
  description: string
}
export const BaseCard = ({ className, children, title, description }: Props) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{ title }</CardTitle>
        <CardDescription>{ description }</CardDescription>
      </CardHeader>
      <CardContent>
        { children }
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}
