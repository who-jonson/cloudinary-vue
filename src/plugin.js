export function install(app, options = {}) {
	if (app.CldInstalled) {
		throw new Error('Cloudinary plugin already installed');
	}

	app.CldInstalled = true;

	initComponents(app, options);
}

function registerComponents(app, components = {}, defaultConfigurations = {}) {
	/* eslint-disable-next-line */
  if (!defaultConfigurations) { console.warn('🛑 There is no default configuration for Cloudinary found!') }

	for (let key in components) {
		const component = components[key];

		if (component) {
			const data = component.data ? component.data() : {};

			app.component(key, {
				...component,
				data() {
					return {
						...data,
						defaultConfigurations
					};
				}
			});
		}
	}
}

function initComponents(app, options) {
	const configuration = options.configuration;
	const components = Array.isArray(options.components) ? options.components.reduce((obj, component) => ({
		...obj,
		[component.name]: component
	}), {}) : options.components;

	registerComponents(app, components, configuration);
}
