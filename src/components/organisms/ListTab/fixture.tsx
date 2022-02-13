import { action } from "@storybook/addon-actions";

import { ChatRoomBarList, UserBarList } from "@/components/organisms";
import { CHATROOM, USER } from "@fixtures";

const CHATROOMS = [CHATROOM, CHATROOM, CHATROOM];
const USERS = [USER, USER, USER];

const FChatRoomBarList = () => {
  const props = {
    chatRooms: CHATROOMS,
    onOpenClick: action("onOpenClick"),
    onTagClick: action("onTagClick"),
    onUserClick: action("onUserClick"),
  };
  return <ChatRoomBarList {...props} />;
};

const FUserBarList = () => {
  const props = {
    users: USERS,
    onUserClick: action("onUserClick"),
  };
  return <UserBarList {...props} />;
};

export const TABS = [
  {
    name: "Follow",
    component: <FUserBarList />,
  },
  {
    name: "Follower",
    component: <FUserBarList />,
  },
  {
    name: "Rooms",
    component: <FChatRoomBarList />,
  },
];
