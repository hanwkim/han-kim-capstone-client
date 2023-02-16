import axios from "axios";
import ResultListing from "../../components/ResultListing/ResultListing";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./ResultsPage.scss";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import useSound from "use-sound";
import selectSfx from "../../assets/sounds/characterSelect.mp3";

export default function ResultsPage() {
	const BASE_API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5050";
	const [listings, setListings] = useState(null);
	const [winner, setWinner] = useState(null);
	const [priceFilter, setPriceFilter] = useState(0);
	const [isOpenNow, setIsOpenNow] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const [searchParams] = useSearchParams();
	
	const navigate = useNavigate();

	useEffect(() => {
		if (searchParams.get("city") === "current") {
			navigator.geolocation.getCurrentPosition((position) => {
				const params = {
					type: searchParams.get("type"),
					winner: searchParams.get("winner"),
					location: `${position.coords.latitude},${position.coords.longitude}`,
				};

				const requestParams = new URLSearchParams(params).toString();

				try {
					async function getResults() {
						const { data } = await axios.get(
							`${BASE_API_URL}/results?${requestParams}`
						);
						setListings(data[1]);
						setWinner(data[0]);
					}
					getResults();
				} catch (error) {
					console.log(error);
				}
			});
		} else {
			const params = {
				type: searchParams.get("type"),
				winner: searchParams.get("winner"),
				city: searchParams.get("city"),
			};

			const requestParams = new URLSearchParams(params).toString();

			try {
				async function getResults() {
					const { data } = await axios.get(
						`${BASE_API_URL}/results?${requestParams}`
					);
					setListings(data[1]);
					setWinner(data[0]);
				}
				getResults();
			} catch (error) {
				console.log(error);
			}
		}
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);

	function filterButtonHandler() {
		if (!priceFilter && !isOpenNow) {
			alert("No filtering options selected!");
			return;
		}

		if (searchParams.get("city") === "current") {
			navigator.geolocation.getCurrentPosition((position) => {
				const params = {
					winner: searchParams.get("winner"),
					location: `${position.coords.latitude},${position.coords.longitude}`,
					price: priceFilter,
					openNow: isOpenNow,
				};

				const requestParams = new URLSearchParams(params).toString();

				try {
					async function getFilteredResults() {
						const { data } = await axios.get(
							`${BASE_API_URL}/results/filtered/current-location?${requestParams}`
						);
						setListings(data);
					}
					getFilteredResults();
				} catch (error) {
					console.log(error);
				}
			});
		} else {
			const params = {
				winner: searchParams.get("winner"),
				city: searchParams.get("city"),
				price: priceFilter,
				openNow: isOpenNow,
			};

			const requestParams = new URLSearchParams(params).toString();

			try {
				async function getFilteredResults() {
					const { data } = await axios.get(
						`${BASE_API_URL}/results/filtered/city-location?${requestParams}`
					);
					setListings(data);
				}
				getFilteredResults();
			} catch (error) {
				console.log(error);
			}
		}
	}

	const [playSelect] = useSound(selectSfx);

	return (
		<>
			{isLoading &&
				createPortal(
					<LoadingScreen />,
					document.getElementById("portal")
				)}
			<section className="results">
				<motion.section
					className="results__header"
					initial={{ x: 300 }}
					animate={{ x: 0 }}
					transition={{ delay: 2 }}
				>
					<div className="results__winner">
						{winner && (
							<img
								className="results__image"
								src={winner.image}
								alt="Winning Food"
							></img>
						)}
					</div>
					<div className="results__header-text">
						<h2 className="results__header-title">Winner</h2>
						<h3 className="results__header-subtitle">
							{winner && winner.name}
						</h3>
					</div>
				</motion.section>

				<motion.section
					className="results__listings-container"
					initial={{ x: -300 }}
					animate={{ x: 0 }}
					transition={{ delay: 2 }}
				>
					<h2 className="results__listings-title">Results</h2>
					<section className="results__listings">
						{listings &&
							listings.map((listing) => {
								return (
									<ResultListing
										key={listing.place_id}
										name={listing.name}
										address={listing.formatted_address}
										rating={listing.rating}
										id={listing.place_id}
										location={listing.geometry.location}
									/>
								);
							})}
					</section>

					<section className="results__filter-container">
						<div className="results__filter-price">
							Max Price:
							<span
								onClick={() => setPriceFilter(1)}
								className={
									priceFilter >= 1
										? "results__dollar results__dollar--clicked"
										: "results__dollar"
								}
							>
								$
							</span>
							<span
								onClick={() => setPriceFilter(2)}
								className={
									priceFilter >= 2
										? "results__dollar results__dollar--clicked"
										: "results__dollar"
								}
							>
								$
							</span>
							<span
								onClick={() => setPriceFilter(3)}
								className={
									priceFilter >= 3
										? "results__dollar results__dollar--clicked"
										: "results__dollar"
								}
							>
								$
							</span>
							<span
								onClick={() => setPriceFilter(4)}
								className={
									priceFilter === 4
										? "results__dollar results__dollar--clicked"
										: "results__dollar"
								}
							>
								$
							</span>
						</div>
						<div className="results__filter-open">
							Open Now?
							<span
								onClick={() => setIsOpenNow(!isOpenNow)}
								className={
									isOpenNow
										? "results__option results__option--clicked"
										: "results__option"
								}
							>
								Yes
							</span>
						</div>
						<button
							onClick={filterButtonHandler}
							className="results__filter-button"
						>
							Apply
						</button>
					</section>
				</motion.section>
				<motion.div
					className="results__button-container"
					initial={{ y: 300 }}
					animate={{ y: 0 }}
					transition={{ delay: 2 }}
				>
					<button
						onClick={() => {
							playSelect()
							navigate("/")}}
						className="results__reset-button"
					>
						Another Showdown?
					</button>
				</motion.div>
			</section>
		</>
	);
}
