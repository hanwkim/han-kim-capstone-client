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
}) {

	function playerHover(isP1Selected) {
		const { image } = characterList.find(
			(character) => character.id === id
		);

		if (!isP1Selected) {
			setPlayerOneHover(image);
		} else {
			setPlayerTwoHover(image);
		}
	}

	function playerClick() {
		const { name } = characterList.find((character) => character.id === id);
		if (!playerOneSelected) {
			setPlayerOneSelected(name);
		} else {
			setPlayerTwoSelected(name);
		}
	}

	return (
		<div
			className="character-icon"
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
				} else if (!playerTwoSelected) {
					setPlayerTwoHover(null);
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
	);
}
