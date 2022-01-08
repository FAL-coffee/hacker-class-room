import { Message, User } from "@types";
import { Timestamp } from "@/firebase";

export const MESSAGE: Message = {
  value: `test message`,
  postedAt: Timestamp.fromDate(new Date()),
  postedUid: `mockUsersUID`,
};

export const USER: User = {
  uid: "mockUsersUID",
  email: "test@test.test",
  photoURL: "/favicon.ico",
  displayName: "Mock User",
};
