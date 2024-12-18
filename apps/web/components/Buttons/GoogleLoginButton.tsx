import { Button } from "../shadcnUI/button"

export const GoogleLoginButton = ({ onLogin }: { onLogin: () => void}) => {
  return (
    <Button type="button" onClick={onLogin}>Login with Google</Button>
  )
}