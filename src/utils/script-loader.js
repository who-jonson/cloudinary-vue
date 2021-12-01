/**
 * @param {String} src
 * @param {Boolean} [head=true]
 *
 * @returns {Promise<Element>}
 */
export const loadScript = (src, head = true) => {
	return new Promise(function(resolve, reject) {
		let shouldAppend = false;
		const appendsTo = head ? 'head' : 'body';

		let el = document[appendsTo].querySelector('script[src="' + src + '"]');
		if (!el) {
			el = document.createElement('script');
			el.type = 'text/javascript';
			el.async = true;
			el.src = src;
			shouldAppend = true;
		} else if (el.hasAttribute('data-loaded')) {
			resolve(el);
			return;
		}

		el.addEventListener('error', reject);
		el.addEventListener('abort', reject);
		el.addEventListener('load', function loadScriptHandler() {
			el.setAttribute('data-loaded', true);
			resolve(el);
		});

		if (shouldAppend) document[appendsTo].appendChild(el);
	});
};

/**
 * @param {String} src
 * @param {Boolean} [head=true]
 *
 * @returns {Promise<Boolean>}
 */
export const unloadScript = (src, head = true) => {
	return new Promise(function(resolve) {
		const appendsTo = head ? 'head' : 'body';

		const el = document[appendsTo].querySelector('script[src="' + src + '"]');

		if (!el) {
			resolve(false);
			return;
		}

		document[appendsTo].removeChild(el);

		resolve(true);
	});
};
