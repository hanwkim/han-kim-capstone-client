import "./CharacterSelectPage.scss";
import CharacterIcon from "../../components/CharacterIcon/CharacterIcon";
import StageSelect from "../../components/StageSelect/StageSelect";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function CharacterSelectPage() {
	const BASE_API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5050";
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
				<motion.h2
					className="character-select__title"
					initial={{ y: -200 }}
					animate={{ y: 0 }}
				>
					{!showStageSelect ? "Character Select" : "Stage Select"}
				</motion.h2>
			</div>

			<section className="character-select__container">
				<div className="character-select__player-container">
					<motion.div
						className="character-select__player"
						initial={{ x: -1000 }}
						animate={{ x: 0 }}
						transition={{ type: "spring", delay: 0.25, bounce: 0.2 }}
					>
						{playerOneHover ? (
							<motion.img
								src={playerOneHover[0]}
								className="character-select__p1-image"
								alt="Player One Character"
								animate={{ y: [0, 3, 0, -3, 0] }}
								transition={{ repeat: Infinity, ease: "linear", duration: 2 }}
							></motion.img>
						) : (
							<span className="character-select__p1-placeholder">
								1P
							</span>
						)}
					</motion.div>
					<span className="character-select__name">
						{playerOneHover && playerOneHover[1]}
					</span>
				</div>
				<div className="character-select__player-container">
					<motion.div
						className="character-select__player"
						initial={{ x: 1000 }}
						animate={{ x: 0 }}
						transition={{ type: "spring", delay: 0.25, bounce: 0.2 }}
					>
						{playerTwoHover ? (
							<motion.img
								src={playerTwoHover[0]}
								className="character-select__p2-image"
								alt="Player Two Character"
								animate={{ y: [0, 3, 0, -3, 0] }}
								transition={{ repeat: Infinity, ease: "linear", duration: 2 }}
							></motion.img>
						) : (
							<span className="character-select__p2-placeholder">
								2P
							</span>
						)}
					</motion.div>
					<span className="character-select__name">
						{playerTwoHover && playerTwoHover[1]}
					</span>
				</div>
			</section>
			<motion.section
				className="character-select__character-grid"
				initial={{ y: 1000 }}
				animate={{ y: 0 }}
				transition={{ type: "spring", delay: 0.75, bounce: 0.35 }}
			>
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
			</motion.section>
		</section>
	);
}
