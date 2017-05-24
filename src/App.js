import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import MyBubbleFrame from './components/BubbleFrame';
import HandFrame from './components/HandFrame';
import CpuFrame from './components/CpuFrame';
import ButtonFrame from './components/ButtonFrame';
import DeckFrame from './components/DeckFrame';
import CpuBubbleFrame from './components/CpuBubbleFrame';
import RequestFrame from './components/RequestFrame';

import {createStore, applyMiddleware, compose, redux} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import reducer from 'reducer-redux';


const logger = createLogger();

var defaultState = {
  cards: ["ca", "ck", "cq", "cj", "c10", "c9", "c8", "c7", "c6", "c5", "c4", "c3", "c2","sa", "sk", "sq", "sj", "s10", "s9", "s8", "s7", "s6", "s5", "s4", "s3", "s2",
          "ha", "hk", "hq", "hj", "h10", "h9", "h8", "h7", "h6", "h5", "h4", "h3", "h2", "da",
          "dk", "dq", "dj", "d10", "d9", "d8", "d7", "d6", "d5", "d4", "d3", "d2"],
  hand: [],
  cpu: [],
  cpuRequest: "",
  cpuChosenAskingCard: "",
  request: "",
  disabledCards: [],
};


function changeRequest(request) {
  return {
    type: 'CHANGE_REQUEST',
    data: {request}
  };
}

function changeCards (cards) {
  return {
    type: 'CHANGE_CARDS',
    data: {cards}
  };
}

function changeHand (hand) {
  return {
    type: 'CHANGE_HAND',
    data: {hand}
  };
}

function changeCpu (cpu) {
  return {
    type: 'CHANGE_CPU',
    data: {cpu}
  };
}

function stateApp(state, action) {
  switch (action.type) {
    case "CHANGE_REQUEST":
      var newState = Object.assign({}, state);

      newState.request=action.request;

      return newState;

    case "CHANGE_CARDS":
      var newState= Object.assign({}, state);

      newState.cards=action.cards;

      return newState;

    case "CHANGE_HAND":
      var newState=Object.assign({}, state);

      newState.hand=action.hand;

      return newState;

    case "CHANGE_CPU":
      var newState=Object.assign({}, state);

      newState.cpu=action.cpu;

      return newState;

    default:
      return state;
  }

}

var store = createStore(stateApp, defaultState);
store.subscribe (() =>
  console.log(store.getState())
)

store.dispatch({type: 'CHANGE_REQUEST'})
store.dispatch({type: 'CHANGE_CARDS'})
store.dispatch({type: 'CHANGE_HAND'})
store.dispatch({type: 'CHANGE_CPU'})

class Game extends React.Component{
  constructor(props) {
    super(props);
    this.myTurn=this.myTurn.bind(this);
    this.deal=this.deal.bind(this);
    this.goGoose=this.goGoose.bind(this);
    this.onUpdate=this.onUpdate.bind(this);
    this.cpuTurn=this.cpuTurn.bind(this);
    this.disableCards= this.disableCards.bind(this);
    this.drawCardHand = this.drawCardHand.bind(this);
    this.drawCardCpu = this.drawCardCpu.bind(this);
    this.cpuRequest = this.cpuRequest.bind(this);
    this.chooseAskingCard = this.chooseAskingCard.bind(this);
    this.checkInput = this.checkInput.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.check = this.check.bind(this);
    this.sendCardToCpu = this.sendCardToCpu.bind(this);
    this.drawCardHandInitial = this.drawCardHandInitial.bind(this);
    this.removeMyGroupsOfFour =this.removeMyGroupsOfFour.bind(this);
    this.removeCpuGroupsOfFour = this.removeCpuGroupsOfFour.bind(this);
    this.state = {
      cards: ["ca", "ck", "cq", "cj", "c10", "c9", "c8", "c7", "c6", "c5", "c4", "c3", "c2","sa", "sk", "sq", "sj", "s10", "s9", "s8", "s7", "s6", "s5", "s4", "s3", "s2",
              "ha", "hk", "hq", "hj", "h10", "h9", "h8", "h7", "h6", "h5", "h4", "h3", "h2", "da",
              "dk", "dq", "dj", "d10", "d9", "d8", "d7", "d6", "d5", "d4", "d3", "d2"],
      hand: [],
      cpu: [],
      turn: 0,
      endOfTurn: false,
      cpuRequest: "",
      cpuChosenAskingCard: "",
      request: "",
      disabledCards: [],
      myGroups: [],
      cpuGroups: []
    };

  }

  componentWillMount () {
    this.deal(this.state.cards, this.state.cpu, this.state.hand);
  }

  componentDidMount() {
    if(this.state.cpuRequest.length === 0) {
      this.cpuTurn();
    }
  }

  cpuTurn() {

    console.log("calling cpuTurn");

    var cards = this.state.cards;
    var request = this.state.request;
    var cpuRequest = this.state.cpuRequest;
    var hand = this.state.hand;
    var cpu = this.state.cpu;
    var cpuChosenAskingCard = this.state.cpuChosenAskingCard;
    var turn = this.state.turn;

    cpuChosenAskingCard = this.chooseAskingCard(cpu);
    console.log(cpuChosenAskingCard);

    cpuRequest= this.cpuRequest(cpuChosenAskingCard);
    this.disableCards(hand, cpuChosenAskingCard);

    this.setState({
      request: "",
      cpuRequest: cpuRequest,
      cpuChosenAskingCard: cpuChosenAskingCard,
    });

    this.removeCpuGroupsOfFour(this.state.cpu);
    console.log("ending cpuTurn function execution");
  }

  disableCards (hand, cpuChosenAskingCard) {
    var disabledCards = [];
    if (this.check(hand, cpuChosenAskingCard)) {
      for (var i = 0; i < hand.length; i++) {
        if (hand[i][1] !== cpuChosenAskingCard[1]) {
          disabledCards.push(hand[i]);
        }
      }
    }
    else {
      console.log("click the gofish button");
      disabledCards = hand;
    }

    this.setState ({
      disabledCards: disabledCards,
    });
    console.log("disabled cards from disableCards:", disabledCards);
  }

  myTurn(request) {

    console.log("myTurn invoked");

    var cards = this.state.cards;
    var cpuRequest = this.state.cpuRequest;
    var hand = this.state.hand;
    var cpu = this.state.cpu;

    console.log("does cpu have this card?",this.checkInput(cpu, request));

        if (this.checkInput(cpu, request)) {

            cpuRequest="Yep!"
            var a = cpu.indexOf("c" + request[0]);
            if (a != -1) {
              hand.unshift(cpu[a]);
              cpu.splice(a, 1);
            }

            var b = cpu.indexOf("s" + request[0]);
            if (b != -1) {
              hand.unshift(cpu[b]);
              cpu.splice(b, 1);
            }

            var c = cpu.indexOf("h" + request[0]);
            if (c != -1) {
              hand.unshift(cpu[c]);
              cpu.splice(c, 1);
            }

            var d = cpu.indexOf("d" + request[0]);
            if (d != -1) {
              hand.unshift(cpu[d]);
              cpu.splice(d, 1);
            }

            //this.checkArray(hand);

            if (cpu.length === 0) {
                this.drawCardCpu(cards, cpu); //this is in case that i take the computer's last card but there are still cards in the deck. the cpu has to draw
            }

        }
        else {
            cpuRequest = "Go Goose!"; //you have to take a card from the deck
            //if (hand[0] === ("c" + request) || hand[0] === ("d" + request) || hand [0] === ("h" + request) || hand[0] === ("s" + request)) {
                //turn++; //basically sets turn back to an even value which means player will go again
            }
      setTimeout(function() {
        this.setState(
          { cards: cards,
            cpuRequest: cpuRequest,
            request: "",
            hand: hand,
            cpu: cpu }
        ); }.bind(this), 1000);

        this.removeMyGroupsOfFour(this.state.hand);

  }

  deal(cards, cpu, hand) {

    this.shuffle(cards);

    for(var i = 0; i <5; i ++) {
        this.drawCardHandInitial(cards, hand);
    };

    for(var j = 0; j <5; j++) {
      this.drawCardCpu(cards, cpu);
    };

  }

  drawCardCpu(cards, cpu) {

    console.log("drawCardCpu called");

    if (cards.length !== 0) {
      cpu.unshift(cards[0]);
      cards.shift();
      //checkArray(cpu);

      this.setState (
        { cards: cards,
          cpu: cpu }, () => { console.log("setState called in drawCardCpu"); }
      );
    }
    else {
      alert("cannot draw card, deck is empty");
    }
  }

  drawCardHand(cards, hand) {

    console.log("drawCardHand called");

    if (cards.length !== 0) {
      hand.unshift(cards[0]);
      cards.shift();
      //checkArray(hand);

      console.log("inside the second if statement in drawCardHand");

      this.setState(
        { hand: hand,
          cards: cards,
          cpuRequest: "",
          request: ""}
      );
      //the following if else statements are being called on initial deal. they should only get called when user clicks on the draw card button
      if(this.state.hand[0][1] === this.state.request[0]) {
        this.setState({
          request: "I drew what I asked for!"
        });
      }
      else {
        this.setState({
          request: ""
        }, this.cpuTurn());
      }

    }
    else {
        console.log('cannot draw card, deck is empty');
    }
  }

  drawCardHandInitial(cards, hand) {

    if (cards.length !== 0) {
      hand.unshift(cards[0]);
      cards.shift();
      //checkArray(hand);

      this.setState(
        { hand: hand,
          cards: cards}
      );
    }
  }

  countInArray (array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i].includes(what)) {
            count++;
        }
    }
    return count;
  }

  moveToFront (index, array) {
    var card = array[index];
    array.splice(index, 1);
    array.unshift(card);
    return array;
  }

  removeMyGroupsOfFour (hand) {

    var myGroups = this.state.myGroups;

    for (var i = 2; i < 11; i++) {

        if (this.countInArray(hand, i) === 4) {
            hand = this.moveToFront(hand.indexOf("c" +i), hand);
            hand = this.moveToFront(hand.indexOf("s" +i), hand);
            hand = this.moveToFront(hand.indexOf("d" +i), hand);
            hand = this.moveToFront(hand.indexOf("h" +i), hand);

            myGroups.unshift(hand[0], hand[1], hand[2],hand[3]);
            hand.splice(0,4); //removes the group of four identical cards from front of array

        }
    }

    if (this.countInArray(hand, "j") === 4) {

        hand = this.moveToFront(hand.indexOf("cj"), hand);
        hand = this.moveToFront(hand.indexOf("sj"), hand);
        hand = this.moveToFront(hand.indexOf("dj"), hand);
        hand = this.moveToFront(hand.indexOf("hj"), hand);

        myGroups.unshift(hand[0], hand[1], hand[2],hand[3]);
        hand.splice(0,4);
    }

    if (this.countInArray(hand, "q") === 4) {

        hand = this.moveToFront(hand.indexOf("cq"), hand);
        hand = this.moveToFront(hand.indexOf("sq"), hand);
        hand = this.moveToFront(hand.indexOf("dq"), hand);
        hand = this.moveToFront(hand.indexOf("hq"), hand);

        myGroups.unshift(hand[0], hand[1], hand[2],hand[3]);
        hand.splice(0,4);
    }

    if (this.countInArray(hand, "k") === 4 ) {

        hand = this.moveToFront(hand.indexOf("ck"), hand);
        hand = this.moveToFront(hand.indexOf("sk"), hand);
        hand = this.moveToFront(hand.indexOf("dk"), hand);
        hand = this.moveToFront(hand.indexOf("hk"), hand);

        myGroups.unshift(hand[0], hand[1], hand[2],hand[3]);
        hand.splice(0,4);
    }

    if (this.countInArray(hand, "a") === 4) {

        hand = this.moveToFront(hand.indexOf("ca"), hand);
        hand = this.moveToFront(hand.indexOf("sa"), hand);
        hand = this.moveToFront(hand.indexOf("da"), hand);
        hand = this.moveToFront(hand.indexOf("ha"), hand);

        myGroups.unshift(hand[0], hand[1], hand[2],hand[3]);
        hand.splice(0,4);
    }

    this.setState({
      hand: hand,
      myGroups: myGroups
    });

  }

  removeCpuGroupsOfFour (hand) {

    var cpuGroups = this.state.CpuGroups;

    for (var i = 2; i < 11; i++) {

        if (this.countInArray(hand, i) === 4) {
            hand = this.moveToFront(hand.indexOf("c" +i), hand);
            hand = this.moveToFront(hand.indexOf("s" +i), hand);
            hand = this.moveToFront(hand.indexOf("d" +i), hand);
            hand = this.moveToFront(hand.indexOf("h" +i), hand);

            cpuGroups.unshift(hand[0], hand[1], hand[2],hand[3]);
            hand.splice(0,4); //removes the group of four identical cards from front of array

        }
    }

    if (this.countInArray(hand, "j") === 4) {

        hand = this.moveToFront(hand.indexOf("cj"), hand);
        hand = this.moveToFront(hand.indexOf("sj"), hand);
        hand = this.moveToFront(hand.indexOf("dj"), hand);
        hand = this.moveToFront(hand.indexOf("hj"), hand);

        cpuGroups.unshift(hand[0], hand[1], hand[2],hand[3]);
        hand.splice(0,4);
    }

    if (this.countInArray(hand, "q") === 4) {

        hand = this.moveToFront(hand.indexOf("cq"), hand);
        hand = this.moveToFront(hand.indexOf("sq"), hand);
        hand = this.moveToFront(hand.indexOf("dq"), hand);
        hand = this.moveToFront(hand.indexOf("hq"), hand);

        cpuGroups.unshift(hand[0], hand[1], hand[2],hand[3]);
        hand.splice(0,4);
    }

    if (this.countInArray(hand, "k") === 4 ) {

        hand = this.moveToFront(hand.indexOf("ck"), hand);
        hand = this.moveToFront(hand.indexOf("sk"), hand);
        hand = this.moveToFront(hand.indexOf("dk"), hand);
        hand = this.moveToFront(hand.indexOf("hk"), hand);

        cpuGroups.unshift(hand[0], hand[1], hand[2],hand[3]);
        hand.splice(0,4);
    }

    if (this.countInArray(hand, "a") === 4) {

        hand = this.moveToFront(hand.indexOf("ca"), hand);
        hand = this.moveToFront(hand.indexOf("sa"), hand);
        hand = this.moveToFront(hand.indexOf("da"), hand);
        hand = this.moveToFront(hand.indexOf("ha"), hand);

        cpuGroups.unshift(hand[0], hand[1], hand[2],hand[3]);
        hand.splice(0,4);
    }

    this.setState({
      cpu: hand,
      cpuGroups: cpuGroups
    });

  }

  cpuRequest(chosenAskingCard) {

    var request = "";

    if (chosenAskingCard==='c2' || chosenAskingCard === 'd2' || chosenAskingCard==='s2' || chosenAskingCard === 'h2')
    {
        request = "Do you have a 2?";
    }
    else if (chosenAskingCard==='c3' || chosenAskingCard === 'd3' || chosenAskingCard=== 's3' || chosenAskingCard === 'h3')
    {
        request = "Do you have a 3?";
    }
    else if (chosenAskingCard=== 'c4' || chosenAskingCard === 'd4' || chosenAskingCard=== 's4' || chosenAskingCard === 'h4')
    {
        request = "Do you have a 4?";
    }
    else if (chosenAskingCard=== 'c5' || chosenAskingCard === 'd5' || chosenAskingCard=== 's5' || chosenAskingCard === 'h5')
    {
        request = "Do you have a 5?";
    }
    else if (chosenAskingCard=== 'c6' || chosenAskingCard === 'd6' || chosenAskingCard=== 's6' || chosenAskingCard === 'h6')
    {
        request = "Do you have a 6?";
    }
    else if (chosenAskingCard=== 'c7' || chosenAskingCard=== 'd7' || chosenAskingCard=== 's7' || chosenAskingCard === 'h7')
    {
        request = "Do you have a 7?";
    }
    else if (chosenAskingCard=== 'c8' || chosenAskingCard=== 'd8' || chosenAskingCard=== 's8' || chosenAskingCard=== 'h8')
    {
        request="Do you have an 8?";
    }
    else if (chosenAskingCard=== 'c9' || chosenAskingCard === 'd9' || chosenAskingCard=== 's9' || chosenAskingCard=== 'h9')
    {
        request="Do you have a 9?";
    }
    else if (chosenAskingCard=== 'c10' || chosenAskingCard=== 'd10' || chosenAskingCard=== 's10' || chosenAskingCard=== 'h10')
    {
        request="Do you have a 10?";
    }
    else if (chosenAskingCard==='cj' || chosenAskingCard=== 'dj' || chosenAskingCard=== 'sj' || chosenAskingCard=== 'hj')
    {
        request="Do you have a Jack?";
    }
    else if (chosenAskingCard=== 'cq'|| chosenAskingCard=== 'dq' || chosenAskingCard=== 'sq' || chosenAskingCard=== 'hq')
    {
        request="Do you have a Queen?";
    }
    else if (chosenAskingCard=== 'ck' || chosenAskingCard=== 'dk' || chosenAskingCard=== 'sk' || chosenAskingCard === 'hk')
    {
        request="Do you have a King?";
    }
    else {
        request="Do you have an Ace?";
    }

    return request;
  }

  chooseAskingCard(cpu) {
    var value = Math.floor(Math.random() * cpu.length);
    return cpu[value];
  }

  check(x, request) {
    for (var i = 0; i < x.length; i++) {
      if (x[i][1] === request[1]) {
          return true;
      }
    }
    console.log("invalid request (from check function)");
    return false;
  }

  checkInput(x, request) {

    console.log("request from checkinput:", request);

    for (var i=0; i<x.length; i++) {
      console.log(x[i][1]);

      if(x[i][1] === request[0]) {
        return true;
      }
    }
    console.log("cannnot ask for that, try again");
    return false;
  }

  shuffle(cards) {
    var j, x, i;
    for (i = cards.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = cards[i - 1];
        cards[i - 1] = cards[j];
        cards[j] = x;

    }
    this.setState({ cards: cards });
  }

  onUpdate(request) {

    console.log("calling onUpdate function in game");

    if(this.checkInput(this.state.hand, request)){
      this.setState({ request:request }, this.myTurn(request));
    }
    else {
      this.setState({
        request: "",
      });
    }
  }

  goGoose() {
      this.setState({ request: "Go Goose!"});
      setTimeout(function() { this.drawCardCpu(this.state.cards, this.state.cpu); }.bind(this), 1000);

      if(this.state.cpu[0][1] === this.state.cpuChosenAskingCard[1]) {
        console.log("invoking I drew what I asked for, so I go again");
        setTimeout(function() {this.setState({cpuRequest: "I drew a what I asked for, so I go again"}); }.bind(this), 1000);

        setTimeout(function() {this.cpuTurn(); }.bind(this), 1000);
      }
      else {
        setTimeout(function() {this.setState({cpuRequest: "Your turn", cpuChosenAskingCard: "", request: "", disabledCards: []}, () => { console.log("setState called");}); }.bind(this), 1000);
      }
  }

  sendCardToCpu(card) {
    var hand = this.state.hand;
    var cpu = this.state.cpu;
    var disabledCards = this.state.disabledCards;

    if(this.state.cpuRequest !== "Your turn"){
      if (disabledCards.indexOf(card) != -1) {
        alert("cannot click this card");

      }
      else {
        hand.splice(hand.indexOf(card),1);
        cpu.unshift(card);
        this.setState({
          hand: hand,
          cpu: cpu,
          cpuRequest: "",
          cpuChosenAskingCard: "",
        });
        console.log("checking if disabled cards = number of hand cards", disabledCards.length===hand.length);

        if (disabledCards.length === hand.length) { //this checks to see if there are any other cards to be sent to cpu before calling cpuTurn again
          this.cpuTurn();
        }
      }
    }
  }

  render(){

    return(
      <div id="game">
        <h2>GoGoose</h2>
        <hr/>
        <div className="clearfix">
          <CpuFrame cpu= {this.state.cpu}
                    cards={this.state.cards}/>
          <CpuBubbleFrame request={this.state.cpuRequest} turn={this.state.turn}/>
          <DeckFrame cards= {this.state.cards}
                      drawCardHand= {this.drawCardHand}
                      hand={this.state.hand}
                      cpuRequest={this.state.cpuRequest}
                      drawCardHand={this.drawCardHand}/>
        </div>
          <div id="container2">
            <HandFrame disabledCards={this.state.disabledCards} hand= {this.state.hand} sendCardToCpu={this.sendCardToCpu.bind(this)}/>
            <MyBubbleFrame request = {this.state.request}/>
            <div>
              <RequestFrame onUpdate={this.onUpdate} request={this.state.request}
                            cpuRequest={this.state.cpuRequest}/>
              <ButtonFrame
              cards= {this.state.cards}
              shuffle= {this.shuffle}
              drawCardHand= {this.drawCardHand}
              hand= {this.state.hand}
              cpu= {this.state.cpu}
              cpuRequest={this.state.cpuRequest}
              disabledCards={this.state.disabledCards}
              goGoose={this.goGoose}/>
            </div>
        </div>
      </div>
    );
  }
};

class App extends React.Component {
    constructor(props) {
    super(props);
    this.newGame = this.newGame.bind(this);
    this.state = {
        game: ()=><Game />,
    };
  }

  newGame () {
    this.setState({
      game: ()=><Game />,
    });
  }

  render () {
    const ActiveGame = this.state.game;
    return (
        <div>
        <ActiveGame />
        <button id="newgame-button" onClick={this.newGame} >New Game</button>
      </div>
    );
  }
}

export default App;
