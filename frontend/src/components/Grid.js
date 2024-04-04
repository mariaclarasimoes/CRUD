import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1300px;
  margin: 20px auto;
  word-break: break-all;
`;


export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`   
  text-align: center;
  border-bottom: inset;
  padding-bottom: 5px;
`;

export const Td = styled.td`
  text-align: center;
  padding-top: 15px;
  width: ${(props) => (props.width ? props.width : "auto")};
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th onlyWeb>Phone</Th>
          <Th >Email</Th>
          <Th>Pet's name</Th>
          <Th>Age</Th>
          <Th>Weight</Th>
          <Th>Species</Th>
          <Th>Breed</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="10%">{item.name}</Td>
            <Td width="10%" onlyWeb>{item.phone}</Td>
            <Td width="20%" >{item.email}</Td>
            <Td width="10%">{item.pets_name}</Td>
            <Td width="5%">{item.age}</Td>
            <Td width="10%">{item.weight}</Td>
            <Td width="10%">{item.species}</Td>
            <Td width="15%">{item.breed}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;