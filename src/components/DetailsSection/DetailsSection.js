import "./DetailsSection.scss";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

export default function DetailsSection({
	details,
	detailsMap,
	setIsModalOpen,
}) {
	return (
		<>
			<div className="details-overlay"></div>
			<section className="details-container">
				<div className="div">
					<h2
						onClick={() => setIsModalOpen(false)}
						className="details-container__title"
					>
						Details
					</h2>
					<section className="details-container__details">
						{details && (
							<PlaceDetails
								name={details.name}
								hours={
									details.opening_hours
										? details.opening_hours.weekday_text
										: "No hours posted."
								}
								summary={
									details.editorial_summary
										? details.editorial_summary.overview
										: "No summary... very mysterious..."
								}
								reviews={
									details.reviews
										? details.reviews
										: "No reviews... yet."
								}
                                price={details.price_level ? details.price_level : 0}
							/>
						)}

						<div className="details-container__map-container">
							{detailsMap && (
								<iframe
									className="details-container__map"
									referrerPolicy="no-referrer-when-downgrade"
									src={detailsMap}
								></iframe>
							)}
						</div>
					</section>
				</div>
			</section>
		</>
	);
}
