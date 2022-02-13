import { Props } from "./types";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";
import { UserMenuKey, HeaderLinkKey } from "@types";
import { AppHeader } from "@components/organisms";
import { useRouter } from "next/router";
import { LoadingAnimation } from "@components/atoms";
import * as routes from "@routes";

export const Layout = ({ children, ...props }: Props) => {
  const { currentUser, login, logout, loading } = useAuth();
  const router = useRouter();

  const handleLinkClick = (key: HeaderLinkKey) => {
    if (key === "home") return router.push(routes.HOME);
    else if (key === "top") return router.push(routes.TOP);
    else if (key === "roomList") return router.push(routes.ROOM_LIST);
  };

  const handleMenuClick = (key: UserMenuKey) => {
    if (key === "logout") return logoutHandler();
    else if (key === "profile")
      return router.push(
        `${routes.PROFILE}/${!!currentUser ? currentUser.uid : "null"}`
      );
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
        onLogoClick={() => router.push(routes.TOP)}
        onUserMenuClick={handleMenuClick}
        onLinkClick={handleLinkClick}
        onGoogleSigninClick={loginHandler}
      />
      {loading && <LoadingAnimation />}
      <main>{children}</main>
    </>
  );
};
