import axios from 'axios';

const API_KEY = '35616043-ceede7c463ab26a514eff72f6';
const parameters =
  '&image_type=photo&per_page=40&orientation="horizontal"&safesearch="true"&min_width=320&min_height=213';

async function getCardInfo(query, page) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}${parameters}&page=${page}`;
  try {
    const response = await axios.get(url);
    const data = await response.data;

    return data;
  } catch (error) {
    console.error(error);
  }
}

export default getCardInfo;
