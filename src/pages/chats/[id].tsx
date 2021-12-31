// import { useAuth } from "@/AuthContext";
// import { useRouter } from "next/router";

import { db, collection, query, onSnapshot } from "@/firebase";
// import Image from "next/image";
import React, { useEffect, useState } from "react";
// import { addDoc, Timestamp } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
interface message {
  content: string;
  createdAt: Timestamp;
  uid: string;
}
interface chat {
  createdAt: Timestamp;
  description: string;
  messages: message[];
  name: string;
  owner: string;
}
const Signin = () => {
  //   const { currentUser } = useAuth();

  //   const router = useRouter();
  //   console.log(router.query.id);
  // データ追加
  //   const clickButton = () => {
  //     const docRef = addDoc(collection(db, "users"), {
  //       uid: "",
  //       displayName: "",
  //       email: "",
  //       photoURL:
  //         "",
  //     });
  //     console.log("Document", docRef);
  //   };

  const [chats, setChats] = useState<Array<chat>>([]);

  useEffect(() => {
    let tempchats: Array<chat> = [];
    // const q = query(collection(db, 'chats'), where('uid', '==', `${router.query.id}`))
    const q = query(collection(db, "chats"));
    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          //   console.log("added: ", change.doc.data());
          //   tasks.push({
          //     id: change.doc.id,
          //     name: change.doc.data().name
          //   })
          //   console.log(tasks)
          //   console.log(change.doc.data());
          tempchats.push({
            // createdAt: change.doc.data().createdAt,
            // description: change.doc.data().description,
            // messages: change.doc.data().messages,
            // name: change.doc.data().name,
            // owner: change.doc.data().owner,
            ...(change.doc.data() as chat),
          });
          //   console.log(tempchats);
        }
      });
      setChats(tempchats);
    });
  }, []);

  //   useEffect(() => {
  //     alert(chats);
  //   }, [chats]);

  return (
    <div>
      {/* <button onClick={clickButton}>Firestore追加</button> */}
      {chats.map((chat: chat, i: number) => (
        <div key={i}>
          {chat.messages.map((message: message, j: number) => (
            <p key={j}>{message.content}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Signin;
