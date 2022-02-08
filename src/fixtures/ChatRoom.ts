import { IChatRoom, IMessage } from "@types";
import { USER } from "./User";

export const CHATROOM: IChatRoom = {
  id: "test",
  owner: USER,
  name: "test chatrooms name",
  iconURL: "/favicon.ico",
  tags: [
    { id: "test-tag1-id", genreId:"test-genre-1" , value: "test-tag1-value" },
    { id: "test-tag2-id", genreId:"test-genre-2" , value: "test-tag2-value" },
  ],
  description: "hello! this is chatroom card testing for localhost.",
  createdAt: { seconds: 0, nanoseconds: 0 } as IMessage["postedAt"],
};
