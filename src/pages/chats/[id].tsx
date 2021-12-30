import { useAuth } from "@/AuthContext";
import { useRouter } from "next/router";

import { db, collection } from "@/firebase";
// import Image from "next/image";
import React from "react";
const Signin = () => {
  const { currentUser } = useAuth();

  const router = useRouter();
  console.log(router.query.id);
  console.log(collection(db, "chat"));
  return <div></div>;
};

export default Signin;
