import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useQueryParams from "../hooks/useQueryParams";

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const history = useHistory();
  const query = useQueryParams();
  const [newPassword, setNewPassword] = useState("");
  const toast = useToast();
  const oobCode = query.get("oobCode");

  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Reset password
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            // handle reset password
            try {
              await resetPassword(oobCode, newPassword);
              toast({
                description:
                  "Password Reset Succesfull. Login with New-Password",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
              history.push("/login");
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
          <Stack spacing="6">
            <FormControl id="password">
              <FormLabel>New password</FormLabel>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="password"
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="primary" size="lg" fontSize="md">
              Reset password
            </Button>
          </Stack>
        </chakra.form>
      </Card>
    </Layout>
  );
}
