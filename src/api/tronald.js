import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.tronalddump.io',
  headers: {}
});
