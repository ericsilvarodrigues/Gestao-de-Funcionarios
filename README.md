# Gerenciador de Funcionários
Este software consiste em um simples sistema de gerênciamento de funcionários, onde podemos realizar operações de cadastro de dados, alteração dos dados salvos, exclusão dos dados e gerarmos um relatório completo de todos funcionários salvos em PDF.

# Autor 
Eric Silva Rodrigues 

# Projeto Faculdade Impacta de Tecnologia 
Projetinho de Banco de dados (MYSQL Workbench), Frontend (React.JS), Backend (Node).

## Items necessários executar o projeto:
É necessário ter instalado no computador:
* MySql versão 8.0.45 ou superior;
* Node versão 22.20.0 ou superior;
* React versão 19.2.4 ou superior;

### Instalação:
* Crie um usuário "root" e "senha" no Workbench atualize os dados no arquivo db.js através do seguinte caminho api/controllers/routes e edite
* Crie um novo banco de dados de nome gerenciarfuncionarios
* Crie uma tabela no MYSQL Workbench com o seguinte nome (funcionarios) e seguintes dados: CREATE TABLE `funcionarios` (
  `idfuncionarios` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefone` varchar(45) NOT NULL,
  `data_nascimento` date NOT NULL,
  `endereco` varchar(255) NOT NULL,
  `cargo` varchar(50) NOT NULL,
  `salario` decimal(10,2) NOT NULL,
  PRIMARY KEY (`idfuncionarios`)

* Após concluir os passos acima, instale as bibliotecas:
* Front-end: npm install axios styled-components react-icons react-toastify jspdf jspdf-autotable, yarn install;
* Back-end: npm install express mysql2 cors nodemon;

### Execução do Projeto:
 * Para execução do backend acesse o seguinte caminho no terminal GerenciarFuncionarios\api> e execute o comando yarn start;
 * Para execução do frontend acesse o seguinte caminho no terminal GerenciarFuncionarios\frontend\meu-app> e execute o comando yarn start;
   
   











