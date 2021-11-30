import { mount } from '@vue/test-utils';
import CldImage from '../../../../src/components/CldImage/CldImage';

function mountImageComponent(props) {
	const wrapper = mount(CldImage, {
		propsData: Object.assign({
			cloudName: 'demo',
			publicId: 'face_top'
		}, props)
	});

	const image = wrapper.find('img');
	const imgSrc = image && image.attributes ? image.attributes('src') : '';

	return {
		wrapper,
		image,
		imgSrc
	};
}

export default mountImageComponent;
