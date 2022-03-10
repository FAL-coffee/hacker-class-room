import { useRouter } from "next/router";
import { db, onSnapshot, query } from "@/plugin/firebase";
import React, { useEffect, useState } from "react";
import { Layout } from "@components/layout";
import { useAuth } from "@/context/AuthContext";
import {
  addDoc,
  collection,
  limit,
  orderBy,
  Timestamp,
  doc,
  getDoc,
  DocumentReference,
} from "firebase/firestore";
import { NextPage } from "next";

import { MessagePostForm } from "@components/molecules";
import { Chats } from "@components/organisms";
import { ChatRoom } from "@components/templates";
import { IMessage, IUser } from "@types";
import * as routes from "@routes";

interface TempMessage {
  postedAt: Timestamp;
  value: string;
  user: DocumentReference;
}

const Room: NextPage = () => {
  const { currentUser, loading } = useAuth();
  const [messages, setMessages] = useState<Array<IMessage>>([]);

  const post = async (value: string) => {
    if (!value || !currentUser || !currentUser.uid) return;
    const data = {
      value: value,
      postedAt: Timestamp.now(),
      user: doc(db, "users/" + currentUser.uid),
    };
    const messagesRef = await collection(
      db,
      "chats",
      `${router.query.id}`,
      "messages"
    );
    await addDoc(messagesRef, {
      ...data,
    });
  };

  const handleUserClick = (uid: string) => {
    if (!uid) return;
    router.push(`${routes.PROFILE}/${uid}`);
  };

  const router = useRouter();
  useEffect(() => {
    let snappedTempMessages: Array<IMessage> = [];
    const q = query(
      collection(db, "chats", `${router.query.id}`, "messages"),
      orderBy("postedAt", "desc"),
      limit(30)
    );
    onSnapshot(q, (snapshot) => {
      snapshot
        .docChanges()
        .reverse()
        .forEach(async (change) => {
          if (change.type === "added") {
            const userSnap = await getDoc(change.doc.data().user);
            const userData = await userSnap.data();
            snappedTempMessages.push({
              ...(change.doc.data() as TempMessage),
              user: userData as IUser,
            });
          }

          await setMessages([
            ...snappedTempMessages.sort(
              (a, b) =>
                a.postedAt.seconds * 1000 +
                a.postedAt.nanoseconds / 1000000 -
                (b.postedAt.seconds * 1000 + b.postedAt.nanoseconds / 1000000)
            ),
          ]);
        });
    });
  }, [router.query.id]);

  return (
    <Layout title={router.query.id ? router.query.id : ""}>
      <ChatRoom
        ChatDisplayArea={
          <Chats
            messages={messages}
            onUserClick={handleUserClick}
            user={
              currentUser
                ? currentUser
                : { uid: "", displayName: "", email: "" }
            }
          />
        }
        MessagePostForm={
          <MessagePostForm
            onSubmit={post}
            loggedIn={!loading && !!currentUser}
          />
        }
      />
    </Layout>
  );
};

export default Room;
