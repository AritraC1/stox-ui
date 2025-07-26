import axios from "axios";

export const fetchStockData = async (symbol) => {
  const res = await axios.get(`http://localhost:3001/stocks/${symbol}`);
  return res.data;
};