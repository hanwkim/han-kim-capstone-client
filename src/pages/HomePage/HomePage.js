import { useState } from "react";
import { Link } from "react-router-dom";
import HotDogIcon from "../../assets/images/hotdog.png";
import CakeIcon from "../../assets/images/strawberrycake.png";
import "./HomePage.scss";

export default function HomePage() {
	const [newGameClicked, setNewGameClicked] = useState(false);
	const [savoryHover, setSavoryHover] = useState(false);
	const [sweetHover, setSweetHover] = useState(false);

	return (
		<main className="main">
			<div className="main__title-container">
				<h1 className="main__title">Food Fight</h1>
			</div>
			<section className="main__links">
				<span
					onClick={() => setNewGameClicked(!newGameClicked)}
					className="main__link-new"
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
							<Link
								to="/select?type=savory"
								className="main__link-savory"
								onMouseEnter={() => setSavoryHover(true)}
								onMouseLeave={() => setSavoryHover(false)}
							>
								Savory Showdown
							</Link>
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
							<Link
								to="/select?type=sweet"
								className="main__link-sweet"
								onMouseEnter={() => setSweetHover(true)}
								onMouseLeave={() => setSweetHover(false)}
							>
								Sweet Showdown
							</Link>
						</div>
					</>
				)}
			</section>
		</main>
	);
}
