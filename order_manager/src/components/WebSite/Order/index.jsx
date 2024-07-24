import React from 'react';
import Axios from 'axios';

class Order extends React.Component {
    handleSubmit = (event) => {
      event.preventDefault();
      console.log(event.target.json.value);
        
      Axios.post('http://localhost:3001/order', {
          json: event.target.json.value,
        }).then((response) => {
          console.log(response.data["msg"]);
        });
    };
    
  render() {
    return (
      <div>
        <div className="navbar">
          <a href="/">Home</a>
          <a className="active" href="order">Order</a>
          <a href="http://localhost:3001/order/list">All orders</a>
        </div>
        
        <hr className='navbar_hr'/>

        <h1>Criar novo pedido via JSON</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="json">Coloque o seu pedido em formato JSON aqui </label>
          <input className='text' type="text" name="json" id="json" />
          <input className='submit' type="submit" value="Criar" />
        </form><br />
      </div>
    );
  }
}

export default Order;
