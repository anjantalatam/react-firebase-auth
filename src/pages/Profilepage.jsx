import React from "react";
import { Layout } from "../components/Layout";
import { Badge, Code, Container, Heading } from "@chakra-ui/react";
import { Card } from "../components/Card";
import { chakra } from "@chakra-ui/system";
import { useAuth } from "../contexts/AuthContext";

export default function Profilepage() {
  const { currentUser } = useAuth();
  return (
    <Layout>
      <Heading>
        Profile page
        <Badge colorScheme="green" fontSize="lg" mx={4}>
          Protected Page
        </Badge>
      </Heading>

      <Container maxW="container.lg" overflowX="auto" py={4}>
        <chakra.pre>
          Email - {currentUser.email} <br />
          Account Status - {currentUser.emailVerified ? "Verified" : "Pending"}
        </chakra.pre>
        {/* <chakra.pre>{JSON.stringify(currentUser, null, 2)}</chakra.pre> */}
      </Container>
    </Layout>
  );
}
