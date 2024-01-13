import { TReactNode } from "./App";

export default function Container({ children }: TReactNode) {
  return <div className="container">{children}</div>;
}
