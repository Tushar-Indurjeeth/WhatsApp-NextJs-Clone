import { Container, UserAvatar } from "./Chat.styles";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebaseConfig/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

export default function Chat({ id, users }) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={recipient?.photoUrl} />
      ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
      )}
      <p>{recipientEmail}</p>
    </Container>
  );
}
