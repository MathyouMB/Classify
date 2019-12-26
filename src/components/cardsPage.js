import React, {Component} from "react";
import Swipeable from "react-swipy"

import Card from "./card/Card";
import Button from "./card/Button";
import '../style/cards.scss';
import logo from '../img/logo192.png';

const wrapperStyles = {position: "relative", width: "350px", height: "500px"};

const user = [
    ["John Doe",5],
    ["Matthew M-B",4],
    ["Iain M",3]
]

const actionsStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 12,
};

class CardsPage extends Component {
  state = {
    //cards: ["First", "Second", "Third"],
    cards: [...user],
  };

  remove = () =>
    this.setState(({cards}) => ({
      cards: cards.slice(1, cards.length),
    }));

  render() {
    const {cards} = this.state;
    return (
      <div className="cards-page">
          <div className="card-container">
                <div style={wrapperStyles}>
                {cards.length > 0 ? (
                    <div style={wrapperStyles}>
                    <Swipeable
                        buttons={({left, right}) => (
                        <div style={actionsStyles}>
                            <Button onClick={left}>Reject</Button>
                            <Button onClick={right}>Accept</Button>
                        </div>
                        )}
                        onAfterSwipe={this.remove}
                    >
                        <Card>{<div className="card"> <img className="profile-page-user-image" src="./profile.png"></img><h1>{cards[0][0]}</h1><p>Number of similar class: {cards[0][1]}</p></div>}</Card>
                    </Swipeable>
                    {cards.length > 1 && <Card zIndex={-1}>{<div className="card"> <img className="profile-page-user-image" src="./profile.png"></img><h1>{cards[1][0]}</h1><p>Number of similar class: {cards[0][1]}</p></div>}</Card>}
                    </div>
                    ) : (
                    <Card zIndex={-2}>No More Users</Card>
                    )}
                </div>
        </div>
      </div>
    );
  }
}

export default CardsPage;