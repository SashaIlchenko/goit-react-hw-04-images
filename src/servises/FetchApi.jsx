import axios from "axios";

const KEY = '32769599-757710318235c73590b6be352'

const fetchImage = async (name, page) => {
    const { data } = await axios.get(
        `https://pixabay.com/api/?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    );
    return data.hits;
};



export default fetchImage;