import { Container, Reciever, Sender, Timestamp } from "./Message.styles";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig/firebase";
import moment from "moment";

export default function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);

  const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;
  return (
    <Container>
      <TypeOfMessage>
        {message.message}{" "}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  );
}
