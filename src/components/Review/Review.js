import "./Review.scss";

export default function Review({ name, rating, text }) {
    return (
        <article className="review">
            <div className="review__header">
                <span className="review__name">{name}</span>
                <span className="review__rating">Rating: {rating}</span>
            </div>
            <div className="review__text-container">
                <p className="review__text">{text}</p>
            </div>
        </article>
    )
};