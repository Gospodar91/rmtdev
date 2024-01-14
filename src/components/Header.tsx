import { TReactNode } from "../lib/types";

export default function Header({ children }: TReactNode) {
  return <header className="header">{children}</header>;
}

export function HeaderTop({ children }: TReactNode) {
  return <div className="header__top">{children}</div>;
}
