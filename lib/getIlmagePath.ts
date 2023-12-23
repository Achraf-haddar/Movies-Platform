import logo from '../public/logo.jpg';
const getImagePath = (imagePath?: string, fullSize?: boolean) => {
    return imagePath
    ? `http://image.tmdb.org/t/p/${fullSize ? "original": "w500"}/${imagePath}`
    : logo;
}

export default getImagePath;