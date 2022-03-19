import { IChatRoom } from "@types";
import { USER } from "./User";

export const CHATROOM: IChatRoom = {
  id: "test",
  owner: USER,
  name: "test chatrooms name",
  iconURL: "/favicon.ico",
  tags: [
    { id: "test-tag1-id", value: "test-tag1-value" },
    { id: "test-tag2-id", value: "test-tag2-value" },
  ],
  description: "hello! this is chatroom card testing for localhost.",
  createdAt: new Date(),
};
