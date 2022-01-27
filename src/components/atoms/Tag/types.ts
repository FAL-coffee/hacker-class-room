export interface Props {
  id?: string;
  name: string;
  size?: "small" | "medium";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  onClick?: (id: number) => void;
}
