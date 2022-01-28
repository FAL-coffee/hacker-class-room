export interface Props {
  id?: string;
  value: string;
  size?: "small" | "medium";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  onClick?: (id: string) => void;
}
