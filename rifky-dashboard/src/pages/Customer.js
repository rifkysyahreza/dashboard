import { faker } from "@faker-js/faker/locale/id_ID";
import { useState } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

function Customer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [customer, setCustomer] = useState([
    {
      no: 1,
      name: faker.name.fullName(),
      address: faker.address.cityName(),
      noHp: faker.phone.number("+62 8### #### ####"),
    },
  ]);
  const [inputName, setInputName] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputNoHp, setInputNoHp] = useState("");

  // const objectCustomer = {
  //   no: 1,
  //   name: "Ahmad",
  //   address: "Purwokerto",
  //   noHp: faker.phone.number("+62 8### #### ####"),
  // };

  const addCustomer = () => {
    let objectCustomer = {
      no: customer.length === 0 ? 1 : customer[customer.length - 1].no + 1,
      name: inputName,
      address: inputAddress,
      noHp: inputNoHp,
    };
    setCustomer([...customer, objectCustomer]);
  };

  const resetInput = () => {
    const idName = document.getElementById("inputNameField");
    setInputName();
    idName.value = "";
    const idAddress = document.getElementById("inputAddressField");
    setInputAddress();
    idAddress.value = "";
    const idNoHp = document.getElementById("inputNoHpField");
    setInputNoHp();
    idNoHp.value = "";
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center pb-10">
        <h1 className="text-5xl">Customer</h1>
        <Button onClick={onOpen}>Add Customer</Button>
      </div>

      <div className="w-full">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Customer Table</TableCaption>
            <Thead>
              <Tr>
                <Th maxWidth={"1%"}>No</Th>
                <Th>Name</Th>
                <Th>Address</Th>
                <Th>No Hp</Th>
              </Tr>
            </Thead>
            <Tbody>
              {customer ? (
                customer.map((elements, index) => (
                  <Tr key={index}>
                    <Td>{elements.no}</Td>
                    <Td>{elements.name}</Td>
                    <Td>{elements.address}</Td>
                    <Td>{elements.noHp}</Td>
                  </Tr>
                ))
              ) : (
                <h1>Tidak Ada Data</h1>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Customer Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                id="inputNameField"
                placeholder="First name"
                onChange={(huruf) => {
                  setInputName(huruf.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired className="py-5">
              <FormLabel>Address</FormLabel>
              <Input
                id="inputAddressField"
                placeholder="Your Address"
                onChange={(huruf) => {
                  setInputAddress(huruf.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                id="inputNoHpField"
                placeholder="+62############"
                onChange={(huruf) => {
                  setInputNoHp(huruf.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                addCustomer();
                onClose();
              }}
            >
              Submit
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                resetInput();
              }}
            >
              Reset
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Customer;
