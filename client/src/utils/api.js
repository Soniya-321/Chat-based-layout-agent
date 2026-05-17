import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function sendChatMessage({ message, layout, history }) {
  const response = await axios.post(`${BASE_URL}/chat`, {
    message,
    layout,
    history
  });
  return response.data; 
}