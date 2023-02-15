import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import HotDogIcon from "../../assets/images/hotdog.png";
import CakeIcon from "../../assets/images/strawberrycake.png";
import "./HomePage.scss";
import hoverSfx from "../../assets/sounds/hover.wav";
import selectSfx from "../../assets/sounds/titleSelect.mp3";

export default function HomePage() {
	const [newGameClicked, setNewGameClicked] = useState(false);
	const [savoryHover, setSavoryHover] = useState(false);
	const [sweetHover, setSweetHover] = useState(false);
	const [savoryClick, setSavoryClick] = useState(false);
	const [sweetClick, setSweetClick] = useState(false);
	const navigate = useNavigate();

	function savorySelected() {
		setSavoryClick(true);
		playSelect();

		setTimeout(() => {
			navigate("/select?type=savory");
		}, 1000);
	}

	function sweetSelected() {
		setSweetClick(true);
		playSelect();

		setTimeout(() => {
			navigate("/select?type=sweet");
		}, 1000);
	}

	const [playHover] = useSound(hoverSfx);
	const [playSelect] = useSound(selectSfx);

	return (
		<main className="main">
			<div className="main__title-container">
				<h1 className="main__title">Food Fight</h1>
			</div>
			<section className="main__links">
				<span
					onClick={() => setNewGameClicked(!newGameClicked)}
					className={
						newGameClicked
							? "main__link-new"
							: "main__link-new main__link-new--blink"
					}
				>
					New Game
				</span>
				{newGameClicked && (
					<>
						<div className="main__link-container">
							<img
								src={HotDogIcon}
								className={
									savoryHover
										? "main__link-icon main__link-icon--hovered"
										: "main__link-icon"
								}
								alt="Savory Food Icon"
							></img>
							<span
								className={
									savoryClick
										? "main__link-savory main__link-savory--selected"
										: "main__link-savory"
								}
								onMouseEnter={() => {
									if (sweetClick || savoryClick) {
										return;
									}
									setSavoryHover(true);
									playHover();
								}}
								onMouseLeave={() => setSavoryHover(false)}
								onClick={savorySelected}
							>
								Savory Showdown
							</span>
						</div>
						<div className="main__link-container">
							<img
								src={CakeIcon}
								className={
									sweetHover
										? "main__link-icon main__link-icon--hovered"
										: "main__link-icon"
								}
								alt="Sweet Food Icon"
							></img>
							<span
								className={
									sweetClick
										? "main__link-sweet main__link-sweet--selected"
										: "main__link-sweet"
								}
								onMouseEnter={() => {
									if (sweetClick || savoryClick) {
										return;
									}

									setSweetHover(true);
									playHover();
								}}
								onMouseLeave={() => setSweetHover(false)}
								onClick={sweetSelected}
							>
								Sweet Showdown
							</span>
						</div>
					</>
				)}
			</section>
		</main>
	);
}
