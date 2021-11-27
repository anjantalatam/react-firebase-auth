import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import useMounted from "../hooks/useMounted";

export default function Loginpage() {
  const history = useHistory();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const { login, signInWithGoogle } = useAuth();

  const mounted = useMounted();

  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Login
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            // your login logic here
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
              const response = await login(email, password);
              // console.log(response);
              history.push(location.state?.from ?? "/profile");
            } catch (e) {
              toast({
                description: e.message,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            } finally {
              mounted.current && setIsSubmitting(false);
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
            {/* <PasswordField /> */}
            <Button
              type="submit"
              isLoading={isSubmitting}
              colorScheme="primary"
              size="lg"
              fontSize="md"
            >
              Sign in
            </Button>
          </Stack>
        </chakra.form>
        <HStack justifyContent="space-between" my={4}>
          <Button variant="link">
            <Link to="/forgot-password">Forgot password?</Link>
          </Button>
          <Button variant="link" onClick={() => history.push("/register")}>
            Register
          </Button>
        </HStack>
        <DividerWithText my={6}>OR</DividerWithText>
        <Button
          variant="outline"
          isFullWidth
          colorScheme="red"
          leftIcon={<FaGoogle />}
          onClick={async () => {
            try {
              const response = await signInWithGoogle();
              // console.log(response);
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
