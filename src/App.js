import React, { Component, Fragment } from "react";
import "./App.css";
import { fetchPickups } from "./api";

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
    panelIsOpen: false
  };

  togglePanel = () => {
    this.setState(prevState => ({
      panelIsOpen: !prevState.panelIsOpen
    }));
  };

  render() {
    return (
      <nav>
        <div onClick={this.togglePanel} className="item">
          Livraison
        </div>
        {this.state.panelIsOpen && <Panel close={this.togglePanel} />}
      </nav>
    );
  }
}

class Panel extends Component {
  state = {
    selectedOption: 0,
    pickups: []
  };

  componentDidMount() {
    fetchPickups().then(pickups => {
      this.setState({ pickups });
    });
  }

  selectOption = id => () => {
    this.setState({
      selectedOption: id
    });
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
            isSelected={this.state.selectedOption === pickup.id}
            onClick={this.selectOption(pickup.id)}
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
