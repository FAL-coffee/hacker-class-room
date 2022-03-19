import { IMessage } from "@types";
import { USER } from ".";
export const MESSAGE: IMessage = {
  value: `test message`,
  postedAt: new Date(),
  user: USER,
};
