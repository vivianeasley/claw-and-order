import './style.css'

// Declare vars
////////////////
let cardValues = [2, 3, 5, 10];
let faceNames = ['Jack', 'Knight', 'Queen', 'King'];
let cardIcons = ['🂢','🂲','🃂','🃒','🂣','🂳', '🃃','🃓','🂥','🂵','🃅','🃕','🂪','🂺','🃊','🃚'];
let faceIcons = ['🂫', '🂻', '🃋', '🃛', '🂬', '🂼', '🃌', '🃜', '🂭', '🂽', '🃍', '🃝', '🂮', '🂾', '🃎', '🃞'];
let aceIcons = ['🂡', '🂱', '🃁', '🃑'];

let mf = 'Mr. Fluffy Pants';

let rDialog = [`You &%$#, you're just toying with us aren't you!`, `Is this a game to you??? There's a backyard full of dead birds and it's got ${mf} written all over it!`, `Well that orphanage certainly didn't burn itself down.`,`Don't play coy with me. I invented coy! I've got a goddamn patent on being coy!`,`You think you're tough! I eat pancakes shaped like your face for breakfast!`, `You think you're tough! I'll pet you one too many times!`, `You want to dance tough guy? I'll feed you five minutes after your normal dinner time!`, `I don't play by your rules.`, `I get results.`, `I'm getting too old for this &*^%.`, `I'm a dog person.`, `Would you like some fishy-lump treats? Well, tough! We're all out!`];

let dialog = {
 d0: [`rI'm detective Rivera.`,`b${mf} do you understand why you are being questioned today?`,`cMeow`,`bYou are currently being held on the suspicion of number of crimes including, but not limited to, murder 1.`,`cMeow, hiss`,`rWhat'd he say! Was that about me?!? Look, you little hairball you're on thin ice. We've got so much dirt on you we're going to put you away for life! We have witnesses…`,`bI'm sorry about my partner. They have a bit of a temper.`,`cMeow`, `bYes ${mf}`, `cMeow`, `bYes, uh huh`, `cMeow`, `bYes, I understand that but... there has to be some kind of understanding we can reach. We're prepared to offer you a good deal in exchange for information on the crime syndicate we know you're part of.`, `cMeow`, `bHe says he's thinking.`, `cMeow, meow meow`, `bHe says he'd like to play a game. His game is blackjack but that might be boring for detectives as smart as us so he's spiced it up a bit.`,`bHe says if we win the game he'll answer any questions we have, but if we lose he'll have nothing to say until his lawyer arrives.`,`rI'm not here to play games!!!!`,`bAgain, I apologize for my partner... how can we say no to such an offer. Let's play your little game.`],
 d1: [`cMeow, meow.`, `bHe says we're doing well enough that he'd like to raise the stakes. We're now required to draw three cards each round. In return, if we win he'll lead us to a vast treasure he buried.`, `rTreasure you say...`, `bWhoa now Rivera. Let's not have another “It's a Mad Mad Mad Mad World” debacle. We accept your terms ${mf}.`],
 d2: [`rYou seem to be sweating ${mf}, how about you add another required card draw for... let's say the location of your secret lair.`, `cMeow.`, `bHe says cats don't sweat and he'd be more than happy to give us more information if we make the game harder.`],
 d3: [`rAgain! more required cards to draw! We're taking you down ${mf} with your own game!`, `cMeow, hiss, hiss, rawr, hiss`, `rLet's dance.`]
};

let winDialog = ['rTake that!', "cMeow", 'bHe says well played but he still has nothing to say to us - just thanks for helping him pass the time.', `rNo, thank you ${mf}. That's probably been long enough wouldn't you say Detective Bennet?`, 'bYes, we probably have everything we need by now.', 'cMeow?', `bThat's correct ${mf}. This was all a distraction to buy us time to raid the headquarters of the most notorious feline crime syndicate in the city.`, 'cMeow, meow, meow', `bYou're wrong ${mf}. We will indeed find evidence we need to make a case against you because, you see, ${mf} there's a mole in your organization and we know exactly where to look.`, 'cMeow, meow, meow', `bHa no, this isn't a bluff. You're going away for a very, very, very long time ${mf}.`];
let loseDialog = ['cMeow, meow, meow', `bHe says it looks like our luck has run out. His little cat whiskers are sealed until his lawyer arrives. Better luck next time detectives. (Click to play again.)`];


let symbols = {'s':'♠', 'h':'♥', 'd':'♦', 'c':'♣'}
let letters = ['s', 'h', 'd', 'c', 'l', 't', 'm'];
let suits = Object.keys(symbols);
let numCards = buildCards(cardIcons);
let faces = buildCards(faceIcons, true);
let aces = aceIcons.map((icon, i)=>{
  return {iconK: icon, valueK: 1, idK: suits[i], nameK: 'Ace'}
});
let joker = { iconK: '🃟', valueK: 10, nameK: 'Joker' };

let storyMode = true;
let dialogPosition = 0;
let cardRemoval = false;
let xp = 0;
let level = 0;
let min = 2;
let mode = 16;

let baseDeck;
let deck;
let discard;
let hand;
let hasLost = false;
let hasWon = false;
let soundOn = false;

// Originally thought I wouldn't have the space for full names.
// I did and in retrospect should have names these better.
let playerTurn = {
  sK: 0, // spades
  hK: 15, // hearts
  dK: 0, // diamonds
  cK: 0, // clubs
  lK: 0, // face cards
  tK: 0, // total
  mK: 23, // max
}

let ga = (c) => document.querySelectorAll(c);
let gn = (c) => document.querySelector(c);
let ce = (c) => document.createElement(c);

// Get DOM nodes
////////////////
let gameEvents = gn('.main');
let areas = ga('.zone-area');
let controlsNode = gn('.controls');
let controlNodes = controlsNode.querySelectorAll('div');
let textArea = gn('.text-area');
let storyArea = gn('.story-area');
let pDeckN = areas[0];
let pHandN = areas[1];
let pDiscardN = areas[2];
let statsNode = ga('span');
let selectNode = gn('.select');

let isClickable = (val) => {
  return {c0: playerTurn.cK > 19,
  c1: playerTurn.sK > 19,
  c2: playerTurn.dK > 19,
  c3: playerTurn.sK > 9 &&
  playerTurn.cK > 9 &&
  playerTurn.dK > 9,
  c4: playerTurn.sK > 59 &&
  playerTurn.cK > 59 &&
  playerTurn.dK > 59 &&
  playerTurn.hK > 59}[val]
}

let cl = (n) => n.innerHTML = '';
let aC = (p, c)=>p.appendChild(c.nodeK);
let gC = (c)=>{
  c.nodeK = ce("div");
  c.nodeK.classList.add('c');
  c.nodeK.textContent = c.iconK;
  c.nodeK.dataset.id = c.idK;
  c.nodeK.dataset.f = 'select';
  return c;
}

// Abilities dictionary (all game buttons and clickable areas)
///////////////////////////////////////////
let abilities = {
  pass: () => {
      if (hasLost || (hand.length === 0 && discard.length === 0)) return;
      print('wWe pass the turn.', false, false, true);
      let diff = playerTurn.mK - playerTurn.tK;
      if (playerTurn.mK < playerTurn.tK) {
          hasLost = true;
          finish(false); 
          return
      };
      if (hand.length < min) {
        print('bHe says you have to draw more cards to pass.', true);
        return;
      }
      if(hand.length > 5){
        let extra = hand.length - 5;
        playerTurn.cK +=extra*3;
        playerTurn.dK +=extra*3;
        playerTurn.hK +=extra*3;
        playerTurn.sK +=extra*3;
        print('bWe added extra to our stash for drawing over 3 cards (extra x 3 of each stash)!', true);
      }
      playerTurn.hK -= diff;
      if (playerTurn.hK < 1) {
        finish(false);
        return;
      }
      playerTurn.tK = 0;
      xp++;
      progressStory();
      print(`bWe lost ${diff} hearts`);
      if (diff > 5 && diff < 10) print('cMeow');
      if (diff > 10) print('cPurrr');
      if (diff < 5) print('cHisss');
      move(hand, discard, hand.length);
    },
  add: () => {
      if (isClickable('c0')) {
        playerTurn.cK -= 20;
        playerTurn.tK += 2;
        print("wWe use the 'add 2' ability", false, false, true);
      }
    },

  subtract: () => {
      if (isClickable('c1')) {
        playerTurn.sK -= 20;
        playerTurn.tK -= 3;
        print("wWe use the 'subtract 3' ability", false, false, true);
      }
  },
  redraw: () => {
      if (isClickable('c2')) {
        playerTurn.dK -= 20;
        move(hand.reverse(), discard, 1);
        drawFromDeck();
        print('wWe redraw the last card', false, false, true);
      }
  },
  remove: () => {
    if (cardRemoval) {
      print('bMr. Fluffy Pants says we need to tap on a card.', true)
    }
      print('bMr. Fluffy Pants says you can click on a discarded card to remove it from your deck forever!', true)

      if (discard && discard.length === 0) {
        print('bHe says you need to have at least 1 card in your discard!', true)
        return;
      }

      if (isClickable('c3')) {
        playerTurn.sK -= 10;
        playerTurn.cK -= 10;
        playerTurn.dK -= 10;
        cardRemoval = true;
      }
  },
  addFaceCard:() => {
      if (isClickable('c4')) {
        playerTurn.sK -= 60;
        playerTurn.cK -= 60;
        playerTurn.dK -= 60;
        playerTurn.hK -= 60;
        let newface = faces[getRandomIntInclusive(0, faces.length - 1)];
        newface = gC(newface);
        let newId = newface.idK + baseDeck.length;
        discard.push({...newface, ...{idK: newId}});
        baseDeck.push({...newface, ...{idK: newId}});
        playerTurn.mK += 3;
        print(`bFor each face card added to your deck he'll raise the max by 3. If you win a round with 20 or more Ace, Joker, or face cards you win the game and he'll tell us everything we want to know.`, true)
      }
  },
  skip: () =>{
    if (!storyMode) return;
    if (hasLost) location.reload();
    if (storyMode) {
      cl(storyArea);
      storyMode = false;
      dialogPosition = 0;
      showGame();
    }
  },
  difficulty: () =>{
    if (level > 0) return;
    if (mode === 16) {
      mode = 8;
      print(`bWe've switched to medium difficulty`, true, true);
    } else if (mode === 8) {
      mode = 4;
      print(`bWe've switched to hard difficulty`, true, true);
    } else {
      mode = 16
      print(`bWe've switched to easy difficulty`, true, true);
    }
  },
  sound: () => {
    soundOn = !soundOn
    print(`bSound toggled`, true, true);
  },
  story: () => {
    if (hasLost && !loseDialog[dialogPosition] || hasWon && !winDialog[dialogPosition]) {
      location.reload();
    }
    let speech
    if (hasWon) {
      speech = winDialog[dialogPosition];
    } else if (hasLost) {
      speech = loseDialog[dialogPosition];
    } else {
      speech = dialog['d'+level][dialogPosition];
    }
    
    if (storyMode && speech) {
      print(speech)
      dialogPosition++;
    } else {
      cl(storyArea)
      storyMode = false;
      dialogPosition = 0;
      showGame();
    }
  },
  draw: () => {
    if (playerTurn.tK > playerTurn.mK) {
      print(`bMr. Fluffy Pants says that you went over ${playerTurn.mK}. Either buy an ability or pass to lose the game (followed by maniacal cat laughter.)`, true);
      return; 
    }
    if (deck.length === 0 && discard.length === 0) return;
    drawFromDeck();
  }, 
  select: (e) => {
    if (!cardRemoval || !e.target.dataset.id) return;
    for (let i = 0; i < discard.length; i++) {
      if (e.target.dataset.id === discard[i].idK) {
        discard.splice(i, 1);
        render();
      }
    }
    for (let i = 0; i < baseDeck.length; i++) {
      if (e.target.dataset.id === baseDeck[i].idK) {
        baseDeck.splice(i, 1);
        render();
      }
    }
    cardRemoval = false;
  }
}

// Ability functions
function showStory () {
  const arr2 = ga('.story');
  arr2.forEach((el)=> {
    el.classList.remove('hide')
  })
  const gameNode = gn('.game');
  gameNode.style.zIndex = 0;
  gameNode.classList.add('hide')
}

function showGame () {
  const gameNode = gn('.game');
  gameNode.style.zIndex = 100;
  gameNode.classList.remove('hide')
  const arr2 = ga('.story');
  arr2.forEach((el)=> {
    el.classList.add('hide')
  })
}

function drawFromDeck () {
    // if you deck is 0 shuffle your library
    if (deck.length === 0) {
      let reShuffleCards = discard.splice(0, discard.length)
      shuffle(reShuffleCards)
      deck = [...reShuffleCards]
    }
  
    // draw cards
    move(deck, hand, 1);

    // If joker lose half hearts
    let lastCard = hand[hand.length - 1]?.idK;
    if (lastCard && lastCard[0] === 'j') {
      print(`bMr. Fluffy Pants says we drew a joker so we lose half our hearts.`, true, true);
      playerTurn.hK = Math.ceil(playerTurn.hK/2);
    }
  
    // add to abilities
    let currentCard = hand[hand.length - 1];
    if (currentCard.valueK > 5) print('r'+rDialog[getRandomIntInclusive(0, rDialog.length - 1)])
    playerTurn[currentCard.idK[0]+'K']+=(currentCard.valueK+2);
  
    // recalculate total
    let cTotal = 0;
    playerTurn.tK = hand.reduce((pre, cur) => pre + cur.valueK,
    cTotal);
    checkWin();
    render();
}

// Add events event listeners
//////////////////////////////////

// Gets data attribute and trigger appropriate ability function
gameEvents.addEventListener('click', (e)=> {
  if (!e.target.dataset.f) return;
  abilities[e.target.dataset.f](e);
  if (!storyMode)checkWin();
  render();
})

// Key controls
document.addEventListener('keydown', (e) => {
  if (e.key == ' ') {abilities.skip();return;}
  if (e.key == 's') {soundOn = !soundOn;return;}
  if (e.key == 'd') {abilities.difficulty();return;}
});

// Main game loop and setup 
//////////////////////////////////
init()
function init () {
  sound('ahgdcaa--ahgdckk---ojkghhc--mgjch', 'sine', 0.3);
  if (!baseDeck) baseDeck = genPlayerDeck();
  playerTurn.tK = 0;
  deck = shuffle([...baseDeck]);
  discard = [];
  hand = [];
  gameLoop();
}

function gameLoop () {
  render();
}

function render () {
  updateDeckSelect()
  // Start flip
  let allCardsInPlay = ga('.c');
  let flip = [...allCardsInPlay].map(function(element) {
    element.classList.remove("enable-transitions");
    return {
      el: element,
      first: element.getBoundingClientRect()
    };
  });

  // render
  areas.forEach(n=>cl(n))
  deck.forEach(c=>aC(pDeckN, c))
  hand.forEach(c=>aC(pHandN, c))
  discard.forEach(c=>aC(pDiscardN, c))
  statsNode.forEach((n, i)=>{
    if (letters[i] === "l") {
      playerTurn.lK = countFaces();
      n.textContent = playerTurn.lK; 
    } else {
      n.textContent = playerTurn[letters[i]+'K'];
    }
  })
  controlNodes.forEach((n, i)=>{
    if (isClickable('c'+i)) {
      n.style.opacity = '1'
    } else {
      n.style.opacity = '0.1'
    }
  })
  // Finish flip
  flip.forEach((n) => {
    var last = n.el.getBoundingClientRect();
    var invert = {
      top: n.first.top - last.top,
      left: n.first.left - last.left
    };
    n.el.style.transform = `translate(${invert.left}px, ${invert.top}px)`
    setTimeout(() => {
        n.el.classList.add("enable-transitions");
        n.el.style.transform = "";
      }, 200);
  });
}

// general functions 
//////////////////////////////////

// Build all of the cards data
function buildCards (iconSet, isFace) {
  return iconSet.map((icon, i)=>{
    let count = Math.floor(i/4);
    let letter = suits[i%4];
    let num = cardValues[count];
    return {idK: letter+(isFace ? i+10 : num), iconK: icon, valueK: isFace ? 10 : cardValues[count], nameK: isFace ? faceNames[count] : undefined }
  });
}


// Add dom nodes to all cards
function genPlayerDeck () {
  let cards = numCards.map((c, i)=>{
    gC(c);
    return c;
  })
  return cards;
}

// Basic card shuffle
function shuffle (arr) {
  return arr.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
}

// Updates the dropdown that shows you all cards in your base deck
function updateDeckSelect () {
  cl(selectNode);
  let option = ce("option");
  option.textContent = 'Base Deck';
  aC(selectNode, {nodeK: option})
  baseDeck.sort((a, b) => a.valueK - b.valueK).forEach((card)=>{
    option = ce("option");
    let type = symbols[card.idK[0]];
    option.textContent = `${type ? type : card.idK[0]}-${card.nameK ? card.nameK : card.valueK}`;
    aC(selectNode, {nodeK: option})
  })
}

// Function for moving cards between zones
function move (a, t, num=1) {
  // a = array
  // t = targetArray
  let j = 0;
  if (a.length === 0 || num > a.length) return;
  let i = a.length
  let cards = a.splice(0, num);
  cards.reverse().forEach((c)=>t.push(c))
}

// Shuffle text string. Used for randomizing speech sounds
let shuffleString = str => str.split('').sort(function(){return 0.5-Math.random()}).join('');

// Manages printing all dialog to the story areas
function print (text, important, big, skipSound) {
  let node = ce(big ? "h2" : "div");
  let pre = {
    w: 'Detectives: ',
    c: `${mf}: `,
    r: 'Rivera: ',
    b: 'Bennet: '
  }

  const character = text.substring(0, 1);
  if (!skipSound) {
    if (storyMode || important) {
      if (character === 'c') sound(shuffleString('hgklrsm'), 0.1);
      if (character === 'r') sound(shuffleString('acXUeTVbf'), 0.1);
      if (character === 'b') sound(shuffleString('ZYXUTV'), 0.1);
      if (character === 'w') sound(shuffleString('VVUXcZaXUTfYe'), 0.1);
    }
  }
  const speech = text.substring(1);
  node.textContent = pre[character] + speech;

  if (important)node.style.color = 'red';
  if (storyMode) {
    storyArea.appendChild(node);
  } else {
    textArea.appendChild(node);
  }
  textArea.scrollTo(0, textArea.scrollHeight);
  storyArea.scrollTo(0, storyArea.scrollHeight);
}

// Call in win or loss to initiate story sequences
function finish (isWin) {
  if (isWin) {
    hasWon = true;
    storyMode = true;
    showStory('dagdsa');
    print('bWe did it, we won!', true);
    return;
  }
  hasLost = true;
  storyMode = true;
  showStory();
  print('rGoddamit, we lost!', true);
}

// Checks if user won or won round and manages it appropriately
function checkWin () {
  if (playerTurn.tK === playerTurn.mK) {
    const numFaces = countFaces();
    if (numFaces > 19) {
      finish(true)
      return;
    }
    print(`rWe got ${playerTurn.mK}!`, true, true, true)
    print(`bHe says that for winning a round he's added an Ace and a Joker to our deck. Aces add 1 to our total but 11 to our stash. Jokers add 10 to our total and nothing to our stash and we lose half our hearts. Also, he's added 20 to our entire stash!`, false, false, true);
    let newJoker = {...joker, ...{idK: "j"+xp}}
    newJoker = gC(newJoker);
    baseDeck.push(newJoker);
    let randAce = aces[getRandomIntInclusive(0, 3)];
    let newAce = {...randAce, ...{idK: randAce.idK+(11+xp)}};
    newAce = gC(newAce);
    baseDeck.push(newAce);
    playerTurn.sK += 20;
    playerTurn.cK += 20;
    playerTurn.dK += 20;
    playerTurn.hK += 20;
    playerTurn.tK = 0;
    xp+=4;
    // Trigger mid way story modes
    progressStory();
    init();
  }
}

// Moves story dialog forward
function progressStory () {
  if (xp%mode === 0) {
    if (level < 3) level++;
    min++;
    print(`bLooks like the minimum number of cards we have to draw to pass is now ${min}.`, true, true)
    storyMode = true;
    showStory();
    print(dialog['d'+level][dialogPosition])
    dialogPosition++;
  }
}

// Count number of Aces, Jokers, and Face cards to determine if player has won game
function countFaces () {
  let faceCards = [...faceNames, 'Joker', 'Ace']
  let numFaces = 0;
  const faces = baseDeck.forEach((c)=> {
    if (faceCards.includes(c.nameK)) numFaces++;
  })
  return numFaces
}

// Just the basic random number generator
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

// Slightly augmented version of XEMs nifty little music player https://xem.github.io/alphabet-piano/
//type: sine triangle square or sawtooth -> "-" pause "a-zA-Z" sounds "1-5" previous note length
function sound (stringNotes, type, musicLength) { 
  if(soundOn === false)return;
  let noteLength;
  let noteLengths = {
    '5': 0.4, // full
    '4': 0.3, // 3 quarters
    '3': 0.2,
    '2': 0.1,
    '1': 0.05,
  }
  let skipList = Object.keys(noteLengths);
  skipList.push('-')
  window.AudioContext = window.AudioContext||window.webkitAudioContext;
  let ctx = new AudioContext();
  let gainNode=ctx.createGain();
  for(let i=0;i<stringNotes.length;i++) {
    noteLength = !isNaN(stringNotes[i+1]) ? noteLengths[stringNotes[i+1]] : musicLength ? musicLength : 0.1;
    let oscNode = ctx.createOscillator();
    if(stringNotes[i=+i]&&!skipList.includes(stringNotes[i])) {
      oscNode.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscNode.start(i*noteLength+.3);
      oscNode.frequency.setValueAtTime(440*1.06**(-105+stringNotes.charCodeAt(i)),i*noteLength+.3);
      oscNode.type= type ? type : 'sine';           
      gainNode.gain.setValueAtTime(.5,i*noteLength+.3);
      gainNode.gain.setTargetAtTime(.001,i*noteLength+.3+.1,.05);
      oscNode.stop(i*noteLength+.3+noteLength-.01);
    }
  }
}