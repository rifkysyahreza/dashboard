import { faker } from "@faker-js/faker/locale/id_ID";
import { useState, useEffect } from "react";
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
  IconButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { supabase } from "../supabaseClient";
import { elements } from "chart.js";

function Customer() {
  const addCustomerModal = useDisclosure();
  const deleteCustomerModal = useDisclosure();
  const [customers, setCustomer] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputNoHp, setInputNoHp] = useState("");
  const [deleteCustomer, setDeleteCustomer] = useState({});

  useEffect(() => {
    (async function readCustomer() {
      let { data: customer, error } = await supabase
        .from("customer")
        .select("*");
      setCustomer(customer);
    })();
  }, [customers]);

  // const objectCustomer = {
  //   no: 1,
  //   name: "Ahmad",
  //   address: "Purwokerto",
  //   noHp: faker.phone.number("+62 8### #### ####"),
  // };

  async function addCustomer() {
    const { data, error } = await supabase.from("customer").insert([
      {
        id: customers.length === 0 ? 1 : customers[customers.length - 1].id + 1,
        name: inputName,
        address: inputAddress,
        phone: inputNoHp,
      },
    ]);

    const temp = {
      id: customers.length === 0 ? 1 : customers[customers.length - 1].id + 1,
      name: inputName,
      address: inputAddress,
      phone: inputNoHp,
    };

    // let objectCustomer = {
    //   id: customers.length === 0 ? 1 : customers[customers.length - 1].id + 1,
    //   name: inputName,
    //   address: inputAddress,
    //   phone: inputNoHp,
    // };
    setCustomer([...customers, temp]);
    console.log(customers);
  }

  async function deleteCustomerFunction() {
    const { data, error } = await supabase
      .from("customer")
      .delete()
      .eq("id", deleteCustomer.id);
    console.log(deleteCustomer);
  }

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
        <Button onClick={addCustomerModal.onOpen}>Add Customer</Button>
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
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {customers ? (
                customers.map((elements, index) => (
                  <Tr key={index}>
                    <Td>{index + 1 || []}</Td>
                    <Td>{elements["name"] || []}</Td>
                    <Td>{elements["address"] || []}</Td>
                    <Td>{elements["phone"] || []}</Td>
                    <Td>
                      <IconButton
                        colorScheme="red"
                        aria-label="Search database"
                        icon={<DeleteIcon />}
                        onClick={() => {
                          deleteCustomerModal.onOpen();
                          setDeleteCustomer(elements);
                        }}
                      />
                    </Td>
                  </Tr>
                ))
              ) : (
                <h1>Tidak Ada Data</h1>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>

      <Modal
        isOpen={addCustomerModal.isOpen}
        onClose={addCustomerModal.onClose}
      >
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
                addCustomerModal.onClose();
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

      <Modal
        isOpen={deleteCustomerModal.isOpen}
        onClose={deleteCustomerModal.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hapus Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1 className="font-bold">Yakin ingin menghapus data?</h1>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                deleteCustomerModal.onClose();
                deleteCustomerFunction();
              }}
            >
              Delete
            </Button>
            <Button colorScheme="blue" variant="ghost">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Customer;
