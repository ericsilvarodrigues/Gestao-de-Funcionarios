import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import GlobalStyle from "./styles/global.js";
import styled from "styled-components";
import Grid from "./components/Grid.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Form from "./components/Form.js";

const Container = styled.div`
  width: 150%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error.response?.data || "Erro ao carregar funcionários");
    }
  };

  const gerarPDF = () => {
    const doc = new jsPDF();

    doc.text("Lista de Funcionários", 14, 15);

    const tableColumn = [
      "Nome",
      "Email",
      "Telefone",
      "Nascimento",
      "Endereço",
      "Cargo",
      "Salário",
    ];

    const tableRows = [];

    users.forEach((user) => {
      const rowData = [
        user.nome,
        user.email,
        user.telefone,
        new Date(user.data_nascimento).toLocaleDateString("pt-BR"),
        user.endereco,
        user.cargo,
        "R$ " + user.salario,
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("funcionarios.pdf");
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Container>
        <Title>Gerenciador de Funcionários</Title>

        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <button onClick={gerarPDF}>
        Baixar PDF
        </button>

        <Grid
          users={users}
          setUsers={setUsers}
          setOnEdit={setOnEdit}
          getUsers={getUsers}
        />

      </Container>

      <ToastContainer autoClose={3000} position="bottom-right" />
      <GlobalStyle />
    </>
  );
}

export default App;