import { computeOptions, extendOptions, computePlaceholder } from '../../../src/helpers/computeOptions';
import { predominantColorTransform, predominantColorTransformPxl } from '../../../src/constants';

describe('computeOptions', () => {
	it('hasProgressive', () => {
		const options = {
			withProgressive: true
		};

		expect(computeOptions(options)).toEqual({
			transformation: [{ flags: ['progressive'] }]
		});
	});

	it('has no Progressive passed', () => {
		const options = {};

		expect(computeOptions(options)).toEqual({
			transformation: [{}]
		});
	});
});

describe('extendOptions', () => {
	it('has no baseOptions', () => {
		expect(extendOptions()).toEqual({
			transformation: []
		});
	});
	it('has no baseOptions but has extra', () => {
		expect(extendOptions({}, { width: 50 })).toEqual({
			transformation: [{ width: 50 }]
		});
	});

	it('has baseOptions', () => {
		expect(extendOptions({ transformation: [{ height: 2100 }] }, { width: 50 })).toEqual({
			transformation: [{ height: 2100 }, { width: 50 }]
		});
	});
});

describe('computePlaceholder', () => {
	it('non predominant type', () => {
		expect(computePlaceholder('blur')).toEqual({
			transformation: [{
				effect: 'blur:2000', quality: 1, fetch_format: 'auto'
			}]
		});
	});

	it('predominant type', () => {
		expect(computePlaceholder('predominant-color')).toEqual({
			transformation: predominantColorTransform
		});
	});

	it('predominant with size', () => {
		expect(computePlaceholder('predominant-color', { width: 100, height: 100 })).toEqual({
			width: 100,
			height: 100,
			transformation: predominantColorTransformPxl
		});
	});

	it('illegal type', () => {
		expect(computePlaceholder('p', { width: 100, height: 100 })).toEqual({
			width: 100,
			height: 100,
			transformation: [{}]
		});
	});
});
