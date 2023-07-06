import axios from "axios";

export const getDolarQuote = async () => {
  const url = "https://criptoya.com/api/lemoncash/dai";
  try {
    const res = await axios.get(url);
    return res.data.bid;
  } catch (e) {
    console.log("API-DOLAR: " + e.message);
  }
};