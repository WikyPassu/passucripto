import "intl";
import "intl/locale-data/jsonp/en.js";
import moment from "moment";
import * as coingecko from "../services/api-coingecko";
import * as dolar from "../services/api-dolar";

export const formatNumber = (format, currency, fractionDigits, number) => {
  let formattedNumber = new Intl.NumberFormat(format, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: fractionDigits
  }).format(number).replace("$", "");
  let newNumber = "";
  for(let i=0; i<formattedNumber.length; i++){
    if(formattedNumber[i] == '.'){
      newNumber += ",";
    }
    else if(formattedNumber[i] == ','){
      newNumber += ".";
    }
    else{
      newNumber += formattedNumber[i];
    }
  }
  return newNumber;
};

export const filter = (fn, a) => {
  const f = [];
  for (let i = 0; i < a.length; i++) {
    if (fn(a[i])) {
      f.push(a[i]);
    }
  }
  return f;
};

const formatSparkline = prices => {
  const sevenDaysAgo = moment().subtract(7, "days").unix();
  let formattedSparkline = prices.map((item, index) => {
    const unixDate = sevenDaysAgo + (index + 1) * 3600;
    const milliseconds = unixDate * 1000;
    let date = moment(milliseconds).format("ddd, DD/MM/YY HH:mm:ss A");
    switch(moment(milliseconds).format("ddd")){
      case "Sun":
        date = date.replace("Sun", "Dom");
        break;
      case "Mon":
        date = date.replace("Mon", "Lun");
        break;
      case "Tue":
        date = date.replace("Tue", "Mar");
      break;
      case "Wed":
        date = date.replace("Wed", "Mie");
        break;  
      case "Thu":
        date = date.replace("Thu", "Jue");
      break;
      case "Fri":
        date = date.replace("Fri", "Vie");
        break;  
      case "Sat":
        date = date.replace("Sat", "Sab");
        break;  
    }
    return {
      timestamp: date,
      value: item
    };
  });
  return formattedSparkline;
};

export const getMarketData = async () => {
  const data = await coingecko.getCryptos();
  const dolarQuote = await dolar.getDolarQuote();
  let newData = data.map(crypto => {
    let perc24h = "-0,0%";
    if(crypto.price_change_percentage_24h != null){
      perc24h = (crypto.price_change_percentage_24h > 0 ? "+" : "") + (crypto.price_change_percentage_24h).toFixed(1) + "%";
      perc24h = perc24h.replace(".", ",");
    }
    return {
      id: crypto.id,
      image: crypto.image,
      symbol: crypto.symbol.toUpperCase(),
      name: crypto.name,
      marketCap: crypto.market_cap,
      perc24h: perc24h,
      price: crypto.current_price,
      pesoPrice: crypto.current_price * dolarQuote
    };
  });
  return newData;
};

export const getCryptoById = async id => {
  const crypto = await coingecko.findCryptoById(id);
  const dolarQuote = await dolar.getDolarQuote();
  let perc24h = "-0,0%";
    if(crypto.price_change_percentage_24h != null){
      perc24h = (crypto.price_change_percentage_24h > 0 ? "+" : "") + (crypto.price_change_percentage_24h).toFixed(1) + "%";
      perc24h = perc24h.replace(".", ",");
    }
  return {
    id: crypto.id,
    image: crypto.image,
    symbol: crypto.symbol.toUpperCase(),
    name: crypto.name,
    rank: crypto.market_cap_rank,
    marketCap: crypto.market_cap,
    perc24h: perc24h,
    price: crypto.current_price,
    pesoPrice: crypto.current_price * dolarQuote,
    high: crypto.high_24h,
    low: crypto.low_24h,
    sparkline: formatSparkline(crypto.sparkline_in_7d.price)
  };
};

export const getCryptosById = async (ids) => {
  const data = await coingecko.findCryptosById(ids);
  const dolarQuote = await dolar.getDolarQuote();
  let newData = data.map(crypto => {
    let perc24h = "-0,0%";
    if(crypto.price_change_percentage_24h != null){
      perc24h = (crypto.price_change_percentage_24h > 0 ? "+" : "") + (crypto.price_change_percentage_24h).toFixed(1) + "%";
      perc24h = perc24h.replace(".", ",");
    }
    return {
      id: crypto.id,
      image: crypto.image,
      symbol: crypto.symbol.toUpperCase(),
      name: crypto.name,
      marketCap: crypto.market_cap,
      perc24h: perc24h,
      price: crypto.current_price,
      pesoPrice: crypto.current_price * dolarQuote
    };
  });
  return newData;
};

export const sort = (order, array) => {
  let aux;
  let flagSwap;
  let newLimit = array.length - 1;

  do{
    flagSwap = false;
    switch(order){
      case "symbolAsc":
        for(let i=0; i<newLimit; i++){
          if(array[i].symbol < array[i+1].symbol){
            aux = array[i];
            array[i] = array[i+1];
            array[i+1] = aux;
            flagSwap = true;
          }
        }
        break;
      case "symbolDesc":
        for(let i=0; i<newLimit; i++){
          if(array[i].symbol > array[i+1].symbol){
            aux = array[i];
            array[i] = array[i+1];
            array[i+1] = aux;
            flagSwap = true;
          }
        }
        break;
      case "priceAsc":
        for(let i=0; i<newLimit; i++){
          if(array[i].price > array[i+1].price){
            aux = array[i];
            array[i] = array[i+1];
            array[i+1] = aux;
            flagSwap = true;
          }
        }
        break;
      case "priceDesc":
        for(let i=0; i<newLimit; i++){
          if(array[i].price < array[i+1].price){
            aux = array[i];
            array[i] = array[i+1];
            array[i+1] = aux;
            flagSwap = true;
          }
        }
        break;
      case "marketCapAsc":
        for(let i=0; i<newLimit; i++){
          if(array[i].marketCap > array[i+1].marketCap){
            aux = array[i];
            array[i] = array[i+1];
            array[i+1] = aux;
            flagSwap = true;
          }
        }
        break;
      case "marketCapDesc":
        for(let i=0; i<newLimit; i++){
          if(array[i].marketCap < array[i+1].marketCap){
            aux = array[i];
            array[i] = array[i+1];
            array[i+1] = aux;
            flagSwap = true;
          }
        }
        break;
    }  
    newLimit--;
  }while(flagSwap);

  return array;
};