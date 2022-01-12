import { IUser } from "@types";
export interface Props {
  user: IUser;
  onLogoClick: () => void;
  onUserMenuClick: (key: string) => void;
  onLinkClick: (key: string) => void;
}
