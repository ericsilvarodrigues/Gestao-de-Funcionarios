import React from "react";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Table = styled.table`
  width: 155%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  margin: 10px;
  align-items: center;
`;

export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.OnlyWeb && "display: none"}
  }
`;

const Grid = ({ users, setUsers, setOnEdit, getUsers }) => {

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
         getUsers();
        const newArray = users.filter((user) => user.idfuncionarios !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch((err) => toast.error(err.response.data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th OnlyWeb>Telefone</Th>
          <Th>Data de Nascimento</Th>
          <Th>Endereço</Th>
          <Th>Cargo</Th>
          <Th>Salário</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>

      <Tbody>
        {users.map((item, i) => (
          <Tr key={item.idfuncionarios}>
            <Td width="16%">{item.nome}</Td>
            <Td width="16%">{item.email}</Td>
            <Td width="16%" OnlyWeb>{item.telefone}</Td>
            <Td width="16%">{new Date(item.data_nascimento).toLocaleDateString("pt-BR")}</Td>
            <Td width="20%">{item.endereco}</Td>
            <Td width="16%">{item.cargo}</Td>
            <Td width="16%">{item.salario}</Td>

            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>

            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.idfuncionarios)} />
            </Td>

          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;