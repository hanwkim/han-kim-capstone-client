import axios from "axios";
import "./ResultListing.scss";

export default function ResultListing({
	name,
	address,
	rating,
	id,
	location,
	setDetails,
    setDetailsMap
}) {
	const BASE_API_URL = process.env.REACT_APP_BACKEND_URL;
	const API_KEY = process.env.REACT_APP_API_KEY;
	const BASE_MAP_API_URL = "https://maps.googleapis.com/maps/api/staticmap"

	const shortenedAddress = `${address.split(", ")[0]}, ${
		address.split(", ")[1]
	}`;

	const params = {
		zoom: 15,
		key: API_KEY,
		size: "400x400",
		markers: `${location.lat},${location.lng}`,
	}

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

	}

	return (
		<section className="listing" onClick={clickHandler}>
			<span className="listing__name">{name}</span>
			<span className="listing__address">{shortenedAddress}</span>
			<span className="listing__rating">Rating: {rating ? rating : "No ratings..."}</span>
		</section>
	);
}
