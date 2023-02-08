import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./VersusPage.scss";

export default function VersusPage() {
	const BASE_API_URL = process.env.REACT_APP_BACKEND_URL;
	const [playerOne, setPlayerOne] = useState(null);
	const [playerTwo, setPlayerTwo] = useState(null);
	const [searchParams] = useSearchParams();
    const navigate = useNavigate();

	const params = {
		p1: searchParams.get("p1"),
		p2: searchParams.get("p2")
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

	function clickHandler() {
		const winningPlayer = Math.floor(Math.random() * 2);

        if (winningPlayer === 0) {
            navigate(`/results?winner=${params.p1}`)
        } else {
            navigate(`/results?winner=${params.p2}`)
        }
	};

	return (
		<section className="versus">
			<div className="versus__title-container">
				<h1 className="versus__title">Showdown</h1>
			</div>

			<section className="versus__container">
				<div className="versus__card">
					{playerOne && (
						<img
							src={playerOne.image}
							className="versus__p1-image"
							alt="Player One Character"
						></img>
					)}
				</div>
				<span className="versus__text">VS</span>
				<div className="versus__card">
					{playerTwo && (
						<img
							src={playerTwo.image}
							className="versus__p2-image"
							alt="Player Two Character"
						></img>
					)}
				</div>
			</section>

			<div className="versus__button-container">
				<button className="versus__button" onClick={clickHandler}>
					Fight
				</button>
			</div>
		</section>
	);
}
