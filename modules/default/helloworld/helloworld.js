
Module.register("helloworld",{

	// Default module config.
	defaults: {
		text: "Hello World!"
	},

	getTemplate: function () {
		return "helloworld.njk"
	},

	getTemplateData: function () {
		return this.config
	}
});
