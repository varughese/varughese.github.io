var element = document.querySelector(".card-holder");
var sizer = element.querySelector(".shuffle-sizer");

var shuffleInstance = new Shuffle(element, {
	itemSelector: '.card-container',
	sizer: sizer // could also be a selector: '.my-sizer-element'
});