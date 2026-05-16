import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';

export async function sendChatMessage({ message, layout, history }) {
  const response = await axios.post(`${BASE_URL}/chat`, {
    message,
    layout,
    history
  });
  return response.data; 
}