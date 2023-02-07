import axios from "axios";
import "./ResultListing.scss";

export default function ResultListing({ name, address, rating, id, setDetails }) {
    const BASE_API_URL="http://localhost:8080";

	const shortenedAddress = `${address.split(", ")[0]}, ${
		address.split(", ")[1]
	}`;

    function clickHandler() {
        try {
            async function getDetails() {
                const { data } = await axios.get(`${BASE_API_URL}/details?id=${id}`)
                setDetails(data);
            }
            getDetails();
        } catch (error) {
            console.log(error)
        }
    };

	return (
		<section className="listing" onClick={clickHandler}>
			<span className="listing__name">{name}</span>
			<span className="listing__address">{shortenedAddress}</span>
			<span className="listing__rating">Rating: {rating}</span>
		</section>
	);
}
