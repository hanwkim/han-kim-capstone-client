import axios from "axios";
import PlaceDetails from "../../components/PlaceDetails/PlaceDetails";
import ResultListing from "../../components/ResultListing/ResultListing";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./ResultsPage.scss";

export default function ResultsPage() {
	const BASE_API_URL = "http://localhost:8080";
	const [listings, setListings] = useState(null);
	const [winner, setWinner] = useState(null);
	const [details, setDetails] = useState(null);
	const [searchParams] = useSearchParams();

	let winnerQuery = searchParams.get("winner");

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			try {
				async function getResults() {
					const { data } = await axios.get(
						`${BASE_API_URL}/results?winner=${winnerQuery}&location=${position.coords.latitude},${position.coords.longitude}`
					);
					setListings(data[1].splice(0, 5));
					setWinner(data[0]);
				}
				getResults();
			} catch (error) {
				console.log(error);
			}
		});
	}, [winnerQuery]);

	return (
		<section className="results">
			<section className="results__header">
				<div className="results__winner">
					{winner && (
						<img
							className="results__image"
							src={winner.image}
							alt="Winning Food"
						></img>
					)}
				</div>
				<div className="results__header-text">
					<h2 className="results__header-title">Winner</h2>
					<h3 className="results__header-subtitle">
						{winner && winner.name}
					</h3>
				</div>
			</section>

			<section className="results__listings-container">
				<h2 className="results__listings-title">Results</h2>
				<section className="results__listings">
					{listings &&
						listings.map((listing) => {
							return (
								<ResultListing
									key={listing.place_id}
									name={listing.name}
									address={listing.formatted_address}
									rating={listing.rating}
									id={listing.place_id}
									setDetails={setDetails}
								/>
							);
						})}
				</section>

				<div className="results__filter-container">
					<span className="results__filter-price">Price: $$$$</span>
					<span className="results__filter-open">Open Now?</span>
					<button className="results__filter-button">Apply</button>
				</div>
			</section>

			<section className="results__details-container">
				<h2 className="results__details-title">Details</h2>
				<section className="results__details">
					{details && (
						<PlaceDetails
							name={details.name}
							hours={details.opening_hours.weekday_text}
							website={details.website}
						/>
					)}
				</section>
			</section>
		</section>
	);
}
