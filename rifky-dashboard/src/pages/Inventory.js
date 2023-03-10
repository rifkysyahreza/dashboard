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

function Inventory() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inventory, setInventory] = useState([
    {
      no: 1,
      productName: faker.commerce.product(),
      productTotal: faker.datatype.number(100),
      productPrice: faker.commerce.price(),
    },
  ]);
  const [inputProductName, setInputProductName] = useState("");
  const [inputProductTotal, setInputProductTotal] = useState("");
  const [inputProductPrice, setInputProductPrice] = useState("");

  const addProduct = () => {
    let objectInventory = {
      no: inventory.length === 0 ? 1 : inventory[inventory.length - 1].no + 1,
      productName: inputProductName,
      productTotal: inputProductTotal,
      productPrice: inputProductPrice,
    };
    setInventory([...inventory, objectInventory]);
  };

  const resetInput = () => {
    const idProductName = document.getElementById("inputProductNameField");
    setInputProductName();
    idProductName.value = "";
    const idProductTotal = document.getElementById("inputProductTotalField");
    setInputProductTotal();
    idProductTotal.value = "";
    const idProductPrice = document.getElementById("inputProductPriceField");
    setInputProductPrice();
    idProductPrice.value = "";
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center pb-10">
        <h1 className="text-5xl">Inventory</h1>
        <Button onClick={onOpen}>Add Inventory</Button>
      </div>

      <div className="w-full">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Inventory Table</TableCaption>
            <Thead>
              <Tr>
                <Th maxWidth={"1%"}>No</Th>
                <Th>Product Name</Th>
                <Th>Total</Th>
                <Th>Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {inventory ? (
                inventory.map((elements, index) => (
                  <Tr key={index}>
                    <Td>{elements.no}</Td>
                    <Td>{elements.productName}</Td>
                    <Td>{elements.productTotal}</Td>
                    <Td>{elements.productPrice}</Td>
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
          <ModalHeader>Add Inventory</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Product Name</FormLabel>
              <Input
                id="inputProductNameField"
                placeholder="Product name"
                onChange={(huruf) => {
                  setInputProductName(huruf.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired className="py-5">
              <FormLabel>Product Total</FormLabel>
              <Input
                id="inputProductTotalField"
                placeholder="Product Total"
                onChange={(huruf) => {
                  setInputProductTotal(huruf.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Product Price</FormLabel>
              <Input
                id="inputProductPriceField"
                placeholder="Product Price in $"
                onChange={(huruf) => {
                  setInputProductPrice(huruf.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                addProduct();
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

export default Inventory;
