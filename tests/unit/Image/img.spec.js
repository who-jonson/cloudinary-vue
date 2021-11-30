import Vue from 'vue';
import { mount } from '@vue/test-utils';
import CldImage from '../../../src/components/CldImage/CldImage.vue';
import CldTransformation from '../../../src/components/CldTransformation/CldTransformation';
import { PLACEHOLDER_CLASS, IMAGE_CLASSES } from '../../../src/constants';

import testWithMockedIntersectionObserver from './utils/testWithMockedIntersectionObserver';
import mountImageComponent from './utils/mountImageComponent';

describe('Tests for CldImage', () => {
	it('Does not render anything with no publicId', () => {
		const wrapper = mount(CldImage, {
			propsData: Object.assign({
				cloudName: 'demo',
				publicId: ''
			})
		});

		expect(wrapper.find('img').exists()).toBe(false);
	});

	it('Renders with a publicId', () => {
		const { imgSrc } = mountImageComponent({
			publicId: 'sample123'
		});

		expect(imgSrc).toBe(`http://res.cloudinary.com/demo/image/upload/sample123`);
	});

	it('Loads the image only when in viewport (intersection observer)', () => {
		testWithMockedIntersectionObserver((mockIntersectionCallback) => {
			// Create an instance
			const { wrapper } = mountImageComponent({
				loading: 'lazy',
				placeholder: 'color'
			});

			// Since we're lazy loading, we expect not to be visible
			expect(wrapper.vm.visible).toBe(false);

			// Mock an intersection call, this should turn the component visible
			mockIntersectionCallback([{
				target: wrapper.element,
				isIntersecting: true
			}]);

			// Component should now be visible
			expect(wrapper.vm.visible).toBe(true);
		});
	});

	it('Shows the placeholder while the image is still loading(lazyload)', () => {
		testWithMockedIntersectionObserver(() => {
			const { wrapper } = mountImageComponent({
				loading: 'lazy',
				placeholder: 'color'
			});

			const cldImageEl = wrapper.find(`.${IMAGE_CLASSES.DEFAULT}`);
			const cldPlaceholder = wrapper.find(`.${PLACEHOLDER_CLASS}`);

			expect(cldImageEl.attributes('src')).toBe('');
			expect(cldPlaceholder.attributes('src')).toBe(
        `http://res.cloudinary.com/demo/image/upload/$nh_ih,$nw_iw,c_scale,q_1,w_1/c_scale,h_$nh,w_$nw/face_top`
			);
		});
	});

	it('Supports transformation props, dpr_auto should not be changed when non responsive', () => {
		const { wrapper, imgSrc } = mountImageComponent({
			cloudName: 'demo',
			publicId: 'face_top',
			effect: 'sepia',
			dpr: 'auto'
		});

		expect(imgSrc).toBe(`http://res.cloudinary.com/demo/image/upload/dpr_auto,e_sepia/face_top`);
	});

	it('Cascades non-cloudinary configuration attributes to the HTML img tag', () => {
		const { wrapper, image, imgSrc } = mountImageComponent({
			cloudName: 'demo',
			publicId: 'face_top',
			'aria-hidden': true,
			'some-future-html-prop': true
		});

		expect(imgSrc).toBe(`http://res.cloudinary.com/demo/image/upload/face_top`);
		expect(image.attributes('aria-hidden')).toBe('true');
		expect(image.attributes('some-future-html-prop')).toBe('true');
		expect(image.attributes('cloudName')).toBe(undefined);
	});

	it('Cascades width and height to the HTML img tag', () => {
		const { wrapper, image, imgSrc } = mountImageComponent({
			cloudName: 'demo',
			publicId: 'face_top',
			width: 100,
			height: 200
		});

		expect(image.attributes('src')).toBe(`http://res.cloudinary.com/demo/image/upload/face_top`);
		expect(image.attributes('width')).toBe('100');
		expect(image.attributes('height')).toBe('200');
	});

	/**
   * There is an issue with provide/inject with render component - https://github.com/vuejs/vue/issues/9822
   */
	it('Accepts Variable as argument', async() => {
		const wrapper = mount({
			template: `
        <cld-image cloudName="demo" publicId="face_top" placeholder="color">
          <cld-transformation :variables="[['$imgWidth','150'], ['$width','150']]" />
        </cld-image>
      `,
			components: { CldImage, CldTransformation }
		});

		await Vue.nextTick();

		const image = wrapper.find('img');

		expect(image.attributes('src')).toBe('http://res.cloudinary.com/demo/image/upload/$imgWidth_150,$width_150/face_top');
	});
});
