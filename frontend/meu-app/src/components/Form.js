import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useRef, useEffect } from "react";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  width: 140%;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #ccc;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.telefone.value = onEdit.telefone;
      user.data_nascimento.value = onEdit.data_nascimento.split("T")[0];
      user.endereco.value = onEdit.endereco;
      user.cargo.value = onEdit.cargo;
      user.salario.value = onEdit.salario;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.email.value ||
      !user.telefone.value ||
      !user.data_nascimento.value ||
      !user.endereco.value ||
      !user.cargo.value ||
      !user.salario.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    try {
      if (onEdit) {
        const res = await axios.put("http://localhost:8800/" + onEdit.idfuncionarios, {
          nome: user.nome.value,
          email: user.email.value,
          telefone: user.telefone.value,
          data_nascimento: user.data_nascimento.value,
          endereco: user.endereco.value,
          cargo: user.cargo.value,
          salario: user.salario.value,
        });

        toast.success(res.data);
      } else {
        const res = await axios.post("http://localhost:8800/", {
          nome: user.nome.value,
          email: user.email.value,
          telefone: user.telefone.value,
          data_nascimento: user.data_nascimento.value,
          endereco: user.endereco.value,
          cargo: user.cargo.value,
          salario: user.salario.value,
        });

        toast.success(res.data);
      }
    } catch (err) {
      toast.error(err.response?.data || "Erro ao salvar");
    }

    user.nome.value = "";
    user.email.value = "";
    user.telefone.value = "";
    user.data_nascimento.value = "";
    user.endereco.value = "";
    user.cargo.value = "";
    user.salario.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>

      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>

      <InputArea>
        <Label>Telefone</Label>
        <Input name="telefone" />
      </InputArea>

      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="data_nascimento" type="date" />
      </InputArea>

      <InputArea>
        <Label>Endereço</Label>
        <Input name="endereco" />
      </InputArea>

      <InputArea>
        <Label>Cargo</Label>
        <Input name="cargo" />
      </InputArea>

      <InputArea>
        <Label>Salário</Label>
        <Input name="salario" type="number" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;