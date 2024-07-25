# Order Manager

- Download and install nodejs
https://nodejs.org/en/download/prebuilt-installer

## Para rodar o projeto siga o passo a passo a seguir

- Terminal 1
> npm install react-scripts@latest

> npm install create-react-app

> cd order_manager

> npm add formik yup

> npm add axios

> npm add react-router-dom

> npm add mysql2 express nodemon cors

> npm start

- Terminal 2
> cd order-manager/server

> node index.js

- Criar banco de dados e tabela no MySQL
A senha do MySQL deve ser "@3465@Msql@" ou alterar o "password" na variável "db" no ./order_manager/server/index.js

> Nome do banco: order_manager

> Nome da tabela: orders

- Campos para criar a teabela orders
![<alt-text>](https://github.com/Leonardo-Nunes-Armelim/Order_Manager/blob/main/img/orders_create_table.png)
- Schema da tabela de dados no MySQL
![<alt-text>](https://github.com/Leonardo-Nunes-Armelim/Order_Manager/blob/main/img/orders_table_schema.png)
- Exemplo de select da tabela
![<alt-text>](https://github.com/Leonardo-Nunes-Armelim/Order_Manager/blob/main/img/orders_table_select.png)

## Como usar

### Home Page: http://localhost:3000/
Na home page você pode navegar entre as abas existentes para acessar funções especificas

### Order: http://localhost:3000/order
Nessa página você pode enviar um JSON usano a caixa de texto e clicar em "Criar" para enviar a solicitação de criação do pedido desejado

### Listagem de todos os pedidos: http://localhost:3001/order/list
Nesse URL é possivel ver todos os pedidos feitos de forma ordenada

Uma formato possivel de JSON para envio seria como:
```json
{
    "numeroPedido": "ABC_001",
    "valorTotal": 6000,
    "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
    "items": [
        {
            "idItem": "AAA",
            "quantidadeItem": 1,
            "valorItem": 1000
        },
        {
            "idItem": "BBB",
            "quantidadeItem": 2,
            "valorItem": 2000
        },
        {
            "idItem": "CCC",
            "quantidadeItem": 3,
            "valorItem": 3000
        }
    ]
}
```

### All Orders: http://localhost:3001/order/list
Nessa página você pode visualizar todos os pedidos registrado no banco de dados até o momento

### Outros tipos de consultas

É possível visualizar todos os itens de um pedido passando na url o número do pedido feito

Exemplo 1:  http://localhost:3001/order/v10089015vdb-01
Exemplo 2: http://localhost:3001/order/ABC_001
