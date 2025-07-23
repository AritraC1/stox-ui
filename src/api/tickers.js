import axios from "axios";

export const fetchTickers = async (page, limit = 20) => {
  const res = await axios.get(`http://localhost:3001/tickers?page=${page}&limit=${limit}`);
  return res.data; // assumed to be an array
};
