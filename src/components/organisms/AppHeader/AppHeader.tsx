import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { Props } from "./types";

import Image from "next/image";

const links = [
  { key: "home", name: "ホームへ戻る" },
  { key: "roomList", name: "チャットルーム一覧" },
];
const userMenu = [
  { key: "profile", name: "プロフィール情報" },
  { key: "logout", name: "ログアウト" },
];

export const AppHeader = ({ ...props }: Props) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [googleSigninBtn, setGoogleSigninBtn] = React.useState<
    "normal" | "focus" | "pressed"
  >("normal");

  const googleSigninBtnImageMap: Map<string, string> = new Map([
    ["normal", "/btn_google_signin/btn_google_signin_dark_normal_web@2x.png"],
    ["focus", "/btn_google_signin/btn_google_signin_dark_focus_web@2x.png"],
    ["pressed", "/btn_google_signin/btn_google_signin_dark_pressed_web@2x.png"],
  ]);

  return (
    <AppBar position="fixed" id="app-header">
      <Container maxWidth="xl" id="app-header_container">
        <Toolbar disableGutters id="app-header_toolbar">
          <Button
            id="app-header_logoimage_btn_under-md"
            size="large"
            sx={{ display: { xs: "none", md: "flex" } }}
            onClick={props.onLogoClick}
          >
            <Image
              id="app-header_logoimage_under-md"
              src="/logo.png"
              alt="LOGO"
              height={50}
              width={140}
            />
          </Button>

          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              id="app-header_menu-icon-btn"
              aria-controls="app-header_menu"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="app-header_link-menu"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {links.map((link) => (
                <MenuItem
                  key={link.key}
                  onClick={() => (
                    handleCloseNavMenu(), props.onLinkClick(link.key)
                  )}
                >
                  <Typography textAlign="center">{link.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 2,
              display: { xs: "flex", md: "none" },
              minWidth: "140px",
            }}
            textAlign="justify"
          >
            <Button
              id="app-header_logoimage_btn_more_than_lg"
              size="large"
              onClick={props.onLogoClick}
            >
              <Image
                id="app-header_logoimage_more_than_lg"
                src="/logo.png"
                alt="LOGO"
                height={50}
                width={140}
              />
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {links.map((link) => (
              <Button
                key={link.key}
                onClick={() => (
                  handleCloseNavMenu(), props.onLinkClick(link.key)
                )}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {link.name}
              </Button>
            ))}
          </Box>

          {!!props.user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  id="app-header_user-avatar"
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                >
                  <Avatar
                    alt={props.user.displayName}
                    src={props.user.photoURL}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="app-header_user-menu"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {userMenu.map((item) => (
                  <MenuItem
                    key={item.key}
                    onClick={() => (
                      handleCloseUserMenu(), props.onUserMenuClick(item.key)
                    )}
                  >
                    <Typography textAlign="center">{item.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, minWidth: 200 }}>
              <span
                id="app-header_google-signin-btn"
                onMouseDown={() => setGoogleSigninBtn("pressed")}
                onMouseUp={() => setGoogleSigninBtn("normal")}
                onClick={props.onGoogleSigninClick}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={googleSigninBtnImageMap.get(googleSigninBtn) as string}
                  alt="G"
                  height={50}
                  width={200}
                />
              </span>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
