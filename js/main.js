"use strict";

const TYPE_OFFER = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const SRC_FOTO = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const WORDS = [`Nulla`, `blandit`, `auctor`, `elit`, `eget`, `pharetra`, `felis`, `Fusce`];

const QUANITY_NEAR_OBJECT = 8;
let avatarAdress = [];
let mapX = 0;
let mapY = 0;
const map = document.querySelector(`.map`);
const markTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPins = map.querySelector(`.map__pins`);

const shuffle = function (arr) {
  let j;
  let temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

const getAvatarAdress = function (QuantityNearObject) {
  for (let i = 0; i < QuantityNearObject; i++) {
    avatarAdress[i] = i + 1;
  }
  avatarAdress = shuffle(avatarAdress);
  return avatarAdress;
};

const getArrayRandElement = function (arr) {
  let randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
};

const getRandomNumber = function (max, min = 0) {
  if (max > min) {
    let randomNumber = Math.floor((min + Math.random() * (max - min + 1)));
    return randomNumber;
  }
  return `Ошибка. Установите максимальное число для генератора, и, опционально, минимальное число`;
};

const adress = function () {
  const widthmapX = map.offsetWidth;
  const minmapY = 130;
  const maxmapY = 630;
  mapX = getRandomNumber(widthmapX);
  mapY = getRandomNumber(maxmapY, minmapY);
};

const getRandomArrayGenerator = function (arr) {
  let j = 0;
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (Math.random() > 0.5) {
      newArr[j] = arr[i];
      j++;
    }
  }
  return newArr;
};

const generationNearObject = function (i) {
  const NearObject = {
    author: {
      avatar: `img/avatars/user0${avatarAdress[i]}.png`
    },
    offer: {
      title: getArrayRandElement(WORDS),
      address: `${mapX}, ${mapY}`,
      price: getRandomNumber(10000, 1000),
      type: getArrayRandElement(TYPE_OFFER),
      rooms: getRandomNumber(10, 1),
      guests: getRandomNumber(12, 1),
      checkin: getArrayRandElement(CHECKIN),
      checkout: getArrayRandElement(CHECKOUT),
      features: getRandomArrayGenerator(FEATURES),
      description: getArrayRandElement(WORDS),
      photos: getRandomArrayGenerator(SRC_FOTO),
    },
    location: {
      x: mapX,
      y: mapY
    }
  };
  return NearObject;
};

const getNearObjects = function (QuantityNearObject) {
  avatarAdress = getAvatarAdress(QuantityNearObject);
  let nearObjectsElements = [];
  for (let i = 0; i < QuantityNearObject; i++) {
    adress();
    nearObjectsElements[i] = generationNearObject(i);
  }
  return nearObjectsElements;
};

map.classList.remove(`map--faded`);
const nearObjects = getNearObjects(QUANITY_NEAR_OBJECT);

const getRulerMark = function () {
  let rulerObject = document.createElement(`div`);
  rulerObject.classList.add(`map__pin`);
  mapPins.appendChild(rulerObject);
  let widthMark = rulerObject.clientWidth;
  let heightMark = rulerObject.clientHeight;
  mapPins.removeChild(rulerObject);
  return [widthMark, heightMark];
};
const sizesMark = getRulerMark();

const getGenerationMark = function (numberObject) {
  let newMark = markTemplate.cloneNode(true);
  let newMarkImg = newMark.querySelector(`img`);
  let widthMark = sizesMark[0];
  let heightMark = sizesMark[1];
  newMark.style.left = `${nearObjects[numberObject].location.x - widthMark / 2}px`;
  newMark.style.top = `${nearObjects[numberObject].location.y - heightMark}px`;
  newMarkImg.src = `${nearObjects[numberObject].author.avatar}`;
  newMarkImg.alt = `${nearObjects[numberObject].offer.title}`;
  return newMark;
};

const createDOM = function (QuantityNearObject) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < QuantityNearObject; i++) {
    fragment.appendChild(getGenerationMark(i));
  }
  mapPins.appendChild(fragment);
};

createDOM(QUANITY_NEAR_OBJECT);
