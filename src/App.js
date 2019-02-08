import React, { Component, Fragment } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Fragment>
        <MainNav />
        <SalePage />
      </Fragment>
    );
  }
}

class MainNav extends Component {
  state = {
    panelIsOpen: false,
    selectedOption: 0
  };

  togglePanel = () => {
    this.setState(prevState => ({
      panelIsOpen: !prevState.panelIsOpen
    }));
  };

  selectOption = id => () => {
    this.setState({
      selectedOption: id
    });
  };

  render() {
    return (
      <nav>
        <div onClick={this.togglePanel} className="item">
          Livraison
        </div>
        {this.state.panelIsOpen && (
          <Panel
            close={this.togglePanel}
            selectedOption={this.state.selectedOption}
            selectOption={this.selectOption}
          />
        )}
      </nav>
    );
  }
}

class Panel extends Component {
  state = {
    pickups: [
      { id: 0, name: "En Ruche", price: 0 },
      { id: 1, name: "Livraison à domicile", price: 900 },
      { id: 2, name: "Lulu dans ma ruche", price: 250 }
    ]
  };

  onSubmit = () => {
    this.props.close();
  };

  render() {
    return (
      <div className="panel">
        <h1>Retrait des produits</h1>
        {this.state.pickups.map(pickup => (
          <DeliveryOption
            pickup={pickup}
            isSelected={this.props.selectedOption === pickup.id}
            onClick={this.props.selectOption(pickup.id)}
          />
        ))}
        <button onClick={this.onSubmit}>Sauvegarder</button>
      </div>
    );
  }
}

const DeliveryOption = ({ pickup, isSelected, onClick }) => (
  <div
    key={pickup.id}
    className={"option" + (isSelected ? " selected" : "")}
    onClick={onClick}
  >
    {pickup.name + " (" + format(pickup.price) + ")"}
  </div>
);

class SalePage extends Component {
  render() {
    return (
      <Fragment>
        <SaleNav />
        <Products />
      </Fragment>
    );
  }
}

class SaleNav extends Component {
  render() {
    return (
      <div className="saleNav">
        <MiniBasket />
      </div>
    );
  }
}

const Products = () => <div className="products" />;

class MiniBasket extends Component {
  state = {
    price: 1245
  };

  render() {
    return <div className="miniBasket">{format(this.state.price)}</div>;
  }
}

const format = cents =>
  cents === 0
    ? "Gratuit"
    : Math.floor(cents / 100) +
      "," +
      ((cents % 100) + "").padEnd(2, "0") +
      " €";

export default App;
