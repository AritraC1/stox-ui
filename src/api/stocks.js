import axios from "axios";

export const fetchStocks = async (page, limit = 20) => {
  const res = await axios.get(`http://localhost:3001/stocks?page=${page}&limit=${limit}`);
  return res.data; // assumed to be an array
};
