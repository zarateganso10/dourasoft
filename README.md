# DouraSoft


## Requisitos

 - Node e um gerenciador de pacotes instalado na maquina
 - Docker e docker-compose instalado

## Como iniciar a API

 - Entrar na pasta /backend
 - Instalar todas as dependencias do projeto com o comando **npm install** ou **yarn**
 - Subir o container do banco de dados com o comando **docker-compose up postgres**
 - Fazer as migrations do banco de dados com o comando **yarn typeorm migration:run** ou **npx ts-node-dev ./node_modules/typeorm/cli.js migration:run**
 - Iniciar a API com o comando **yarn start** ou **npm start**

## Como iniciar o Front

 - Entrar na pasta /web
 - Instalar todas as dependencias do projeto com o comando **npm install** ou **yarn**
 - Subir o Front com o comando **yarn start** ou **npm start**

## Principais tecnologias utilizidas no Backend

 - Typescript como linguagem
 - Docker para o banco de dados
 - typeorm como ORM
 - Express para o servidor
 
## Principais tecnologias utilizadas no FrontEnd

 - Typescript como linguagem
 - react-router-dom 
 - styled-components para estilizar componentes
 - Material-UI 
 - Axios para conectar com a api

## Desafio

Desafio Programador Web - DouraSoft

Desenvolvimento de um CRUD de cadastro de produtos em PHP ou Javascript e **PostgreSQL**

## Deverá conter
**Produtos**: ID, Codigo, Nome, Descrição e Preço

**Clientes**: ID, Nome, Telefone, Endereço

**Pedidos**: ID, Cliente, Total, Data, Status(Aberto, Entregue, Cancelado), Lista de Produtos (Produto, Quantidade, Valor Unitário e Valor Total).

## Instruções

1. Faça um fork do projeto para sua conta pessoal
2. Crie uma branch com o padrão: `desafio-seu-nome`
3. Submeta seu código criando um Pull Request

## Como o Sistema Deve Funcionar

 - Deve possuir uma Listagem/Inclusão/Edição/Exclusão de Produtos
 - Deve possuir uma Listagem/Inclusão/Edição/Exclusão de Clientes
 - Deve possuir uma Listagem/Inclusão/Edição/Exclusão de Pedidos com possibilidade de detalhar o pedido
 - A tela de pedidos deve possuir a pesquisa e inclusão de clientes caso o cliente não exista
 - Lembre-se um pedido tem uma lista de itens (Quantidade, Produto, Valor Unitário e Valor Total)

## Você pode

- Utilizar qualquer Framework PHP ou Javascript. Caso opte por não utilizar, desenvolver nos padrões de projeto MVC
- Utilizar composer ou npm
- Utilizar quaisquer bibliotecas ou frameworks Javascript como VueJS, React, jQuery ou outras
- Utilizar quaisquer frameworks CSS como Bootstrap, Materialize ou outras

## Não esqueça de

- Manter o script sql junto da sua aplicação. De preferencia ao Migrations.
- Criar um manual de como instalar seu sistema

## Dúvidas:question:

Abra uma [issue](https://github.com/paulop/dourasoft/issues/new)

Ou envie um email para: **paulo@dourasoft.com.br**

Boa sorte! :muscle:
