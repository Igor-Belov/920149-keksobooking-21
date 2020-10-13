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

const getAvatarAdress = function (quantityNearObject) {
  let avatarAdress = [];
  for (let i = 0; i < quantityNearObject; i++) {
    avatarAdress.push(i + 1);
  }
  return shuffle(avatarAdress);
};

const getArrayRandElement = function (arr) {
  let randomNumber = getRandomNumber(arr.length);
  return arr[randomNumber];
};

const getRandomNumber = function (max, min = 0) {
  if (max > min) {
    let randomNumber = Math.floor((min + Math.random() * (max - min + 1)));
    return randomNumber;
  }
  return `Ошибка. Установите максимальное число для генератора, и, опционально, минимальное число`;
};

const getRandomAddress = function () {
  const widthmapX = map.offsetWidth;
  const minmapY = 130;
  const maxmapY = 630;
  const mapX = getRandomNumber(widthmapX);
  const mapY = getRandomNumber(maxmapY, minmapY);
  return {x: mapX, y: mapY};
};

const getRandomSubArray = function (arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (Math.random() > 0.5) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};

const generationNearObject = function (avatarAdress, coordinateX, coordinateY) {
  const NearObject = {
    author: {
      avatar: `img/avatars/user0${avatarAdress}.png`
    },
    offer: {
      title: getArrayRandElement(WORDS),
      address: `${coordinateX}, ${coordinateY}`,
      price: getRandomNumber(10000, 1000),
      type: getArrayRandElement(TYPE_OFFER),
      rooms: getRandomNumber(10, 1),
      guests: getRandomNumber(12, 1),
      checkin: getArrayRandElement(CHECKIN),
      checkout: getArrayRandElement(CHECKOUT),
      features: getRandomSubArray(FEATURES),
      description: getArrayRandElement(WORDS),
      photos: getRandomSubArray(SRC_FOTO),
    },
    location: {
      x: coordinateX,
      y: coordinateY
    }
  };
  return NearObject;
};

const getNearObjects = function (quantityNearObject) {
  const avatarAdress = getAvatarAdress(quantityNearObject);
  let nearObjectsElements = [];
  for (let i = 0; i < quantityNearObject; i++) {
    const coordinate = getRandomAddress();
    nearObjectsElements.push(generationNearObject(avatarAdress[i], coordinate.x, coordinate.y));
  }
  return nearObjectsElements;
};

const getRulerMarkSize = function () {
  let rulerObject = document.createElement(`div`);
  rulerObject.classList.add(`map__pin`);
  mapPins.appendChild(rulerObject);
  let widthMark = rulerObject.clientWidth;
  let heightMark = rulerObject.clientHeight;
  mapPins.removeChild(rulerObject);
  return {width: widthMark, height: heightMark};
};

const getGenerationMark = function (nearObject, MarkWidth, MarkHeight) {
  let newMark = markTemplate.cloneNode(true);
  let newMarkImg = newMark.querySelector(`img`);
  newMark.style.left = `${nearObject.location.x - MarkWidth / 2}px`;
  newMark.style.top = `${nearObject.location.y - MarkHeight}px`;
  newMarkImg.src = `${nearObject.author.avatar}`;
  newMarkImg.alt = `${nearObject.offer.title}`;
  return newMark;
};

const createDOM = function (quantityNearObject) {
  const sizesMark = getRulerMarkSize();
  const nearObjects = getNearObjects(quantityNearObject);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < quantityNearObject; i++) {
    fragment.appendChild(getGenerationMark(nearObjects[i], sizesMark.width, sizesMark.height));
  }
  mapPins.appendChild(fragment);
};

map.classList.remove(`map--faded`);
createDOM(QUANITY_NEAR_OBJECT);

