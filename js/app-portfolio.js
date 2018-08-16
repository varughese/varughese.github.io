var Portfolio = function (element) {
	this.types = Array.from(document.querySelectorAll("#shuffle-filteron-type input"));

	this.langs = Array.from(document.querySelectorAll("#shuffle-filteron-lang input"));

	this.shuffle = new Shuffle(element, {
		itemSelector: '.card-container',
		sizer: element.querySelector(".shuffle-sizer")
	});

	this.filters = {
		types: [],
		langs: []
	}

	this._bindEventListeners();
}

Portfolio.prototype._bindEventListeners = function () {
	this._onTypeChange = this._handleTypeChange.bind(this);
	this._onLangChange = this._handleLangChange.bind(this);

	this.types.forEach(function (input) {
		input.addEventListener('click', this._onTypeChange);
	}, this);
	this.langs.forEach(function (input) {
		input.addEventListener('click', this._onLangChange);
	}, this);

	this.addSorting();
}

Portfolio.prototype._handleInputClick = function (evt) {
	var input = evt.currentTarget;
	input.parentElement.classList.toggle("active");
}

Portfolio.prototype._handleTypeChange = function (evt) {
	this._handleInputClick(evt);
	this.filters.types = this._getCurrentTypeFilters();
	this.filter();
};

Portfolio.prototype._handleLangChange = function (evt) {
	this._handleInputClick(evt);
	this.filters.langs = this._getCurrentLangFilters();
	this.filter();
}

Portfolio.prototype._getCurrentTypeFilters = function () {
	return this.types.reduce(function (filters, input) {
		if (input.checked) filters.push(input.value);
		return filters;
	}, [])
}

Portfolio.prototype._getCurrentLangFilters = function () {
	return this.langs.reduce(function (filters, input) {
		if (input.checked) filters.push(input.value);
		return filters;
	}, [])
}

Portfolio.prototype.filter = function () {
	if (this.hasActiveFilters()) {
		this.shuffle.filter(this.itemPassesFilters.bind(this));
	} else {
		this.shuffle.filter(Shuffle.ALL_ITEMS);
	}

}

Portfolio.prototype.itemPassesFilters = function (element) {
	var types = this.filters.types;
	var langs = this.filters.langs;

	var type = element.getAttribute("data-type");
	var lang = element.getAttribute("data-langs");
	if (types.length > 0 && !types.includes(type)) {
		return false;
	}
	if (langs.length > 0) {
		if (lang != null) {
			var currentLangs = lang.split(",");
			var elementHasLang = false;
			for (var i = 0; i < currentLangs.length; i++) {
				var l = currentLangs[i];
				if (langs.includes(l)) {
					elementHasLang = true;
					break;
				}
			}
			if (!elementHasLang) return false;
		} else {
			return false;
		}
	}

	return true;
}

Portfolio.prototype.hasActiveFilters = function () {
	return Object.keys(this.filters).some(function (key) {
		return this.filters[key].length > 0;
	}, this);
}

Portfolio.prototype._handleSortChange = function (evt) {
	var input = evt.currentTarget;
	var value = input.value;
	if (input.parentElement.classList.contains("active")) return;
	this.sortButtons.forEach(function (input) {
		input.checked = input.value === value;
		if (!input.checked) {
			input.parentElement.classList.remove("active");
		}
	})
	this._handleInputClick(evt);

	function sortByDate(el) {
		return new Date(el.getAttribute("data-date"));
	}

	function sortByType(el) {
		return el.getAttribute("data-type");
	}

	function sortByTitle(el) {
		return el.querySelector(".portfolio-card-title").innerHTML;
	}

	var optsHash = {
		date: {
			reverse: true,
			by: sortByDate
		},
		type: {
			by: sortByType
		},
		title: {
			by: sortByTitle
		}
	};

	var opts;

	opts = optsHash[value] ? optsHash[value] : {};

	this.shuffle.sort(opts);
}

Portfolio.prototype.addSorting = function () {
	this.sortButtons = Array.from(document.querySelectorAll("#sort-options input"));
	this.sortButtons.forEach(function (input) {
		input.addEventListener('click', this._handleSortChange.bind(this));
	}, this);
}

document.addEventListener('DOMContentLoaded', function () {
	window.Portfolio = new Portfolio(document.querySelector(".card-holder"));
});