import "./CharacterSelectPage.scss";
import CharacterIcon from "../../components/CharacterIcon/CharacterIcon";
import StageSelect from "../../components/StageSelect/StageSelect";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function CharacterSelectPage() {
	const BASE_API_URL = process.env.REACT_APP_BACKEND_URL;
	const [characterList, setCharacterList] = useState(null);
	const [playerOneHover, setPlayerOneHover] = useState(null);
	const [playerTwoHover, setPlayerTwoHover] = useState(null);
	const [playerOneSelected, setPlayerOneSelected] = useState(false);
	const [playerTwoSelected, setPlayerTwoSelected] = useState(false);
	const [showStageSelect, setShowStageSelect] = useState(false);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const typeQuery = searchParams.get("type");

		try {
			async function getCharacters() {
				const { data } = await axios.get(
					`${BASE_API_URL}/select?type=${typeQuery}`
				);
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
				<h2 className="character-select__title">
					{!showStageSelect ? "Character Select" : "Stage Select"}
				</h2>
			</div>

			<section className="character-select__container">
				<div className="character-select__player-container">
					<div className="character-select__player">
						{playerOneHover ? (
							<img
								src={playerOneHover[0]}
								className="character-select__p1-image"
								alt="Player One Character"
							></img>
						) : (
							<span className="character-select__p1-placeholder">
								1P
							</span>
						)}
					</div>
					<span className="character-select__name">
						{playerOneHover && playerOneHover[1]}
					</span>
				</div>
				<div className="character-select__player-container">
					<div className="character-select__player">
						{playerTwoHover ? (
							<img
								src={playerTwoHover[0]}
								className="character-select__p2-image"
								alt="Player Two Character"
							></img>
						) : (
							<span className="character-select__p2-placeholder">
								2P
							</span>
						)}
					</div>
					<span className="character-select__name">
						{playerTwoHover && playerTwoHover[1]}
					</span>
				</div>
			</section>

			<section className="character-select__character-grid">
				{characterList && !showStageSelect ? (
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
								setShowStageSelect={setShowStageSelect}
							/>
						);
					})
				) : (
					<StageSelect
						playerOneSelected={playerOneSelected}
						playerTwoSelected={playerTwoSelected}
					/>
				)}
			</section>
		</section>
	);
}
