import {
  Container,
  UserAvatar,
  Header,
  IconsContainer,
  Search,
  SearchInput,
  SidebarButton,
} from "./Sidebar.styles";

import { IconButton } from "@material-ui/core";
import { auth, db } from "../../firebaseConfig/firebase";

import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";

import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "../Chats/Chat";

export default function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);

  const [chatsSnapshot] = useCollection(userChatRef);

  const chatExists = (recipientEmail) =>
    !!chatsSnapshot.docs?.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    ); // NOT WORKING

  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the use you want to chat with"
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatExists(input) &&
      input !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => auth.signOut()} src={user.photoURL} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchInput placeholder="Search" startAdornment={<SearchIcon />} />
      </Search>
      <SidebarButton onClick={createChat}>START A NEW CHAT</SidebarButton>

      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}
