var templateCache = {
	projects: $("#projects-template").html(),
	about: $("#about-template").html(),
	home: $("#home-template").html()
}

var initControllers = {
	home: function() {
		setRandomQuote();
	}
}

var $root = $("#root");
initializeController();

function setRandomQuote() {
	var quotes = [
		"\"I cannot remember the books Ive read any more that than the meals I have eaten; even so, they have made me\"",
		'"Too much of anything becomes its opposite"',
		'"Luck is what happens when preparation meets opportunity"',
		'"Success isn\'t about being the best. It\'s about always getting better."'
	];

	document.getElementById('quote').innerHTML = quotes[Math.floor(Math.random() * quotes.length)];
}

function changeState(statename) {
	var template = templateCache[statename] || templateCache.home;
	$root.html(template);
}

function initializeController() {
	var currentState = $root.attr("current-state");
	var initController = initControllers[currentState];
	if (initController) initController();
}