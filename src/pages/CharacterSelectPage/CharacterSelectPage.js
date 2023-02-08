import "./CharacterSelectPage.scss";
import CharacterIcon from "../../components/CharacterIcon/CharacterIcon";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CharacterSelectPage() {
	const BASE_API_URL = process.env.REACT_APP_BACKEND_URL;
	const [characterList, setCharacterList] = useState(null);
	const [playerOneHover, setPlayerOneHover] = useState(null);
	const [playerTwoHover, setPlayerTwoHover] = useState(null);
	const [playerOneSelected, setPlayerOneSelected] = useState(false);
    const [playerTwoSelected, setPlayerTwoSelected] = useState(false);

	useEffect(() => {
		try {
			async function getCharacters() {
				const { data } = await axios.get(`${BASE_API_URL}/select`);
				setCharacterList(data);
			}
			getCharacters();
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<section className="character-select">
			<div className="character-select__title-container">
				<h1 className="character-select__title">Character Select</h1>
			</div>

			<section className="character-select__player-container">
				<div className="character-select__player">
					{playerOneHover && (
						<img
							src={playerOneHover}
							className="character-select__p1-image"
							alt="Player One Character"
						></img>
					)}
				</div>
				<div className="character-select__player">
					{playerOneSelected && playerTwoHover ? (
						<img
							src={playerTwoHover}
							className="character-select__p2-image"
							alt="Player Two Character"
						></img>
					) : null}
				</div>
			</section>

			<section className="character-select__character-grid">
				{characterList &&
					characterList.map((character) => {
						return (
							<CharacterIcon
								key={character.id}
								imageUrl={character.image}
								id={character.id}
                                characterList={characterList}
								setPlayerOneHover={setPlayerOneHover}
                                setPlayerTwoHover={setPlayerTwoHover}
                                playerOneSelected={playerOneSelected}
                                playerTwoSelected={playerTwoSelected}
                                setPlayerOneSelected={setPlayerOneSelected}
                                setPlayerTwoSelected={setPlayerTwoSelected}
							/>
						);
					})}
			</section>
		</section>
	);
}
