import { TReactNode } from "../lib/types";
export default function Sidebar({ children }: TReactNode) {
  return <div className="sidebar">{children}</div>;
}

export function SideBarTop({ children }: TReactNode) {
  return <div className="sidebar__top">{children}</div>;
}
