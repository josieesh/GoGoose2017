import React, { Component } from 'react';
import './App.css';
import MyBubbleFrame from './components/BubbleFrame';
import HandFrame from './components/HandFrame';
import CpuFrame from './components/CpuFrame';
import ButtonFrame from './components/ButtonFrame';
import DeckFrame from './components/DeckFrame';


/*class RequestFrame extends React.Component {

  render () {

    return (
      <div>
        <form>
          Request:
          <input type="text">
          <input type="submit" value="Submit">
        </form>
      </div>
    );
  }
};*/


class CpuBubbleFrame extends React.Component {
  render () {

    return (
      <div id="cpuspeechbubble">
        <textarea>Do you have a ...</textarea>
      </div>
    );
  }
};


class Game extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      cards: ["ca", "ck", "cq", "cj", "c10", "c9", "c8", "c7", "c6", "c5", "c4", "c3", "c2",
              "sa", "sk", "sq", "sj", "s10", "s9", "s8", "s7", "s6", "s5", "s4", "s3", "s2",
              "ha", "hk", "hq", "hj", "h10", "h9", "h8", "h7", "h6", "h5", "h4", "h3", "h2", "da",
              "dk", "dq", "dj", "d10", "d9", "d8", "d7", "d6", "d5", "d4", "d3", "d2"],
      hand: [],
      cpu: [],
      turn: 0,
      endOfTurn: false,
      compRequest: "",
      request: "",
    };

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
  },

  check: function(x, request) {
    for (var i = 0; i < x.length; i++) {
        if (x[i] == "c" + request || x[i] == "s" + request || x[i] == "h" + request || x[i] == "d" + request) {
          return true;
        }
    }
  }, */

  myTurn() {

    var cards = this.state.cards;
    var request = this.state.request;
    var hand = this.state.hand;
    var cpu = this.state.cpu;
    var endOfTurn = this.state.endOfTurn;
    var turn = this.state.turn

    endOfTurn = false;

    var checkRequest = this.check(hand, request);

    if (checkRequest === true) {
        var checkOpponent = this.check(cpu, request);
        if (checkOpponent === true) {

            var a = cpu.indexOf("c" + request);
            if (a != -1) {
              hand.unshift(cpu[a]);
              cpu.splice(a, 1);
            }

            var b = cpu.indexOf("s" + request);
            if (b != -1) {
              hand.unshift(cpu[b]);
              cpu.splice(b, 1);
            }

            var c = cpu.indexOf("h" + request);
            if (c != -1) {
              hand.unshift(cpu[c]);
              cpu.splice(c, 1);
            }

            var d = cpu.indexOf("d" + request);
            if (d != -1) {
              hand.unshift(cpu[d]);
              cpu.splice(d, 1);
            }

            this.checkArray(hand);

            if (cpu.length === 0) {
                this.drawCardCpu(this.state.cards, cpu); //this is in case that i take the computer's last card but there are still cards in the deck. the cpu has to draw
            }

        }
        else {
            console.log("Go fish!"); //you have to take a card from the deck
            this.drawCardHand;
            turn++;
            endOfTurn = true;
            if (hand[0] === ("c" + request) || hand[0] === ("d" + request) || hand [0] === ("h" + request) || hand[0] === ("s" + request)) {
                turn++; //basically sets turn back to an even value which means player will go again
            }
        }

        this.setState(
          { cards: cards,
            request: request,
            hand: hand,
            cpu: cpu,
            endOfTurn: endOfTurn,
            turn: turn }
        );
    }
    else {
        console.log("Invalid request, try again")
    }
  }

  newGame() {
    //alert("Are you sure you want to start a new game?");
    /*var newHand = [];
    var newCpu = [];
    var newCards = ["ca", "ck", "cq", "cj", "c10", "c9", "c8", "c7", "c6", "c5", "c4", "c3", "c2",
            "sa", "sk", "sq", "sj", "s10", "s9", "s8", "s7", "s6", "s5", "s4", "s3", "s2",
            "ha", "hk", "hq", "hj", "h10", "h9", "h8", "h7", "h6", "h5", "h4", "h3", "h2", "da",
            "dk", "dq", "dj", "d10", "d9", "d8", "d7", "d6", "d5", "d4", "d3", "d2"];
    var newTurn = 0;
    var newEndOfTurn = false;
    var newCompRequest = "";
    var newRequest = ""; */


    this.setState (
      { cards: ["ca", "ck", "cq", "cj", "c10", "c9", "c8", "c7", "c6", "c5", "c4", "c3", "c2",
              "sa", "sk", "sq", "sj", "s10", "s9", "s8", "s7", "s6", "s5", "s4", "s3", "s2",
              "ha", "hk", "hq", "hj", "h10", "h9", "h8", "h7", "h6", "h5", "h4", "h3", "h2", "da",
              "dk", "dq", "dj", "d10", "d9", "d8", "d7", "d6", "d5", "d4", "d3", "d2"],
        cpu: [],
        hand: [],
        turn: 0,
        endOfTurn: false,
        compRequest: "",
        request: ""},
        function () {
          return null;
        }
    );


    var cards=this.state.cards;
    var hand=this.state.hand;
    var cpu = this.state.cpu;

    this.shuffle(cards);
    for(var i = 0; i <5; i ++) {
      this.drawCardHand(cards, hand);
    };

    for(var j = 0; j <5; j++) {
      this.drawCardCpu(cards,cpu);
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

        this.setState(
          { hand: hand,
            cards: cards }
        );
    }
    else {
        alert('cannot draw card, deck is empty');
    }
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

  },

  computerRequest: function() {

    var chosenAskingCard = chooseAskingCard(this.state.cpu);

    if (chosenAskingCard==='c2' || chosenAskingCard === 'd2' || chosenAskingCard==='s2' || chosenAskingCard === 'h2')
    {
        console.log("Do you have a 2?");
    }
    else if (chosenAskingCard==='c3' || chosenAskingCard === 'd3' || chosenAskingCard=== 's3' || chosenAskingCard === 'h3')
    {
        console.log("Do you have a 3?");
    }
    else if (chosenAskingCard=== 'c4' || chosenAskingCard === 'd4' || chosenAskingCard=== 's4' || chosenAskingCard === 'h4')
    {
        console.log("Do you have a 4?");
    }
    else if (chosenAskingCard=== 'c5' || chosenAskingCard === 'd5' || chosenAskingCard=== 's5' || chosenAskingCard === 'h5')
    {
        console.log("Do you have a 5?");
    }
    else if (chosenAskingCard=== 'c6' || chosenAskingCard === 'd6' || chosenAskingCard=== 's6' || chosenAskingCard === 'h6')
    {
        console.log("Do you have a 6?");
    }
    else if (chosenAskingCard=== 'c7' || chosenAskingCard=== 'd7' || chosenAskingCard=== 's7' || chosenAskingCard === 'h7')
    {
        console.log("Do you have a 7?");
    }
    else if (chosenAskingCard=== 'c8' || chosenAskingCard=== 'd8' || chosenAskingCard=== 's8' || chosenAskingCard=== 'h8')
    {
        console.log("Do you have an 8?");
    }
    else if (chosenAskingCard=== 'c9' || chosenAskingCard === 'd9' || chosenAskingCard=== 's9' || chosenAskingCard=== 'h9')
    {
        console.log("Do you have a 9?");
    }
    else if (chosenAskingCard=== 'c10' || chosenAskingCard=== 'd10' || chosenAskingCard=== 's10' || chosenAskingCard=== 'h10')
    {
        console.log("Do you have a 10?");
    }
    else if (chosenAskingCard==='cj' || chosenAskingCard=== 'dj' || chosenAskingCard=== 'sj' || chosenAskingCard=== 'hj')
    {
        console.log("Do you have a Jack?");
    }
    else if (chosenAskingCard=== 'cq'|| chosenAskingCard=== 'dq' || chosenAskingCard=== 'sq' || chosenAskingCard=== 'hq')
    {
        console.log("Do you have a Queen?");
    }
    else if (chosenAskingCard=== 'ck' || chosenAskingCard=== 'dk' || chosenAskingCard=== 'sk' || chosenAskingCard === 'hk')
    {
        console.log("Do you have a King?");
    }
    else {
        console.log("Do you have an Ace?");
    }
  },

  chooseAskingCard: function(cpu) {
    var value = Math.floor(Math.random() * cpu.length);
    return cpu[value];
  },*/

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

  render(){
    return(
      <div id="game">
        <h2>GoGoose</h2>
        <hr/>
        <div className="clearfix">
          <CpuFrame cpu= {this.state.cpu}
                    cards={this.state.cards}/>
          <CpuBubbleFrame />
          <DeckFrame cards= {this.state.cards}/>
          <ButtonFrame
          cards= {this.state.cards}
          shuffle= {this.shuffle.bind(this)}
          drawCardHand= {this.drawCardHand.bind(this)}
          hand= {this.state.hand}
          newGame= {this.newGame.bind(this)}
          cpu= {this.state.cpu}/>
          <div id="container2">
            <HandFrame hand= {this.state.hand}/>
            <MyBubbleFrame />
          </div>
        </div>
      </div>
    );
  }
};

export default Game;
