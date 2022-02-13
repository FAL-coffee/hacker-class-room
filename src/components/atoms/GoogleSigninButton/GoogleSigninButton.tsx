import * as React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import { Props } from "./types";
export const GoogleSigninButton = (props: Props) => {
  const [googleSigninBtn, setGoogleSigninBtn] = React.useState<
    "normal" | "focus" | "pressed"
  >("normal");

  const googleSigninBtnImageMap: Map<string, string> = new Map([
    ["normal", "/btn_google_signin/btn_google_signin_dark_normal_web@2x.png"],
    ["focus", "/btn_google_signin/btn_google_signin_dark_focus_web@2x.png"],
    ["pressed", "/btn_google_signin/btn_google_signin_dark_pressed_web@2x.png"],
  ]);
  return (
    <Box sx={{ flexGrow: 0, minWidth: 160 }}>
      <span
        id="app-header_google-signin-btn"
        onMouseDown={() => setGoogleSigninBtn("pressed")}
        onMouseUp={() => setGoogleSigninBtn("normal")}
        onClick={props.onClick}
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
  );
};
