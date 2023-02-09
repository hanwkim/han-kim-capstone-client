import { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.scss";

export default function HomePage() {
	const [newGameClicked, setNewGameClicked] = useState(false);

	return (
		<main className="main">
			<div className="main__title-container">
				<h1 className="main__title">Food Fight</h1>
			</div>
			<section className="main__links">
				<span
					onClick={() => setNewGameClicked(true)}
					className="main__link-new"
				>
					New Game
				</span>
				{newGameClicked && (
					<>
						<Link
							to="/select?type=savory"
							className="main__link-savory"
						>
							Savory Showdown
						</Link>
						<Link
							to="/select?type=sweet"
							className="main__link-sweet"
						>
							Sweet Showdown
						</Link>
					</>
				)}
			</section>
		</main>
	);
}
