import { IUser } from "@types";
export interface Props {
  user?: IUser | null;
  onLogoClick: () => void;
  onUserMenuClick: (key: string) => void;
  onLinkClick: (key: string) => void;
  onGoogleSigninClick:()=>void
}
