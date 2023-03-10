import React from "react";
import { Input, Button, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";

function Login() {
  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div className="border-2 border-gray-400 rounded-lg flex flex-col items-center p-10 gap-5">
        <h1 className="font-semibold">Email address</h1>
        <InputGroup className="flex max-w-xs">
          <InputLeftElement
            pointerEvents="none"
            children={<AtSignIcon color="gray.300" />}
          />
          <Input placeholder="Enter your email" />
        </InputGroup>
        <Button colorScheme="blue">Submit</Button>
      </div>
    </div>
  );
}

export default Login;
