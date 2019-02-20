import React, { Component, Fragment } from "react";
import "./App.css";
import { fetchPickups } from "./api";

class App extends Component {
  state = {
    selectedOption: 0
  };

  selectOption = id => () => {
    this.setState({
      selectedOption: id
    });
  };

  render() {
    return (
      <Fragment>
        <MainNav
          selectOption={this.selectOption}
          selectedOption={this.state.selectedOption}
        />
        <SalePage selectedOption={this.state.selectedOption} />
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
        {this.state.panelIsOpen && (
          <Panel
            close={this.togglePanel}
            selectOption={this.props.selectOption}
            selectedOption={this.props.selectedOption}
          />
        )}
      </nav>
    );
  }
}

class Panel extends Component {
  state = {
    pickups: []
  };

  componentDidMount() {
    fetchPickups().then(pickups => {
      this.setState({ pickups });
    });
  }

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
        <SaleNav selectedOption={this.props.selectedOption} />
        <Products />
      </Fragment>
    );
  }
}

class SaleNav extends Component {
  render() {
    return (
      <div className="saleNav">
        <MiniBasket selectedOption={this.props.selectedOption} />
      </div>
    );
  }
}

const Products = () => <div className="products" />;

class MiniBasket extends Component {
  state = {
    price: 1245,
    pickups: []
  };

  componentDidMount() {
    fetchPickups().then(pickups => {
      this.setState({ pickups });
    });
  }

  render() {
    const selectedPickup = this.state.pickups.filter(
      pickup => pickup.id === this.props.selectedOption
    )[0];
    const pickupPrice = selectedPickup ? selectedPickup.price : 0;
    return (
      <div className="miniBasket">{format(this.state.price + pickupPrice)}</div>
    );
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
