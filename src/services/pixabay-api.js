import axios from "axios";

const KEY_TO_API = '35129314-12d9f6cafbe4df38ad9bc5f6b';

export async function fetchImages(term, currentPage) {
    const baseURL = 'https://pixabay.com/api/';
    const keyhURL = `?key=${KEY_TO_API}`;
    const searchURL = `&q=${term}`;
    const pageURL = `&page=${currentPage}`;
    const backURL = '&image_type=photo&orientation=horizontal&per_page=12';
    const url = baseURL + keyhURL + searchURL + pageURL + backURL;

    const response = await axios.get(url);
    const images = await response.data;

    return images;
};