const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '@3465@Msql@',
    database: 'order_manager',
});

app.use(express.json());
app.use(cors());


app.get('/order/list', (req, res) => {
  db.query('SELECT * FROM orders', [], (err, result) => {
    if (err) {
      console.log("500");
      console.log(err);
      return res.status(500).send(err);
    }
    
    if (result.length === 0) {
      console.log("404");
      return res.status(404).send({ msg: 'Pedido não encontrado' });
    }
    
    console.log(result);
    return res.send(result);
  });
});

app.get('/order/:numeroPedido', (req, res) => {
  const numeroPedido = req.params.numeroPedido;
  console.log(numeroPedido);

  if (!numeroPedido) {
    console.log("400");
    return res.status(400).send({ msg: 'numeroPedido é obrigatório' });
  }
  
  db.query('SELECT * FROM orders WHERE numeroPedido = ?', [numeroPedido], (err, result) => {
    if (err) {
      console.log("500");
      console.log(err);
      return res.status(500).send(err);
    }
    
    if (result.length === 0) {
      console.log("404");
      return res.status(404).send({ msg: 'Pedido não encontrado' });
    }
    
    console.log(result);
    return res.send(result);
  });
});

app.post('/order', (req, res) => {
  let json;
  try {
    json = JSON.parse(req.body.json);
    console.log(json["numeroPedido"]);
    console.log(json["valorTotal"]);
    console.log(json["dataCriacao"]);
    for (let index = 0; index < json["items"].length; index++) {
      console.log(json["items"][index]["idItem"]);
      console.log(json["items"][index]["quantidadeItem"]);
      console.log(json["items"][index]["valorItem"]);
    }
  } catch (e) {
    return res.send({ msg: 'deu erro' });
  }
  
  const numeroPedido = json["numeroPedido"];
  const valorTotal = json["valorTotal"];
  const dataCriacao = json["dataCriacao"];
  const items = json["items"];
  
  let completedQueries = 0;
  const totalItems = items.length;
  let errorOccurred = false;

  for (let index = 0; index < items.length; index++) {
    db.query('SELECT * FROM orders WHERE numeroPedido = ? AND idItem = ?', [numeroPedido, items[index]["idItem"]], (err, result) => {
      if (err) {
        console.log(err);
        if (!errorOccurred) {
          errorOccurred = true;
          return res.send(err);
        }
        return;
      }

      if (result.length == 0) {
        db.query('INSERT INTO orders (numeroPedido, valorTotal, dataCriacao, idItem, quantidadeItem, valorItem) VALUE (?, ?, ?, ?, ?, ?)', 
          [numeroPedido, valorTotal, dataCriacao, items[index]["idItem"], items[index]["quantidadeItem"], items[index]["valorItem"]],
          (err, response) => {
            if (err) {
              console.log(err);
              if (!errorOccurred) {
                errorOccurred = true;
                return res.send(err);
              }
              return;
            }
            completedQueries++;
            if (completedQueries === totalItems && !errorOccurred) {
              return res.send({ msg: 'Cadastrado com sucesso!' });
            }
          }
        );
      } else {
        if (!errorOccurred) {
          errorOccurred = true;
          return res.send({ msg: 'Pedido já cadastrado.' });
        }
      }
    });
  }
});

app.post('/singup', (req, res) => {
  const company = req.body.company;
  const email = req.body.email;
  const password = req.body.password;

  db.query('SELECT * FROM users WHERE email = ?', [email],
  (err, result) => {
    if (err) { res.send(err); }
    if (result.length == 0 && company !=='' && email !== '') {
      console.log('Até aqui de certo');
      db.query('INSERT INTO users (company, email, password, db_client_number, permissions) VALUE (?, ?, ?, ?, ?)',
        [company, email, password, 'client_1', 'admin'],
        (err, response) => {
          if (err) { res.send(err); }
          res.send({ msg: 'Cadastrado com sucesso!' });
        }
      );
    } else {
      res.send({ msg: 'E-mail já cadastrado.' });
    }
  });
});

app.listen(3001, () => {
    console.log('Rodando servidor na porta 3001');
});
