import { Props } from "./types";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";
import { UserMenuKey, HeaderLinkKey } from "@types";
import { AppHeader } from "@components/organisms";
import { useRouter } from "next/router";

export const Layout = ({ children, ...props }: Props) => {
  const { currentUser, login, logout } = useAuth();
  const router = useRouter();

  const linkHandler = (key: HeaderLinkKey) => {
    if (key === "home") return;
    else if (key === "roomList") return;
  };

  const menuHandler = (key: UserMenuKey) => {
    if (key === "logout") return logoutHandler();
    else if (key === "profile") return;
  };

  const loginHandler = () => {
    if (!!currentUser) return;
    login && login();
  };

  const logoutHandler = () => {
    if (!currentUser) return;
    logout && logout();
  };

  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name={props.name} content={props.content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppHeader
        user={currentUser}
        onLogoClick={() => router.push("/")}
        onUserMenuClick={menuHandler}
        onLinkClick={linkHandler}
        onGoogleSigninClick={loginHandler}
      />
      <main>{children}</main>
    </>
  );
};
