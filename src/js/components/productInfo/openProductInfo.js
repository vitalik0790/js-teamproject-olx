import axios from 'axios';
import { data } from '../../data/data';
import { openProductInfo } from './productInfo';

const openProductInfoBtnRef = document.querySelector('.openProductInfo-js');

async function fetchCards() {
  const response = await axios.get(`${data.baseURL}/call/specific/electronics`);
  const cards = response.data;
  // console.log(cards);

  return cards;
}

openProductInfoBtnRef.addEventListener('click', onClickBtn);
function onClickBtn() {
  fetchCards().then(cards => openProductInfo(cards[5]));
}
