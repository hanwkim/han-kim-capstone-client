import { useState } from "react";
import "./CharacterIcon.scss";

export default function CharacterIcon({
	imageUrl,
	id,
	characterList,
	setPlayerOneHover,
	setPlayerTwoHover,
	playerOneSelected,
	playerTwoSelected,
	setPlayerOneSelected,
	setPlayerTwoSelected,
	setShowStageSelect,
}) {
	const [playerOneBorder, setPlayerOneBorder] = useState(false);
	const [playerTwoBorder, setPlayerTwoBorder] = useState(false);
	const [playerOneModal, setPlayerOneModal] = useState(false);
	const [playerTwoModal, setPlayerTwoModal] = useState(false);

	function playerHover(isP1Selected) {
		const { image, name } = characterList.find(
			(character) => character.id === id
		);

		if (!isP1Selected) {
			setPlayerOneHover([image, name]);
			setPlayerOneBorder(true);
		} else {
			setPlayerTwoHover([image, name]);
			setPlayerTwoBorder(true);
		}
	}

	function playerClick() {
		const { name } = characterList.find((character) => character.id === id);
		if (!playerOneSelected) {
			setPlayerOneSelected(name);
			setPlayerOneModal(true);
		} else {
			setPlayerTwoModal(true);
			setPlayerTwoSelected(name);
			setPlayerTwoBorder(false);
			setTimeout(() => {
				setShowStageSelect(true);
			}, 1000);
		}
	}

	return (
		<>
			<section className="character-icon__container">
				{playerOneModal && <div className="character-icon__p1-modal">1P</div>}
				{playerTwoModal && <div className="character-icon__p2-modal">2P</div>}
				<div
					className={
						!playerOneSelected && playerOneBorder
							? "character-icon character-icon__p1-hover"
							: playerOneSelected && playerTwoBorder
							? "character-icon character-icon__p2-hover"
							: "character-icon"
					}
					onMouseEnter={() => {
						if (playerTwoSelected) {
							return;
						} else {
							playerHover(playerOneSelected);
						}
					}}
					onMouseLeave={() => {
						if (!playerOneSelected) {
							setPlayerOneHover(null);
							setPlayerOneBorder(false);
						} else if (!playerTwoSelected) {
							setPlayerTwoHover(null);
							setPlayerTwoBorder(false);
						}
					}}
					onClick={playerClick}
				>
					<img
						src={imageUrl}
						className="character-icon__image"
						alt="Character Select Icon"
					></img>
				</div>
			</section>
		</>
	);
}
