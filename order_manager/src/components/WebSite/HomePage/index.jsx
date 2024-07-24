import React from 'react';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <div className="navbar">
          <a className="active" href="/">Home</a>
          <a href="order">Order</a>
          <a href="http://localhost:3001/order/list">All orders</a>
        </div>

        <hr className='navbar_hr'/>

        <h1>Bem-vindo à Página Inicial!</h1>
        <p>- Você pode navegar para os outros itens da barra de navegação conforme quiser.</p>
      </div>
    );
  }
}

export default HomePage;
