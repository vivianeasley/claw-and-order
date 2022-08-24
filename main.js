import './style.css'

let cardIcons = ['🂢','🂲','🃂','🃒','🂣','🂳','🃃','🃓','🂤','🂴','🃄','🃔','🂥','🂵','🃅','🃕','🂦','🂶','🃆','🃖','🂧','🂷','🃇','🃗','🂨','🂸','🃈','🃘','🂩','🂹','🃉','🃙','🂪','🂺','🃊','🃚'];
let faceIcons = ['🂫', '🂻', '🃋', '🃛', '🂬', '🂼', '🃌', '🃜', '🂭', '🂽', '🃍', '🃝', '🂮', '🂾', '🃎', '🃞'];
let aceIcons = ['🂡', '🂱', '🃁', '🃑'];

let mf = 'Mr. Fluffy Pants';

let rDialog = [`You &%$#, you're just toying with us aren't you!`, `Is this a game to you!!! There's a backyard full of dead birds and it's got ${mf} written all over it!`, `Well that orphanage certainly didn't burn itself down.`,`Don't play coy with me. I invented coy! I've got a goddamn patent on being coy!`,`You think you're tough! I eat pancakes shaped like your face for breakfast!`, `You think you're tough! I'll pett you 1 too many times!`, `You want to dance tough guy? I'll feed you 5 minutes after your normal dinner time!`, `I don't play by your rules`, `I get results`, `I'm getting too old for this &*^%`, `I'm a dog person`, `Would you like some fishy-lump treats? Well, tough! We're all out!`];

let dialog = {
  d1: [`rI'm detective Rivera.`,`b${mf} do you understand why you are being questioned today?`,`cMeow`,`bYou are currently being held on the suspicion of number of crimes including, but not limited to, murder 1.`,`cMeow, hiss`,`rWhat'd he say! Was that about me?!? Look, you little hairball you're on thin ice. We've got so much dirt on you we're going to put you away for life! We have witnesses…`,`bI'm sorry about my partner. They have a bit of a temper.`,`cMeow`, `bYes ${mf}`, `cMeow`, `bYes, uh huh`, `cMeow`, `bYes, I understand that but... there has to be some kind of understanding we can reach. We are prepared to offer you a good deal in exchange for information on the crime sydicate we know you are part of.`, `cMeow`, `bHe says he's thinking`, `cMeow, meow meow`, `bHe says he'd like to play a game. His game is blackjack but that might be boring for detectives as smart as us so he's spiced it up a bit.`,`bHe says if we win he game he'll answer any questions we have but if we lose he'll have nothing to say until his lawyer arrives.`,`rI'm not here to play games!!!!`,`bAgain I apologize for my partner... how can we say no to such an offer. Lets play your little game.`],
};

let winDialog = ['rTake that!', "cMeow", 'bHe says well played but he still has nothing to say to us, just thanks for helping him pass the time', `rNo thank you ${mf}. That's probably been long enough wouldn't you say detective Bennet?`, 'bYes, we probably have everything we need by now', 'cMeow?', `bThat's correct ${mf}, this was all a distraction to buy us enough time to raid the headquarters, of the most natorious feline crime syndicate in the city.`, 'cMeow, meow, meow', `bYou're wrong ${mf}, we will indeed find evidence we need to make a case against you because, you see, ${mf} there's a mole in your organization and we know exactly where to look.`, 'cMeow, meow, meow', `bHa no, this isn't a bluff, you're going away for a very, very, very long time ${mf}.`];
let loseDialog = ['cMeow, meow, meow', `bHe says we've not only lost but we've waisted his time long enough, his little cat whiskers are sealed until his lawyer arrives. (click to play again)`];

let letters = ['t', 'm', 'r', 's', 'h', 'd', 'c', 'l'];
let suits = letters.slice(3, 7);
let numCards = buildCards(cardIcons, 0);
let faces = buildCards(faceIcons, 9, true);
let aces = aceIcons.map((icon, i)=>{
  return {iconK: icon, valueK: 1, idK: suits[i]}
});

function buildCards (iconSet, startCount, isFace) {
  let count = 0;
  return iconSet.map((icon, i)=>{
    let letter = suits[count]
    count++;
    if (count > 3) count = 0;
    let value = Math.floor(i/4);
    return {idK: letter+(value+startCount), iconK: icon, valueK: isFace ? 10 : value+2}
  });
}
let joker = { iconK: '🃟', valueK: 10 };

let storyMode = true;
let dialogPosition = 0;
let cardRemoval = false;
let level = 1;

let baseDeck;
let deck;
let discard;
let hand;
let hasLost = false;
let hasWon = false;
let soundOn = true;

let playerTurn = {
  tK: 0, // total
  mK: 23, // max
  rK: 2, // required
  sK: 0, // spades
  hK: 15, // hearts
  dK: 0, // diamonds
  cK: 0, // clubs
  lK: 0, // face cards
}

let ga = (c) => document.querySelectorAll(c);
let gn = (c) => document.querySelector(c);

let areas = ga('.zone-area');
let controlsNode = gn('.controls');
let controlNodes = controlsNode.querySelectorAll('div');
let textArea = gn('.text-area');
let storyArea = gn('.story-area');
let pDeckN = areas[0];
let pHandN = areas[1];
let pDiscardN = areas[2];
let statsNode = ga('span');

let isClickable = (val) => {
  return {c0: !hasLost,
  c1: playerTurn.cK > 19,
  c2: playerTurn.sK > 19,
  c3: playerTurn.dK > 19,
  c4: playerTurn.sK > 59 &&
  playerTurn.cK > 59 &&
  playerTurn.dK > 59,
  c5: playerTurn.sK > 59 &&
  playerTurn.cK > 59 &&
  playerTurn.dK > 59 &&
  playerTurn.hK > 59}[val]
}


const aC = (p, c)=>p.appendChild(c.nodeK);
const gC = (c)=>{
  c.nodeK = document.createElement("div");
  c.nodeK.classList.add('c');
  c.nodeK.textContent = c.iconK;
  c.nodeK.dataset.id = c.idK;
  return c;
}

let abilities = {
  pass: (playerObj) => {
      if (hasLost) return;
      print('wWe pass the turn');
      let diff = playerObj.mK - playerObj.tK;
      if (playerObj.mK < playerObj.tK) {
          hasLost = true;
          finish(false); 
          return
      };
      if (hand.length < playerObj.rK) {
        print('bHe says you have to draw more cards to pass.', true);
        return;
      }
      playerTurn.hK -= diff;
      print(`bWe lost ${diff} hearts`);
      if (diff > 5 && diff < 10) print('cMeow');
      if (diff > 10) print('cPurrr');
      if (diff < 5) print('cHisss');
      move(hand, discard, hand.length);
    },
  add: (playerObj) => {
      if (isClickable('c1')) {
        playerTurn.cK -= 20;
        playerObj.tK += 2;
        print('wWe use the add 2 ability');
      }
    },

  subtract: (playerObj) => {
      if (isClickable('c2')) {
        playerTurn.sK -= 20;
        playerObj.tK -= 3;
        print('wWe use the subtract 3 ability');
        if (playerObj.tK < 0) {
          print('cHe says: Very tricky');
        }
      }
  },
  redraw: (playerObj) => {
      if (isClickable('c3')) {
        playerTurn.dK -= 20;
        move(hand.reverse(), discard, 1);
        drawFromDeck();
        print('wWe redraw the last card');
      }
  },
  remove: (playerObj) => {
      print('bMr. Fluffy says you can click on a discarded card to remove it from your deck forever!', true)

      if (discard && discard.length === 0) {
        print('bHe says you need to have at least 1 card in your discard!', true)
        return;
      }

      if (isClickable('c4')) {
        playerTurn.sK -= 60;
        playerTurn.cK -= 60;
        playerTurn.dK -= 60;
        cardRemoval = true;
      }
  },
  addFaceCard:(playerObj) => {
      if (isClickable('c5')) {
        playerTurn.sK -= 60;
        playerTurn.cK -= 60;
        playerTurn.dK -= 60;
        playerTurn.hK -= 60;
        let newface = faces[getRandomIntInclusive(0, faces.length)];
        newface = gC(newface);
        discard.push({...newface});
        baseDeck.push({...newface});
        playerTurn.mK += 1;
        console.log(playerTurn)
        print(`bFor each face card added to your deck he'll raise the max by 1. If you win a round with 10 or more face cards you win the game and he'll tell us everything we want to know.`, true)
      }
  }
}

// Add events //////////////////////////////////
document.addEventListener('keydown', (e) => {
  if (e.key == ' ') {
    if (storyMode) {
      storyArea.innerHTML = '';
      storyMode = false;
      dialogPosition = 0;
      showGame();
    }
  }
  if (e.key == 's') {
    soundOn = false;
  }
});

storyArea.addEventListener('click', ()=> {
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
    storyArea.innerHTML = '';
    storyMode = false;
    dialogPosition = 0;
    showGame();
  }
})

function showStory () {
  const arr2 = ga('.story');
  arr2.forEach((el)=> {
    el.classList.remove('hide')
  })
  const arr1 = gn('.game');
  arr1.classList.add('hide')
}

function showGame () {
  const arr1 = gn('.game');
  arr1.classList.remove('hide')
  const arr2 = ga('.story');
  arr2.forEach((el)=> {
    el.classList.add('hide')
  })
}

controlsNode.addEventListener('click', (e)=> {
  if (!e.target.dataset.f) return;
  abilities[e.target.dataset.f](playerTurn);
  checkWin();
  render();
})

// hit me
pDeckN.addEventListener('click', ()=>{
  if (playerTurn.tK > 23) {
    print('bMr. Fluffly says that you went over 23. Either buy an ability or pass to lose the game (followed by meniacal cat laughter.)', true);
    return; 
  }
  drawFromDeck();

})

function drawFromDeck () {
    // if you deck is 0 shuffle your library
    if (deck.length === 0) {
      let reShuffleCards = discard.splice(0, discard.length)
      shuffle(reShuffleCards)
      deck = [...reShuffleCards]
    }
  
    // draw cards
    move(deck, hand, 1);
  
    // add to abilities
    let letter = hand[hand.length - 1].idK.charAt(0);
    let num = parseInt(hand[hand.length - 1].idK.charAt(1), 10);
    if (num > 7) print('r'+rDialog[getRandomIntInclusive(0, rDialog.length)])
    playerTurn[letter+'K']+=(num+2);
  
    // recalculate total
    let cTotal = 0;
    playerTurn.tK = hand.reduce((pre, cur) => pre + cur.valueK,
    cTotal);
    checkWin();
    render();
}

pDiscardN.addEventListener('click', (e)=>{
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
})

// Main game loop and setup //////////////////////////////////

init()
function init () {
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
  areas.forEach(n=>n.innerHTML='')
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

// general function //////////////////////////////////

function genPlayerDeck () {
  let cards = numCards.map((c, i)=>{
    gC(c);
    return c;
  })
  return cards;
}

function shuffle (arr) {
  return arr.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
}

function move (a, t, num=1) {
  // a = array
  // t = targetArray
  let j = 0;
  if (a.length === 0 || num > a.length) return;
  let i = a.length
  let cards = a.splice(0, num);
  cards.reverse().forEach((c)=>t.push(c))
}

let shuffleString = str => str.split('').sort(function(){return 0.5-Math.random()}).join('');

function print (text, important, big) {
  let node = document.createElement(big ? "h2" : "div");
  let pre = {
    w: 'Detectives: ',
    c: `${mf}: `,
    r: 'Rivera: ',
    b: 'Bennet: '
  }

  const character = text.substring(0, 1);
  if (storyMode || important) {
    if (character === 'c') sound(shuffleString('hgklrsm'), 0.1);
    if (character === 'r') sound(shuffleString('acXUeTVbf'), 0.1);
    if (character === 'b') sound(shuffleString('ZYXUTV'), 0.1);
    if (character === 'w') sound(shuffleString('VVUXcZaXUTfYe'), 0.1);
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

function finish (isWin) {
  if (isWin) {
    hasWon = true;
    storyMode = true;
    showStory('dagdsa');
    print('bWe did it we won!', true);
    return;
  }
  hasLost = true;
  storyMode = true;
  showStory();
  print('rGoddamit we lost!', true);
}

function checkWin () {
  if (playerTurn.tK === playerTurn.mK) {
    const numFaces = countFaces();
    if (numFaces > 19) {
      finish(true)
      return;
    }
    print(`rWe got 23!`, true, true)
    print(`bHe says that for winning a round he's added an Ace to our deck and a Joker. Aces add 1 to our total but 11 to our stash. Jokers add 10 to our total and nothing to our stash. Also, he's added 60 to our entire stash!`);
    let newJoker = {...joker, ...{idK: "j"+level}}
    newJoker = gC(newJoker);
    baseDeck.push(newJoker);
    let randAce = aces[getRandomIntInclusive(0, 3)];
    let newAce = {...randAce, ...{idK: randAce.idK+(11+level)}};
    newAce = gC(newAce);
    baseDeck.push(newAce);
    level++;
    playerTurn.sK += 20;
    playerTurn.cK += 20;
    playerTurn.dK += 20;
    playerTurn.hK += 20;
    playerTurn.tK = 0;
    playerTurn.rK += 1;
    init();
  }
}

function countFaces () {
  let numFaces = 0;
  const faces = baseDeck.forEach((c)=> {
    let numId = parseInt(c.idK.substring(1), 10);
    if (numId > 8) numFaces++;
  })
  return numFaces
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


function sound (D, len) {
  if(!D || !soundOn)return;
  let I=+len;
  window.AudioContext = window.AudioContext||window.webkitAudioContext;
  let ctx = new AudioContext;
  if (!ctx) return;
  let G=ctx.createGain();
  for(let i=0;i<D.length;i++) {
    let oc = ctx.createOscillator();
    if(D[i=+i]&&D[i]!="0")
    oc.connect(G),
    G.connect(ctx.destination),
    oc.start(i*I+.3),
    oc.frequency.setValueAtTime(440*1.06**(-105+D.charCodeAt(i)),i*I+.3),
    oc.type='sine',            // or triangle or square or sawtooth
    G.gain.setValueAtTime(.5,i*I+.3),
    G.gain.setTargetAtTime(.001,i*I+.3+.1,.05),
    oc.stop(i*I+.3+I-.01);
  }

}