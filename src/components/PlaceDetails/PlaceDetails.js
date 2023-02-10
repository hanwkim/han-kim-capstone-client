import "./PlaceDetails.scss";
import Review from "../Review/Review";

export default function PlaceDetails({ name, hours, summary, reviews, price }) {
	return (
		<section className="details">
			<span className="details__name">{name}</span>
			<p className="details__summary">{summary}</p>
			<span className="details__price">
				Price:{" "}
				{price === 0
					? "No info, but not free."
					: price === 1
					? "$"
					: price === 2
					? "$$"
					: price === 3
					? "$$$"
					: "$$$$"}
			</span>
			<ul className="details__hours">
				Hours:
				{typeof hours !== "string"
					? hours.map((hour) => {
							return (
								<li className="details__hour-item">{hour}</li>
							);
					  })
					: hours}
			</ul>
			<span className="details__reviews-title">Reviews:</span>
			<section className="details__reviews-container">	
				{typeof reviews !== "string"
					? reviews.map((review) => {
							return (
								<Review
									name={review.author_name}
									rating={review.rating}
									text={review.text}
								/>
							);
					  })
					: reviews}
			</section>
		</section>
	);
}
