import { useRouter } from "next/router";
import { db, onSnapshot, query } from "@/plugin/firebase";
import React, { useEffect, useState } from "react";
import { Layout } from "@components/layout";
import { useAuth } from "@/context/Auth/AuthContext";
import {
  addDoc,
  collection,
  limit,
  orderBy,
  // Timestamp,
  doc,
  getDoc,
  DocumentReference,
} from "firebase/firestore";
import { NextPage } from "next";

import { MessagePostForm } from "@components/molecules";
import { Chats } from "@components/organisms";
import { ChatRoom } from "@components/templates";
import { IMessage, IUser } from "@types";

import { converter } from "@/utils/firebase";
import * as routes from "@routes";

interface TempMessage {
  postedAt: Date;
  value: string;
  user: DocumentReference<IUser>;
}

const Room: NextPage = () => {
  const { currentUser, loading } = useAuth();
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const router = useRouter();
  const type = router.query.type === "chat" ? "chats" : "talks";

  const post = async (value: string) => {
    if (!value || !currentUser || !currentUser.uid) return;
    const data = {
      value: value,
      postedAt: new Date(),
      user: doc(db, "users/" + currentUser.uid),
    };
    const messagesRef = await collection(
      db,
      type,
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

  useEffect(() => {
    let snappedTempMessages: Array<IMessage> = [];
    const q = query(
      collection(db, type, `${router.query.id}`, "messages").withConverter(
        converter<TempMessage>()
      ),
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
              ...change.doc.data(),
              user: userData,
            });
          }

          await setMessages([
            ...snappedTempMessages.sort((a, b) =>
              a.postedAt > b.postedAt ? 1 : -1
            ),
          ]);
        });
    });
  }, [router.query.id, type]);

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
                : {
                    uid: "",
                    displayName: "",
                    email: "",
                    lastLoginAt: new Date("1900-01-01T00:00:00"),
                  }
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
