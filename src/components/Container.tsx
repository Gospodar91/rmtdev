import { TReactNode } from "../lib/types";

export default function Container({ children }: TReactNode) {
  return <div className="container">{children}</div>;
}
