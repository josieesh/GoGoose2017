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



class Game extends React.Component{
  constructor(props) {
    super(props);
    this.myTurn=this.myTurn.bind(this);
    this.deal=this.deal.bind(this);
    this.goGoose=this.goGoose.bind(this);
    this.onUpdate=this.onUpdate.bind(this);
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
    };

  }

  componentWillMount () {
    this.deal(this.state.cards, this.state.cpu, this.state.hand);
  }

  componentDidMount() {

    this.cpuTurn();
  }

  /* game () {
    if (this.state.turn%2 === 0){
      console.log("my turn");
      //call function MyTurn
    }
    else {
      console.log("cpu turn");
      //Call function CpuTurn
    }
  }*/

  cpuTurn() {

    console.log("calling cpuTurn");

    var cards = this.state.cards;
    var request = this.state.request;
    var cpuRequest = this.state.cpuRequest;
    var hand = this.state.hand;
    var cpu = this.state.cpu;
    var cpuChosenAskingCard = this.state.cpuChosenAskingCard;
    var endOfTurn = this.state.endOfTurn;
    var turn = this.state.turn;

    endOfTurn = false;

    cpuChosenAskingCard = this.chooseAskingCard(cpu)
    cpuRequest= this.cpuRequest(cpuChosenAskingCard);
    this.playerResponse(hand, cpuChosenAskingCard, request);

    this.setState({
      cpuRequest: cpuRequest,
      cpuChosenAskingCard: cpuChosenAskingCard,
    });
  }

  playerResponse (hand, cpuChosenAskingCard, request) {
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
    })
    console.log("disabled cards:", disabledCards);
  }

  myTurn() {

    console.log("myTurn invoked");

    var cards = this.state.cards;
    var request = this.state.request;
    var cpuRequest = this.state.cpuRequest;
    var hand = this.state.hand;
    var cpu = this.state.cpu;
    var turn = this.state.turn;
    var endOfTurn = this.state.endOfTurn;

    console.log("cpu cards from myTurn function:", cpu);

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
            endOfTurn = true;
            //if (hand[0] === ("c" + request) || hand[0] === ("d" + request) || hand [0] === ("h" + request) || hand[0] === ("s" + request)) {
                //turn++; //basically sets turn back to an even value which means player will go again
            }

        this.setState(
          { cards: cards,
            cpuRequest: cpuRequest,
            request: request,
            hand: hand,
            cpu: cpu,
            endOfTurn: endOfTurn,
            turn: turn }
        );
  }

  deal(cards, cpu, hand) {

    this.shuffle(cards);

    for(var i = 0; i <5; i ++) {
        this.drawCardHand(cards, hand);
    };

    for(var j = 0; j <5; j++) {
      this.drawCardCpu(cards, cpu);
    };

  }

  drawCardCpu(cards, cpu) {

    if (cards.length !== 0) {
      cpu.unshift(cards[0]);
      cards.shift();
      //checkArray(cpu);

      this.setState (
        { cards: cards,
          cpu: cpu }
      );
    }
    else {
      alert("cannot draw card, deck is empty");
    }
  }

  drawCardHand(cards, hand) {

    if (cards.length !== 0) {
      hand.unshift(cards[0]);
      cards.shift();
      //checkArray(hand);
      if(this.state.request.length > 0) {

        this.setState(
          { hand: hand,
            cards: cards,
            cpuRequest: ""}
        );

        console.log("asdkjfhsadgl", this.state.hand[0][1]);
        console.log("asdkahksajkdsak", this.state.request[0]);

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

    }
    /*else {
        console.log('cannot draw card, deck is empty');
    } */
  }

  /*countInArray: function(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i].includes(what)) {
            count++;
        }
    }
    return count;
  },

  checkArray: function(array) {
    for (var i = 2; i < 11; i++) {

        if (countInArray(array, i) == 4) {
            moveToFront(array.indexOf("c" +i), array);
            moveToFront(array.indexOf("s" +i), array);
            moveToFront(array.indexOf("d" +i), array);
            moveToFront(array.indexOf("h" +i), array);

            array.splice(0,4);

        }
    }

    if (countInArray(array, "j") == 4) {

        moveToFront(array.indexOf("cj"), array);
        moveToFront(array.indexOf("sj"), array);
        moveToFront(array.indexOf("dj"), array);
        moveToFront(array.indexOf("hj"), array);

        array.splice(0,4);
    }

    if (countInArray(array, "q") == 4) {

        moveToFront(array.indexOf("cq"), array);
        moveToFront(array.indexOf("sq"), array);
        moveToFront(array.indexOf("dq"), array);
        moveToFront(array.indexOf("hq"), array);

        array.splice(0,4);
    }

    if (countInArray(array, "k") == 4 ) {

        moveToFront(array.indexOf("ck"), array);
        moveToFront(array.indexOf("sk"), array);
        moveToFront(array.indexOf("dk"), array);
        moveToFront(array.indexOf("hk"), array);

        array.splice(0,4);
    }

    if (countInArray(array, "a") == 4) {

        moveToFront(array.indexOf("ca"), array);
        moveToFront(array.indexOf("sa"), array);
        moveToFront(array.indexOf("da"), array);
        moveToFront(array.indexOf("ha"), array);

        array.splice(0,4);
    }

  }*/

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

    for (var i=0; i<x.length; i++) {
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

    if(this.checkInput(this.state.hand, request)){
      this.setState ({ request: request}, this.myTurn());
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
      if(this.state.cpu[0] === this.state.cpuChosenAskingCard) {
        setTimeout(function() {this.setState({cpuRequest: "I drew a what I asked for, so I go again",}); }.bind(this), 1000);

        setTimeout(function() {this.cpuTurn(); }.bind(this), 1000);
      }
      else {
        setTimeout(function () {this.setState({cpuRequest: "Your turn", cpuChosenAskingCard: "", request: ""}/*insert callback function that just console logs so that state is always updated*/); }.bind(this), 1000);
      }
  }

  sendCardToCpu(card) {
    var hand = this.state.hand;
    var cpu = this.state.cpu;
    var disabledCards = this.state.disabledCards;

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

  render(){

    return(
      <div id="game">
        <h2>GoGoose</h2>
        <hr/>
        <div className="clearfix">
          <CpuFrame cpu= {this.state.cpu}
                    cards={this.state.cards}/>
          <CpuBubbleFrame request={this.state.cpuRequest} turn={this.state.turn}/>
          <DeckFrame cards= {this.state.cards}/>
          <ButtonFrame
          cards= {this.state.cards}
          shuffle= {this.shuffle.bind(this)}
          drawCardHand= {this.drawCardHand.bind(this)}
          hand= {this.state.hand}
          cpu= {this.state.cpu}
          cpuRequest={this.state.cpuRequest}
          disabledCards={this.state.disabledCards}
          goGoose={this.goGoose.bind(this)}/>
          <div id="container2">
            <HandFrame disabledCards={this.state.disabledCards} hand= {this.state.hand} sendCardToCpu={this.sendCardToCpu.bind(this)}/>
            <MyBubbleFrame request = {this.state.request}/>
            <RequestFrame onUpdate={this.onUpdate} request = {this.state.request} turn = {this.state.turn}/>
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
        <button onClick={this.newGame} >New Game</button>
      </div>
    );
  }
}

export default App;
