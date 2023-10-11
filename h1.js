
const scrollLeft = document.querySelector(".scroll-left");
const scrollRight = document.querySelector(".scroll-right");
const heroDiv = document.querySelector(".hero-img");
const sectionContainer = document.querySelector("section");
const bodyContainer = document.querySelector("body");
const emblemDiv = document.querySelector(".emblem");
const albumTitleSpan = document.querySelector(".album-title");
const texts = document.querySelectorAll(".text");
const albumNum = document.querySelector(".album-num");
const spotifyWidget = document.querySelector(".spotify-widget iframe");
const albums = [
	{
		album: "Up All Night",
		emblem: "What Makes You Beautiful",
		"bg-color": ["#7F7F7F", "#282828"],
		"accent-color": "#898989",
		url:
			"https://i.scdn.co/image/ab67616d0000b2734a5584795dc73860653a9a3e",
            spotify:
			"https://open.spotify.com/embed/album/6cunQQ7YZisYOoiFu2ywIq?utm_source=generator"
	},
	{
		album: "Take Me Home",
		emblem: "Live While We're Young",
		"bg-color": ["#A02030", "#282828"],
		"accent-color": "#B4653C",
		url: "https://images.musicstore.de/images/1600/hal-leonard-one-direction-take-me-home_1_NOT0009872-000.jpg",
		spotify:
        "https://open.spotify.com/embed/album/2sWX3HYnZjPZ9MrH6MFsBt?utm_source=generator"
	},
	{
		album: " Midnight Memories",
		emblem: "story of my life",
		"bg-color": ["#D74040", "#282828"],
		"accent-color": "#898989",
		url: "https://i.pinimg.com/originals/00/2c/e8/002ce843b97091f5da25a6797f73eabb.png",
		spotify:
			"https://open.spotify.com/embed/album/7p1fX8aUySrBdx4WSYspOu?utm_source=generator"
	},
	{
		album: "Four",
		emblem: "Night Changes'",
		"bg-color": ["#535353", "#282828"],
		"accent-color": "#DAADB8",
		url:
			"https://i.scdn.co/image/ab67616d0000b273d304ba2d71de306812eebaf4",
		spotify:
			"https://open.spotify.com/embed/album/4gCNyS7pidfK3rKWhB3JOY?utm_source=generator"
	},
	{
		album: "Made in the A.M.",
		emblem: "drag me down",
		"bg-color": ["#D04030", "#282828"],
		"accent-color": "#505050",
		url:
			"https://i.scdn.co/image/ab67616d0000b273241e4fe75732c9c4b49b94c3",
		spotify:
			"https://open.spotify.com/embed/album/1gMxiQQSg5zeu4htBosASY?utm_source=generator"
	},
	
];

scrollLeft.addEventListener("click", () => handleClickScroll(-1));
scrollRight.addEventListener("click", () => handleClickScroll(1));
heroDiv.addEventListener("animationend", () => {
	heroDiv.classList.remove("album-transition");
	document.addEventListener("keydown", handleKeyScroll);
	scrollLeft.disabled = false;
	scrollRight.disabled = false;
	scrollLeft.classList.remove("key-press-hover-left");
	scrollRight.classList.remove("key-press-hover-right");

	for (const text of texts) text.classList.add("show-texts");
});

const handleClickScroll = (val) => {
	if (index + val >= 0 && index + val < albums.length) {
		updateDisplay((index += val));
	}
};

const handleKeyScroll = (e) => {
	if (e.key == "ArrowLeft") {
		scrollLeft.classList.add("key-press-hover-left");
		handleClickScroll(-1);
	}
	if (e.key == "ArrowRight") {
		scrollRight.classList.add("key-press-hover-right");
		handleClickScroll(1);
	}
};

let index = 0;

const updateDisplay = (index) => {
	let DELIMITER = "";

	
	const album = albums[index];

	
	for (const text of texts) text.classList.remove("show-texts");
	emblemDiv.innerHTML = "";
	scrollLeft.disabled = true;
	scrollRight.disabled = true;
	document.removeEventListener("keydown", handleKeyScroll);

	sectionContainer.id = `hero-${album.album.toLowerCase().replace(" ", "-")}`;
	bodyContainer.style.background = `linear-gradient(180deg, ${album["bg-color"][0]} 0%, ${album["bg-color"][1]} 100%)`;
	heroDiv.style.backgroundImage = `url(${album.url})`;
	albumTitleSpan.textContent = album.album;
	spotifyWidget.src = album.spotify;

	const number = albums.length - index;
	albumNum.innerText = number >= 10 ? number + "." : `0${number}.`;
	albumNum.style.color = album["accent-color"];

	if (index === 0) scrollLeft.classList.add("hide-arrow");
	else scrollLeft.classList.remove("hide-arrow");

	if (index === 9) scrollRight.classList.add("hide-arrow");
	else scrollRight.classList.remove("hide-arrow");

	
	createEmblem(album.emblem, DELIMITER[0] || undefined).forEach((node) =>
		emblemDiv.append(node)
	);

	
	heroDiv.classList.add("album-transition");
};

const createEmblem = (string, delimiter = "•") => {
	const spans = [];

	string = string.trim().replaceAll(" ", delimiter) + delimiter;
	const numChars = string.length;
	const degVal = 90 / (numChars / 4);

	string.split("").forEach((char, idx) => {
		const span = document.createElement("span");
		span.innerText = char;
		span.style.transform = `rotate(${180 - degVal * idx}deg)`;
		if (char === delimiter) span.style.color = albums[index]["accent-color"];
		spans.push(span);
	});

	return spans;
};

updateDisplay(index);
