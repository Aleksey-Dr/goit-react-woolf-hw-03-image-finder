import css from './Button.module.scss';

const Button = ({ onClick }) => {
    return (
        <button onClick={onClick} type="button" className={css.btn}>Load more</button>
    );
};

export default Button;