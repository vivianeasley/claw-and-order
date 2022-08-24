// import './style.css'

// const numCards = [{idKey: "s2", nameKey:"Two of Spades",iconKey: '🂢'},{idKey: "h2", nameKey:"Two of Hearts",iconKey: '🂲'},{idKey: "d2", nameKey:"Two of Diamonds",iconKey: '🃂'},{idKey: "c2", nameKey:"Two of Clubs",iconKey: '🃒'},{idKey: "s3", nameKey:"Three of Spades",iconKey: '🂣'},{idKey: "h3", nameKey:"Three of Hearts",iconKey: '🂳'},{idKey: "d3", nameKey:"Three of Diamonds",iconKey: '🃃'},{idKey: "c3", nameKey:"Three of Clubs",iconKey: '🃓'},{idKey: "s4", nameKey:"Four of Spades",icon: '🂤'},{idKey: "h4", nameKey:"Four of Hearts",icon: '🂴'},{idKey: "d4", nameKey:"Four of Diamonds",icon: '🃄'},{idKey: "c4", nameKey:"Four of Clubs",icon: '🃔'},{idKey: "s5", nameKey:"Five of Spades",icon: '🂥'},{idKey: "h5", nameKey:"Five of Hearts",icon: '🂵'},{idKey: "d5", nameKey:"Five of Diamonds",icon: '🃅'},{idKey: "c5", nameKey:"Five of Clubs",icon: '🃕'},{idKey: "s6", nameKey:"Six of Spades",icon: '🂦'},{idKey: "h6", nameKey:"Six of Hearts",icon: '🂶'},{idKey: "d6", nameKey:"Six of Diamonds",icon: '🃆'},{idKey: "c6", nameKey:"Six of Clubs",iconKey: '🃖'},{idKey: "s7", nameKey:"Seven of Spades",iconKey: '🂧'},{idKey: "h7", nameKey:"Seven of Hearts",iconKey: '🂷'},{idKey: "d7", nameKey:"Seven of Diamonds",iconKey: '🃇'},{idKey: "c7", nameKey:"Seven of Clubs",iconKey: '🃗'},{idKey: "s8", nameKey:"Eight of Spades",iconKey: '🂨'},{idKey: "h8", nameKey:"Eight of Hearts",iconKey: '🂸'},{idKey: "d8", nameKey:"Eight of Diamonds",iconKey: '🃈'},{idKey: "c8", nameKey:"Eight of Clubs",iconKey: '🃘'},{idKey: "s9", nameKey:"Nine of Spades",iconKey: '🂩'},{idKey: "h9", nameKey:"Nine of Hearts",iconKey: '🂹'},{idKey: "d9", nameKey:"Nine of Diamonds",iconKey: '🃉'},{idKey: "c9", nameKey:"Nine of Clubs",iconKey: '🃙'},{idKey: "s10", nameKey:"Ten of Spades",iconKey: '🂪'},{idKey: "h10", nameKey:"Ten of Hearts",iconKey: '🂺'},{idKey: "d10", nameKey:"Ten of Diamonds",iconKey: '🃊'},{idKey: "c10", nameKey:"Ten of Clubs",iconKey: '🃚'}]

// const jackCards = [{idKey: "s11", nameKey:"Jack of Spades",iconKey: '🂫'},{idKey: "h11", nameKey:"Jack of Hearts",iconKey: '🂻'},{idKey: "d11", nameKey:"Jack of Diamonds",iconKey: '🃋'},{idKey: "c11", nameKey:"Jack of Clubs",iconKey: '🃛'}]; // add 1 ability

// const knightCards = [{idKey: "s12", nameKey:"Knight of Spades",iconKey: '🂬'},{idKey: "h12", nameKey:"Knight of Hearts",iconKey: '🂼'},{idKey: "d12", nameKey:"Knight of Diamonds",iconKey: '🃌'},{idKey: "c12", nameKey:"Knight of Clubs",iconKey: '🃜'}] // add 2 abilities

// const queenCards = [{idKey: "s13", nameKey:"Queen of Spades",iconKey: '🂭'},{idKey: "h13", nameKey:"Queen of Hearts",iconKey: '🂽'},{idKey: "d13", nameKey:"Queen of Diamonds",iconKey: '🃍'},{idKey: "c13", nameKey:"Queen of Clubs",iconKey: '🃝'}] // add for each ability 2

// const kingCards = [{idKey: "s14", nameKey:"King of Spades",iconKey: '🂮'},{idKey: "h14", nameKey:"King of Hearts",iconKey: '🂾'},{idKey: "d14", nameKey:"King of Diamonds",iconKey: '🃎'},{idKey: "c14", nameKey:"King of Clubs",iconKey: '🃞'}] // add for each ability 1

// const aceCards = [{idKey: "s1", nameKey:"Ace of Spades",iconKey: '🂡'},{idKey: "h1", nameKey:"Ace of Hearts",iconKey: '🂱'},{idKey: "d1", nameKey:"Ace of Diamonds",iconKey: '🃁'},{idKey: "c1", nameKey:"Ace of Clubs",iconKey: '🃑'}] // 1 negative and 2 positive and 1 for each

// const specials = [{idKey: "b0", nameKey:"The Sparrow",iconKey: '🀐'}, {idKey: "s0", nameKey:"The Sun",iconKey: '🎴'}] // 4 positive and 1 for each

// const joker = {idKey: "j0", nameKey:"Joker",iconKey: '🃟'} // fnct adds joker to discard

// const player = {
//   drawNumK: 5,
//   subAmtNextK: 0,
//   subAmtAllK: 0,
//   subRemoveJsK: 0,
//   subDamageK: 0,
//   numCounteredK: 0,
//   multiplierNextK: false,
//   multiplierAllK: false,
// }

// const playerCards = {
//   deck: [],
//   hand: [],
//   play: []
// };

// const opponents = [{
//   idK: 1,
//   nameK: 'cat',
//   jokersK: 4,
//   abilitiesK: ['draw1LessK'],
// }]

// const oppAbilities = {
//   draw1LessK: {
//     nameK: 'draw',
//     rulesK: 'Draw 1 less card next turn',
//     cost: -3,
//     fncK: (playerObj, deck, play, amt=0) => {
//       playerObj.drawNumK -= 1;
//     }
//   }
// }

// const playerAbilities = {
//   draw1MoreK: {
//     nameK: 'draw',
//     rulesK: 'Draw 1 card',
//     cost: 3,
//     fncK: (playerObj, deck, play, amt=0) => {
//       playerObj.drawNumK += 1;
//     }
//   }
// }


// // on start
// // create node loop
// // attach nodes
// // later---
// // create function abilities and attach to data


// // render 
// // iterate through cards and place card node in zone if in deck face down otherwise face up?
// // {idKey: "d7", nameKey:"Seven of Diamonds",iconKey: '🃇', node: <>, currentZone: 'hand' | 'discard' | 'deck', position: {top: , left: }}



// // select all with data-card
// // get getBoundingClientRect attack to data
// // render
// // iterate and get get new getBoundingClientRect and invert and translate to old position
// // add animation class
// // remove transform
// // wait 500 + 100 for each card
// // remove animation class


// // start with draw 5




// const wrapper1Node = document.querySelector(".wrapper1"); // deck discard hand
// const wrapper2Node = document.querySelector(".wrapper2");



// let newDiv = document.createElement("div");
// newDiv.classList.add('jk');
// newDiv.textContent = '🃟';
  
// wrapper1Node.appendChild(newDiv);

// const originalPosition = newDiv.getBoundingClientRect();

// setTimeout(()=>{
//   wrapper1Node.removeChild(newDiv);
//   wrapper2Node.appendChild(newDiv);
  
//   // flip.forEach(function(f) {
//   var last = newDiv.getBoundingClientRect();

//   var invert = {
//     top: originalPosition.top - last.top,
//     left: originalPosition.left - last.left
//   };
//   const trans = `translate(${invert.left}px, ${invert.top}px)`
//   console.log(trans)
//   newDiv.style.transform = trans;
  
//   setTimeout(() => {
//     newDiv.classList.add("enable-transitions");
//     newDiv.style.transform = "";
//   }, 500);
// // });

  
// // // now after a frame to render, play all
// // requestAnimationFrame(function() {
// //   // flip.forEach(function(f) {
// //     newDiv.classList.add("enable-transitions");
// //     newDiv.style.transform = "";
// //   // });
// // });
// }, 5000)



// // // Perform "First" step for all elements
// // let flip = [...jkNodes].map(function(element) {
// //   return {
// //     element,
// //     first: element.getBoundingClientRect()
// //   };
// // });

// // console.log(flip);



// // // Get the "Last" position and invert
// // flip.forEach(function(f) {
// //   var last = f.element.getBoundingClientRect();
// //   var invert = {
// //     top: f.first.top - last.top,
// //     left: f.left.top - last.left
// //   };
// //   f.element.style.transform = `translate(${invert.left}px, ${invert.top}px)`;
// // });

// // // now after a frame to render, play all
// // requestAnimationFrame(function() {
// //   flip.forEach(function(f) {
// //     f.element.classList.add("enable-transitions");
// //     f.element.style.transform = "";
// //   });
// // });
