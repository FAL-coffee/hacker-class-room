import { IUser, HeaderLinkKey, UserMenuKey } from "@types";
export interface Props {
  user?: IUser | null;
  onLogoClick: () => void;
  onUserMenuClick: (key: UserMenuKey) => void;
  onLinkClick: (key: HeaderLinkKey) => void;
  onGoogleSigninClick: () => void;
}
