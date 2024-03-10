import ImageGalleryItem from 'components/ImageGallery/ImageGalleryItem';

import css from './ImageGallery.module.scss';

const ImageGallery = ({ items, openModal }) => {
    return <ul className={css.gallery}>
        {items.map(item =>
            <ImageGalleryItem
                key={item.id}
                webformatURL={item.webformatURL}
                largeImageURL={item.largeImageURL}
                onOpen={openModal}
            />)}
    </ul>;
};

export default ImageGallery;
