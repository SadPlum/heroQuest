// objects
const dungeon = [[0], [0, 1], [0, 1, 2], [0, 1], [0]];

let equipment = [
  {
    name: "Short Sword",
    att: 2,
    dmg: 2,
    def: 0,
    equiped: true,
    bothHands: false,
  },

  {
    name: "Bow (2H)",
    att: 2,
    dmg: 3,
    def: 1,
    equiped: false,
    bothHands: true,
  },

  {
    name: "Shield",
    att: 0,
    dmg: 0,
    def: 2,
    equiped: true,
    bothHands: false,
  },
];

let hero = {
  currentHP: 10,
  maxHP: 10,
  level: 1,
  baseAtt: 5,
  baseDmg: 5,
  baseDef: 5,
  att: 7,
  dmg: 7,
  def: 17,
  roomIn: dungeon[0][0],
  roomTier: dungeon[0],
  itemRight: equipment[0],
  itemLeft: equipment[2],
};

let listUn = [];

// level up after each room, HP +5 then att or dmg or def +1
let levelUP = () => {
  let statUP = prompt(
    "What would you like to increase, Att, Dmg or Def?"
  ).toLowerCase();
  if (statUP == "att") {
    hero.baseAtt++;
    hero.att++;
    hero.level++;
    hero.maxHP = hero.maxHP + 5;
  } else if (statUP == "dmg") {
    hero.baseDmg++;
    hero.def++;
    hero.level++;
    hero.maxHP = hero.maxHP + 5;
  } else if (statUP == "def") {
    hero.baseDef++;
    hero.def++;
    hero.level++;
    hero.maxHP = hero.maxHP + 5;
  } else {
    alert("Invalid selection.");
    levelUP();
  }
};

// removes item from "right" or "left" hand, takes string
let remove = (hand) => {
  // ensures there's item in hand
  if (
    (hand == "right" && hero.itemRight !== null) ||
    (hand == "left" && hero.itemLeft !== null)
  ) {
    // remove item and lowers stats
    hand == "right" ? (item = hero.itemRight) : (item = hero.itemLeft);
    hero.att -= item.att;
    hero.dmg -= item.dmg;
    hero.def -= item.def;
    hand == "right" ? (hero.itemRight = null) : (hero.itemLeft = null);
    item.equiped = false;
  }
};

// to equip an item
let equip = () => {
  let choice = Number(
    prompt(
      `Which item(s) would you like to equip?\n${unequiped()} (Input number)`
    )
  );
  if (choice > equipment.length) {
    alert("Invalid Choice");
    equip();
  } else if (equipment[choice].equiped === true) {
    alert("Item is already equiped");
    equip();
  }
  // checks for 2 handed item
  else if (
    equipment[choice].bothHands === true &&
    (hero.itemRight == null) & (hero.itemLeft == null)
  ) {
    hero.att += equipment[choice].att;
    hero.dmg += equipment[choice].dmg;
    hero.def += equipment[choice].def;
    hero.itemRight = equipment[choice];
    hero.itemLeft = null;
    equipment[choice].equiped = true;
  } else if (
    equipment[choice].bothHands === true &&
    (hero.itemLeft !== null || hero.itemRight !== null)
  ) {
    let hand = prompt(
      `${equipment[choice].name} is a two handed item. Would you like to unequip both hand to equip it? (yes/no)`
    ).toLowerCase;
    hand === "yes" ? remove("right") && remove("left") : equip();
    hero.att += equipment[choice].att;
    hero.dmg += equipment[choice].dmg;
    hero.def += equipment[choice].def;
    hero.itemRight = equipment[choice];
    hero.itemLeft = null;
    equipment[choice].equiped = true;
  }
  let hand = "";
  while (hand !== "right" || hand !== "left") {
    hand = prompt(
      `Which hand would you like to equip ${equipment[choice].name} in? (right/left)`
    ).toLowerCase;
  }
  if (hand == "right") {
    hero.itemRight = equipment[choice];
    hero.att += equipment[choice].att;
    hero.dmg += equipment[choice].dmg;
    hero.def += equipment[choice].def;
    equipment[choice].equiped = true;
  } else if (hand == "left") {
    hero.itemLeft = equipment[choice];
    hero.att += equipment[choice].att;
    hero.dmg += equipment[choice].dmg;
    hero.def += equipment[choice].def;
    equipment[choice].equiped = true;
  }
};

// returns unquiped items (equip == false)
let unequiped = () => {
  listUn = [];
  let list = "";
  for (const un of equipment) {
    un.equiped === false ? listUn.push(un) : "";
  }
  for (let i = 0; i < listUn.length; i++) {
    list += `${i}: ${listUn[i].name}\n`;
  }
  return list;
};

let swap = () => {
  let ask = "";
  if (hero.itemRight !== null && hero.itemLeft !== null) {
    ask = prompt(`You currently have ${hero.itemRight.name} & ${
      hero.itemLeft.name
    } equiped. 
    Your unequiped items are ${unequiped()}\n
    Would you like to change to swap any weapons?\n 
    (Right, Left, Both or None)
  `).toLowerCase();
  } else if (hero.itemRight !== null && hero.itemLeft == null) {
    ask = prompt(`You currently have ${
      hero.itemRight.name
    } equiped & nothing in your left hand. 
    Your unequiped items are ${unequiped()}\n
    Would you like to change to swap any weapons?\n 
    (Right, Left, Both or None)`);
  } else if (hero.itemRight == null && hero.itemLeft !== null) {
    ask = prompt(`You currently have ${
      hero.itemLeft.name
    } equiped & nothing in your right hand. 
    Your unequiped items are ${unequiped()}\n
    Would you like to change to swap any weapons?\n 
    (Right, Left, Both or None)`);
  } else {
    alert("You have nothing equiped");
    ask = "none";
  }
  if (ask === "both") {
    remove("right");
    remove("left");
  } else if (ask === "right") {
    remove("right");
  } else if (ask === "left") {
    remove("left");
  } else if (ask === "none") {
    return;
  } else {
    alert("Invalid Selection");
    swap();
  }
};

// dungeon[0][0]
const startRoom = {
  position: dungeon[0][0],
  intro:
    "You aware in a dark room. The air is dank and sulfurus. You feel the precense of evil here. Your trusty sword and shield are in your hand, would you like to change to your bow? (yes/no)",
};

// awaken
const awaken = () => {
  const change = prompt(`${startRoom.intro}`);
  if (change == "yes") {
  }
};

// awaken();
