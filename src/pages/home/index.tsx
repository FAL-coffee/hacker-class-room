import type { NextPage } from "next";
import { useAuth } from "@/context/AuthContext";
import { Layout } from "@components/layout";
import React from "react";

const Home: NextPage = () => {
  // const { currentUser, login, logout } = useAuth();
  return (
    <Layout title="HOME">
      <div></div>
    </Layout>
  );
};

export default Home;
