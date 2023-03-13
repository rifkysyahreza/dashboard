import { useState, useEffect } from "react";
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
  Input,
  IconButton,
} from "@chakra-ui/react";
import { supabase } from "../supabaseClient";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

function Inventory() {
  const addProductModal = useDisclosure();
  const deleteProductModal = useDisclosure();
  const editProductModal = useDisclosure();
  const [inventorys, setInventory] = useState([]);
  const [inputProductName, setInputProductName] = useState("");
  const [inputProductTotal, setInputProductTotal] = useState("");
  const [inputProductPrice, setInputProductPrice] = useState("");
  const [deleteEditProduct, setDeleteEditProduct] = useState({});
  const [status, setStatus] = useState(true);

  useEffect(() => {
    (async function readInventory() {
      let { data: inventory, error } = await supabase
        .from("inventory")
        .select("*");

      setInventory(inventory);
    })();
    console.log("cek inventory");
  }, [status]);

  async function addProduct() {
    const { data, error } = await supabase.from("inventory").insert([
      {
        id:
          inventorys.length === 0
            ? 1
            : inventorys[inventorys.length - 1].id + 1,
        product_name: inputProductName,
        total: inputProductTotal,
        price: inputProductPrice,
      },
    ]);

    const temp = {
      id:
        inventorys.length === 0 ? 1 : inventorys[inventorys.length - 1].id + 1,
      product_name: inputProductName,
      total: inputProductTotal,
      price: inputProductPrice,
    };
    setInventory([...inventorys, temp]);
    setStatus(!status);
  }

  async function deleteProductFunction() {
    const { data, error } = await supabase
      .from("inventory")
      .delete()
      .eq("id", deleteEditProduct.id);
    console.log(deleteEditProduct);
    setStatus(!status);
  }

  async function editProductFunction() {
    const { data, error } = await supabase
      .from("inventory")
      .update({
        product_name: inputProductName,
        total: inputProductTotal,
        price: inputProductPrice,
      })
      .eq("id", deleteEditProduct.id);
    setStatus(!status);
  }

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
        <Button onClick={addProductModal.onOpen}>Add Inventory</Button>
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
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {inventorys ? (
                inventorys.map((elements, index) => (
                  <Tr key={index}>
                    <Td>{elements.id}</Td>
                    <Td>{elements.product_name}</Td>
                    <Td>{elements.total}</Td>
                    <Td>{elements.price}</Td>
                    <Td>
                      <IconButton
                        colorScheme="red"
                        aria-label="Search database"
                        icon={<DeleteIcon />}
                        onClick={() => {
                          deleteProductModal.onOpen();
                          setDeleteEditProduct(elements);
                        }}
                      />
                      <IconButton
                        colorScheme="yellow"
                        aria-label="Search database"
                        icon={<EditIcon />}
                        onClick={() => {
                          editProductModal.onOpen();
                          setDeleteEditProduct(elements);
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

      <Modal isOpen={addProductModal.isOpen} onClose={addProductModal.onClose}>
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
                addProductModal.onClose();
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
        isOpen={deleteProductModal.isOpen}
        onClose={deleteProductModal.onClose}
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
                deleteProductModal.onClose();
                deleteProductFunction();
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

      <Modal
        isOpen={editProductModal.isOpen}
        onClose={editProductModal.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Inventory</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Product Name</FormLabel>
              <Input
                id="editProductNameField"
                placeholder="Product name"
                onChange={(huruf) => {
                  setInputProductName(huruf.target.value);
                }}
                value={deleteEditProduct.product_name}
              />
            </FormControl>
            <FormControl isRequired className="py-5">
              <FormLabel>Product Total</FormLabel>
              <Input
                id="editProductTotalField"
                placeholder="Product Total"
                onChange={(huruf) => {
                  setInputProductTotal(huruf.target.value);
                }}
                value={deleteEditProduct.total}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Product Price</FormLabel>
              <Input
                id="editProductPriceField"
                placeholder="Product Price in $"
                onChange={(huruf) => {
                  setInputProductPrice(huruf.target.value);
                }}
                value={deleteEditProduct.price}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                editProductFunction();
                editProductModal.onClose();
              }}
            >
              Edit
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
