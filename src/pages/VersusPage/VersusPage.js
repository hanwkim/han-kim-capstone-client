import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSound from "use-sound";
import "./VersusPage.scss";
import selectSfx from "../../assets/sounds/titleSelect.mp3";

export default function VersusPage() {
	const BASE_API_URL = process.env.REACT_APP_BACKEND_URL;
	const [playerOne, setPlayerOne] = useState(null);
	const [playerTwo, setPlayerTwo] = useState(null);
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const params = {
		type: searchParams.get("type"),
		p1: searchParams.get("p1"),
		p2: searchParams.get("p2"),
	};

	const requestParams = new URLSearchParams(params).toString();

	useEffect(() => {
		try {
			async function getPlayers() {
				const { data } = await axios.get(
					`${BASE_API_URL}/versus?${requestParams}`
				);
				setPlayerOne(data[0]);
				setPlayerTwo(data[1]);
			}
			getPlayers();
		} catch (error) {
			console.log(error);
		}
	}, [params]);

	const [playSelect] = useSound(selectSfx);

	function clickHandler() {
		const winningPlayer = Math.floor(Math.random() * 2);

		playSelect();

		if (winningPlayer === 0) {
			navigate(
				`/results?type=${params.type}&winner=${
					params.p1
				}&city=${searchParams.get("city")}`
			);
		} else {
			navigate(
				`/results?type=${params.type}&winner=${
					params.p2
				}&city=${searchParams.get("city")}`
			);
		}
	}

	return (
		<section className="versus">
			<div className="versus__title-container">
				<motion.h2
					className="versus__title"
					initial={{ y: -200 }}
					animate={{ y: 0 }}
				>
					Showdown
				</motion.h2>
			</div>

			<section className="versus__container">
				<div className="versus__card-container">
					<div className="versus__card" initial={{ x: -300 }} animate={{ x: 0 }}>
						{playerOne && (
							<img
								src={playerOne.image}
								className="versus__p1-image"
								alt="Player One Character"
							></img>
						)}
					</div>
					<span className="versus__name" inital={{ x: -300 }} animate={{ x: 0 }}>
						{playerOne && playerOne.name}
					</span>
				</div>
				<motion.span className="versus__text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>VS</motion.span>
				<div className="versus__card-container">
					<div className="versus__card">
						{playerTwo && (
							<img
								src={playerTwo.image}
								className="versus__p2-image"
								alt="Player Two Character"
							></img>
						)}
					</div>
					<span className="versus__name">
						{playerTwo && playerTwo.name}
					</span>
				</div>
			</section>

			<motion.div className="versus__button-container" initial={{ y: 300 }} animate={{ y: 0 }}>
				<button className="versus__button" onClick={clickHandler}>
					Fight
				</button>
			</motion.div>
		</section>
	);
}
