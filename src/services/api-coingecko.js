import axios from "axios";

export const getCryptos = async () => {
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&per_page=250";
  try {
    let res = await axios.get(url);
    return res.data;
  } catch (e) {
    console.log("API-COINGECKO: " + e.message);
  }
};

export const findCryptoById = async id => {
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&ids=" + id;
  try {
    let res = await axios.get(url);
    return res.data[0];
  } catch (e) {
    console.log("API-COINGECKO: " + e.message);
  }
};

export const findCryptosById = async ids => {
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&ids=" + ids;
  try{  
    let res = await axios.get(url);
    return res.data;
  } catch (e) {
    console.log("API-COINGECKO: " + e.message);
  }
};