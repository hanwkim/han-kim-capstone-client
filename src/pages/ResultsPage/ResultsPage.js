import axios from "axios";
import PlaceDetails from "../../components/PlaceDetails/PlaceDetails";
import ResultListing from "../../components/ResultListing/ResultListing";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./ResultsPage.scss";

export default function ResultsPage() {
	const BASE_API_URL = process.env.REACT_APP_BACKEND_URL;
	const [listings, setListings] = useState(null);
	const [winner, setWinner] = useState(null);
	const [details, setDetails] = useState(null);
	const [detailsMap, setDetailsMap] = useState(null);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		if (searchParams.get("city") === "current") {
			navigator.geolocation.getCurrentPosition((position) => {
				const params = {
					winner: searchParams.get("winner"),
					location: `${position.coords.latitude},${position.coords.longitude}`,
				};

				const requestParams = new URLSearchParams(params).toString();

				try {
					async function getResults() {
						const { data } = await axios.get(
							`${BASE_API_URL}/results?${requestParams}`
						);
						setListings(data[1].splice(0, 5));
						setWinner(data[0]);
					}
					getResults();
				} catch (error) {
					console.log(error);
				}
			});
		} else {
			const params = {
				winner: searchParams.get("winner"),
				city: searchParams.get("city"),
			}

			const requestParams = new URLSearchParams(params).toString();

			try {
				async function getResults() {
					const { data } = await axios.get(
						`${BASE_API_URL}/results?${requestParams}`
					);
					setListings(data[1].splice(0, 5));
					setWinner(data[0]);
				}
				getResults();
			} catch (error) {
				console.log(error);
			}		
		}
	}, []);

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
									location={listing.geometry.location}
									setDetails={setDetails}
									setDetailsMap={setDetailsMap}
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
					<div className="results__map-container">
						{detailsMap && (
							<img
								src={detailsMap}
								className="results__map"
								alt="Map of location"
							></img>
						)}
					</div>
				</section>
			</section>
		</section>
	);
}
