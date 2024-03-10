import { Component } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import css from './Searchbar.module.scss';

class Searchbar extends Component {
    state = {
        term: '',
    };

    // ================== LOGIC
    handleTermChange = event => {
        this.setState({
          term: event.target.value.toLowerCase(),
        });
    };
    
    handleSubmit = event => {
        event.preventDefault();
    
        if (this.state.term.trim() === '') {
          Notify.warning('Empty string');
          return;
        }
        this.props.onSubmit(this.state.term);
        this.setState({
          term: '',
        });
    };
    // ================== /LOGIC

    render() {
        return (
            <header className={css.searchbar}>
                <form onSubmit={this.handleSubmit} className={css.form}>
                    <button type="submit" className={css.button}>
                        <span className={css["button-label"]}><IoSearchOutline size={'2em'} /></span>
                    </button>
                    <input
                        onChange={this.handleTermChange}
                        value={this.state.term}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        className={css.input}
                    />
                </form>
            </header>
        );
    };
};

export default Searchbar;
