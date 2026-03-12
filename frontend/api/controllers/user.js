import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM funcionarios";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addFuncionarios = (req, res) => {
  const q = `
    INSERT INTO funcionarios
    (nome, email, telefone, data_nascimento, endereco, cargo, salario)
    VALUES (?)
  `;

  const values = [
    req.body.nome,
    req.body.email,
    req.body.telefone,
    req.body.data_nascimento,
    req.body.endereco,
    req.body.cargo,
    req.body.salario,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Funcionário criado com sucesso.");
  });
};

export const updateFuncionarios = (req, res) => {
  const q = `
    UPDATE funcionarios 
    SET nome = ?, email = ?, telefone = ?, data_nascimento = ?, endereco = ?, cargo = ?, salario = ?
    WHERE idfuncionarios = ?
  `;

  const values = [
    req.body.nome,
    req.body.email,
    req.body.telefone,
    req.body.data_nascimento,
    req.body.endereco,
    req.body.cargo,
    req.body.salario,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Funcionário atualizado com sucesso.");
  });
};

export const deleteFuncionarios = (req, res) => {
  const q = "DELETE FROM funcionarios WHERE idfuncionarios = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Funcionário deletado com sucesso.");
  });
};