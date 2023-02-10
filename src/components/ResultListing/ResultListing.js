import DetailsSection from "../DetailsSection/DetailsSection";
import axios from "axios";
import "./ResultListing.scss";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function ResultListing({ name, address, rating, id, location }) {
	const BASE_API_URL = process.env.REACT_APP_BACKEND_URL;
	const API_KEY = process.env.REACT_APP_API_KEY;
	const BASE_MAP_API_URL = "https://www.google.com/maps/embed/v1/place";

	const [details, setDetails] = useState(null);
	const [detailsMap, setDetailsMap] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const shortenedAddress = `${address.split(", ")[0]}, ${
		address.split(", ")[1]
	}`;

	const params = {
		key: API_KEY,
		q: `place_id:${id}`,
		zoom: 15,
		center: `${location.lat},${location.lng}`,
	};

	const mapRequestParams = new URLSearchParams(params).toString();

	function clickHandler() {
		try {
			async function getDetails() {
				const { data } = await axios.get(
					`${BASE_API_URL}/details?id=${id}`
				);
				setDetails(data);
			}
			getDetails();
		} catch (error) {
			console.log(error);
		}
		setDetailsMap(`${BASE_MAP_API_URL}?${mapRequestParams}`);
		setIsModalOpen(true);
	}

	return (
		<>
			{isModalOpen &&
				createPortal(
					<DetailsSection
						details={details}
						detailsMap={detailsMap}
						setIsModalOpen={setIsModalOpen}
					/>,
					document.getElementById("portal")
				)}
			<section className="listing" onClick={clickHandler}>
				<span className="listing__name">{name}</span>
				<span className="listing__address">{shortenedAddress}</span>
				<span className="listing__rating">
					Rating: {rating ? rating : "No ratings..."}
				</span>
			</section>
		</>
	);
}
