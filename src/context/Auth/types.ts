import { ReactNode } from "react";
import { IUser } from "@types";
export interface AuthContextProps {
  currentUser: IUser | null | undefined;
  login?: () => Promise<void>;
  logout?: () => Promise<void>;
  loading?: Boolean;
}

export interface Props {
  children: ReactNode;
}
