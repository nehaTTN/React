import axios from 'axios';
const instance=axios.create({
baseURL:'https://react-my-burger-88f22.firebaseio.com/'
});
export default instance;