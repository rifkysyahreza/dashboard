import { faker } from "@faker-js/faker/locale/id_ID";
import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

function Staff() {
  const [staff, setStaff] = useState([
    {
      no: 1,
      namaStaff: faker.commerce.product(),
      roleStaff: faker.datatype.number(100),
      productPrice: faker.commerce.price(),
    },
  ]);
  return (
    <div>
      <div className="flex flex-row justify-between items-center pb-10">
        <h1 className="text-5xl">Staff</h1>
      </div>

      <div className="w-full">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Staff Table</TableCaption>
            <Thead>
              <Tr>
                <Th maxWidth={"1%"}>No</Th>
                <Th>Nama Staff</Th>
                <Th>Role</Th>
              </Tr>
            </Thead>
            <Tbody>
              {staff ? (
                staff.map((elements, index) => (
                  <Tr key={index}>
                    <Td>{elements.no}</Td>
                    <Td>{elements.namaStaff}</Td>
                    <Td>{elements.roleStaff}</Td>
                  </Tr>
                ))
              ) : (
                <h1>Tidak Ada Data</h1>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Staff;
