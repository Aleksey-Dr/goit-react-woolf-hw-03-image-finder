import { Component } from 'react';
import Notiflix from 'notiflix';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

import { fetchImages } from '../services/pixabay-api';

import css from './App.module.scss';

export class App extends Component {
    state = {
        images: [],
        largeImage: '',
        term: '',
        isLoading: false,
        error: false,
        showModal: false,
        pageNum: 1,
    };

    // ================== COMPONENT LIFECYCLE
    componentDidUpdate(_, prevState) {
        Notiflix.Notify.init({
            width: '300px',
            timeout: 4000,
            fontSize: '16px',
            warning: {
                textColor: '#3f51b5',
            },
        });

        if (
            prevState.term !== this.state.term ||
            prevState.pageNum !== this.state.pageNum
        ) {
            try {
                this.setState({ isLoading: true });
                fetchImages(this.state.term, this.state.pageNum).then(
                    gallery => {
                        if (gallery.length === 0) {
                            Notiflix.Notify.warning(
                                'Nothing found for your request'
                            );
                            this.setState({ isLoading: false });
                        } else {
                            this.setState(prevState => ({
                                images: [...prevState.images, ...gallery],
                                isLoading: false,
                            }));
                        }
                    }
                );
            } catch (error) {
                this.setState({ error: true, isLoading: false });
                Notiflix.Notify.failure(
                    'Oops... Something went wrong please try again!'
                );
                console.log(error);
            }
        }
    }
    // ================== /COMPONENT LIFECYCLE

    // ================== LOGIC
    handleSearcbarSubmit = term => {
        this.setState({
            term,
            images: [],
            pageNum: 1,
        });
    };

    toggleModal = largeImage => {
        this.setState({
            showModal: !this.state.showModal,
            largeImage,
        });
    };

    onLoadMore = () => {
        this.setState(prevState => ({ pageNum: prevState.pageNum + 1 }));
    };
    // ================== /LOGIC

    render() {
        const { images, largeImage, showModal, isLoading } = this.state;

        return (
            <div className={css.app}>
                <Searchbar onSubmit={this.handleSearcbarSubmit} />
                {images.length !== 0 &&
                  <ImageGallery items={images} openModal={this.toggleModal} />
                }
                {isLoading && <Loader />}

                {images.length > 11 && <Button onClick={this.onLoadMore} />}

                {showModal && (
                    <Modal onClose={this.toggleModal} largeImage={largeImage} />
                )}
            </div>
        );
    };
};
