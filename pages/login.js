import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import LogoImg from "../public/js/Logo";
import { auth, provider } from "../firebaseConfig/firebase";

export default function login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Container>
      <Head>Login</Head>

      <LoginContainer>
        <LogoImg />
        <Button onClick={signIn} variant="outlined">
          Sign in with Google
        </Button>
      </LoginContainer>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);

  Button {
    margin-top: 50px;
  }
`;
