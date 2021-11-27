import {
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

export default function Registerpage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const { register, signInWithGoogle } = useAuth();

  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Register
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!email || !password) {
              toast({
                description: "Enter Valid Email/Password",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }

            try {
              setIsSubmitting(true);
              const response = await register(email, password);
              console.log(response);
            } catch (e) {
              toast({
                description: e.message,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          <Stack spacing="6">
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="password"
                required
              />
            </FormControl>
            <Button
              isLoading={isSubmitting}
              type="submit"
              colorScheme="primary"
              size="lg"
              fontSize="md"
            >
              Sign up
            </Button>
          </Stack>
        </chakra.form>
        <Center my={4}>
          <Button variant="link" onClick={() => history.push("/login")}>
            Login
          </Button>
        </Center>
        <DividerWithText my={6}>OR</DividerWithText>
        <Button
          variant="outline"
          isFullWidth
          colorScheme="red"
          leftIcon={<FaGoogle />}
          onClick={async () => {
            try {
              const response = await signInWithGoogle();
              console.log(response);
            } catch (e) {
              toast({
                description: e.message,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
          }}
        >
          Sign in with Google
        </Button>
      </Card>
    </Layout>
  );
}
