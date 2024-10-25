import { NavBreadcrumb } from "./NavBreadcrumb/NavBreadcrumb";
import { User } from "./User/User";
export function TopBar() {
  return (
    <div className="py-2 flex items-center">
      <NavBreadcrumb></NavBreadcrumb>
      <User></User>
    </div>
  )
}




