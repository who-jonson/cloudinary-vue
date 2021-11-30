import Vue from 'vue';
import { mount } from '@vue/test-utils';
import CldVideo from '../../../src/components/CldVideo/CldVideo.vue';
import CldPoster from '../../../src/components/CldVideo/CldPoster';
import CldTransformation from '../../../src/components/CldTransformation/CldTransformation';

describe('CldVideo Component tests', () => {
	it('should render a video poster as a video/upload type', async() => {
		const wrapper = mount({
			template: `
        <cld-video width="100" crop="fill" cloudName="demo" class="video" ref="videoElement" public-id="sample">
          <cld-transformation effect="sepia" />
        </cld-video>
      `
		}, {
			components: { CldVideo, CldTransformation }
		});

		await Vue.nextTick();

		const video = wrapper.find('video');

		expect(video.attributes('poster')).toEqual(
			'http://res.cloudinary.com/demo/video/upload/e_sepia/c_fill,w_100/sample.jpg'
		);
	});

	it('should render a video poster', async() => {
		const wrapper = mount({
			template: `
        <cld-video cloudName="demo" publicId="face_top">
          <cld-poster publicId="small_dinosaur" />
        </cld-video>
      `
		}, {
			components: { CldVideo, CldPoster }
		});

		await Vue.nextTick();

		const video = wrapper.find('video');

		expect(video.attributes('poster')).toBe(
			'http://res.cloudinary.com/demo/image/upload/small_dinosaur'
		);
	});

	it('should render with props', async() => {
		const wrapper = mount({
			template: `<cld-video cloudName="demo" publicId="face_top" poster="zxc" />`,
			components: { CldVideo }
		});

		const video = wrapper.find('video');

		expect(video.attributes('poster')).toBe('zxc');
	});

	it("should use video's publicId if non specified (And support nested transformations)", async() => {
		const wrapper = mount({
			template: `
        <cld-video cloudName="demo" publicId="face_top">
          <cld-transformation effect="sepia" />
          <cld-poster>
            <cld-transformation effect="blur" />
          </cld-poster>
        </cld-video>
      `,
			components: { CldVideo, CldPoster, CldTransformation }
		});

		await Vue.nextTick();

		const video = wrapper.find('video');
		wrapper.vm.$forceUpdate();

		expect(video.attributes('poster')).toBe(
			'http://res.cloudinary.com/demo/image/upload/e_blur/face_top'
		);
	});

	it('should parse transformations correctly when nested within poster', async() => {
		const wrapper = mount({
			template: `
        <cld-video cloudName="demo" publicId="face_top">
          <cld-transformation effect="sepia" />
          <cld-poster publicId="small_dinosaur">
            <cld-transformation effect="blur" />
          </cld-poster>
        </cld-video>
      `,
			components: { CldVideo, CldPoster, CldTransformation }
		});

		await Vue.nextTick();
		const video = wrapper.find('video');
		wrapper.vm.$forceUpdate();

		expect(video.attributes('poster')).toBe(
			'http://res.cloudinary.com/demo/image/upload/e_blur/small_dinosaur'
		);
	});

	it('will contain default poster if no poster data is provided', async() => {
		const wrapper = mount({
			template: `<cld-video cloudName="demo" publicId="face_top"/>`,
			components: { CldVideo }
		});

		const video = wrapper.find('video');

		expect(video.attributes('poster')).toBe(
			'http://res.cloudinary.com/demo/video/upload/face_top.jpg'
		);
	});

	it('accepts poster properties as an object', async() => {
		const wrapper = mount({
			template: `
        <cld-video
          cloudName="demo"
          publicId="face_top"
          :poster="{ publicId: 'small_dinosaur', effect: 'blur' }"
        />
      `,
			components: { CldVideo }
		});

		const video = wrapper.find('video');

		expect(video.attributes('poster')).toBe(
			'http://res.cloudinary.com/demo/image/upload/e_blur/small_dinosaur'
		);
	});
});
