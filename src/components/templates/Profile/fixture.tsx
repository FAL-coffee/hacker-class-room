import { action } from "@storybook/addon-actions";

import {
  ListTab,
  UserInformation,
  ChatRoomBarList,
  UserBarList,
} from "@/components/organisms";
import { CHATROOM, USER } from "@fixtures";

const CHATROOMS = [CHATROOM, CHATROOM, CHATROOM];
const USERS = [USER, USER, USER];

export const FUserInformation = () => {
  const props = {
    user: USER,
    isMe: false,
    following: false,
    onFollowClick: action("onFollowClick"),
    onSendMessageClick: action("onSendMessageClick"),
  };
  return <UserInformation {...props} />;
};

const FChatRoomBarList = () => {
  const props = {
    chatRooms: CHATROOMS,
    onOpenClick: action("onOpenClick"),
    onTagClick: action("onTagClick"),
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
export const FListTab = () => {
  const props = {
    tabs: [
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
    ],
  };
  return <ListTab {...props} />;
};
