import * as Core from 'cloudinary-core';
import * as plugin from './plugin';
import CldContext from './components/CldContext/CldContext';
import CldImage from './components/CldImage/CldImage';
import CldVideo from './components/CldVideo/CldVideo';
import CldPoster from './components/CldVideo/CldPoster';
import CldTransformation from './components/CldTransformation/CldTransformation';
import CldPlaceholder from './components/CldPlaceholder/CldPlaceholder';
import CldUploadWidget from './components/CldUploadWidget/CldUploadWidget';

const Cloudinary = {
	install: (app, options = {}) => {
		plugin.install(
			app,
			{
				...options,
				components: options.components || { CldContext, CldImage, CldVideo, CldTransformation, CldPoster, CldPlaceholder }
			}
		);
	}
};

export {
	Core,
	Cloudinary as default,
	Cloudinary,
	CldContext,
	CldImage,
	CldVideo,
	CldTransformation,
	CldPoster,
	CldPlaceholder,
	CldUploadWidget
};
