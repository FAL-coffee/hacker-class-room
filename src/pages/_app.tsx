import React from "react";
import { AppProps } from "next/app";
import AuthProvider from "@/AuthContext";
const App = ({ Component, pageProps }: AppProps) => (
    <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>
);

export default App;
