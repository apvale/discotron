/**
 * Parent class for all Widgets, handle basic display and buttons
 */
window.Discotron.WidgetController = class {
	/**
	 * @constructor
	 * @param {string} widgetPageName Name of the html file of the widget 
	 * @param {function} onSave  Called when the user saves
	 * @param {function} callback Called when widget is displayed
	 * @param {function} onClose Called when widget is closed
	 */
	constructor(widgetPageName, onSave, callback = () => {}, onClose = () => {}) {
		this._onClose = onClose;
		this._onSave = onSave;
		this._widgetPageName = widgetPageName;
		this._widgetContainer = undefined;
		this._displayWidget(callback);
	}

	/**
	 * Display modal, OK and Cancel button, background
	 * @param {function} callback Called when widget is displayed
	 */
	_displayWidget(callback) {
		// Get html file and put it into <main>
		const baseURL = "/dashboard/src/views/widgets/";
		this._widgetContainer = document.createElement("div");
		this._widgetContainer.classList.add("widget-background");

		Discotron.utils.load(baseURL + "base-widget.html", this._widgetContainer, () => {
			Discotron.utils.load(baseURL + this._widgetPageName, this._widgetContainer.querySelector(".widget-content"), () => {
				document.querySelector("main").appendChild(this._widgetContainer);

				callback();

				this._addEvents();
			});
		});
	}

	/**
	 * Add on close, on save, on background click, ...
	 */
	_addEvents() {
		this._widgetContainer.onclick = (evt) => {
			if (evt.target === this._widgetContainer || evt.target === this._widgetContainer.querySelector(".widget-middle")) {
				this._onSave();
				this._widgetContainer.remove();
			}
		};

		this._widgetContainer.querySelector(".cancel-button").onclick = (evt) => {
			this._onClose();
			this._widgetContainer.remove();
		};

		this._widgetContainer.querySelector(".save-button").onclick = (evt) => {
			this._onSave();
			this._widgetContainer.remove();
		};
	}
};