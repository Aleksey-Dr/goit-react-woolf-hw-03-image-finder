import css from './ImageGalleryItem.module.scss';

const ImageGalleryItem = ({ webformatURL, largeImageURL, onOpen }) => {
    return (
        <li onClick={() => onOpen(largeImageURL)} className={css["gallery-item"]}>
            <img src={webformatURL} alt="Item gallery" />
        </li>
    );
};

export default ImageGalleryItem;
