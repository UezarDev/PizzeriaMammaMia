import React from 'react';
import Header from './Header';
import CardPizza from './CardPizza';
import '../utils/pizzas.js';
import { pizzas } from '../utils/pizzas.js';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="container my-4">
        <div className="row g-4">
          {pizzas.map((pizza) => (
            <div className="col-12 col-md-4" key={pizza.id}>
              <CardPizza
                id={pizza.id}
                name={pizza.name}
                price={pizza.price}
                ingredients={pizza.ingredients}
                img={pizza.img}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
