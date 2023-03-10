import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSound from "use-sound";
import "./StageSelect.scss";
import selectSfx from "../../assets/sounds/characterSelect.mp3";

export default function StageSelect({ playerOneSelected, playerTwoSelected }) {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const [playSelect] = useSound(selectSfx);

	const params = {
		type: searchParams.get("type"),
		p1: playerOneSelected,
		p2: playerTwoSelected,
	};

	const requestParams = new URLSearchParams(params).toString();

	function currentLocationSuccess(position) {
		playSelect();

		setTimeout(() => {
			navigate(`/versus?${requestParams}&city=current`)
		}, 500);
	}

	function currentLocationError(error) {
		alert("Please enter a city name!");
	}

	function submitHandler(event) {
		event.preventDefault();

		if (!event.target.city.value) {
			alert("Please enter a city name!");
			return;
		}

		playSelect();

		setTimeout(() => {
			navigate(`/versus?${requestParams}&city=${event.target.city.value}`);
		}, 500);
	}

	return (
		<motion.section className="stage-select" initial={{ y: 300 }} animate={{ y: 0 }}>
			<button
				onClick={() => {
					navigator.geolocation.getCurrentPosition(
						currentLocationSuccess,
						currentLocationError
					);
				}}
				className="stage-select__current-button"
			>
				Use Current Location
			</button>
			<h3 className="stage-select__seperator">Or</h3>
			<form onSubmit={submitHandler} className="stage-select__form">
				<label className="stage-select__form-label" htmlFor="city">
					Enter A City Name:
				</label>
				<input
					type="text"
					id="city"
					name="city"
					className="stage-select__input"
				></input>
				<button type="submit" className="stage-select__form-button">
					Submit
				</button>
			</form>
		</motion.section>
	);
}
