import React from "react";
import { useState } from "react";
import { supabase } from "../supabaseClient";
import {
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div className="border-2 border-gray-400 rounded-lg flex flex-col items-center p-10 gap-5">
        <FormControl className="flex flex-col items-center">
          <FormLabel>Email address</FormLabel>
          {loading ? (
            "Sending magic link..."
          ) : (
            <form
              onSubmit={handleLogin}
              className="flex flex-col items-center gap-3"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button>
                <Button colorScheme="blue">Submit</Button>
              </button>
            </form>
          )}
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
      </div>
    </div>
  );
}

export default Login;
