import { IMessage } from "@types";
import { USER } from ".";
export const MESSAGE: IMessage = {
  value: `test message`,
  postedAt: { seconds: 0, nanoseconds: 0 } as IMessage["postedAt"],
  user: USER,
};
