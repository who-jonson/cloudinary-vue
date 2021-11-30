import { createApp } from 'vue';

import App from './App.vue';
import Cloudinary, {
	CldImage,
	CldVideo,
	CldContext,
	CldTransformation
} from '../src/index';

const app = createApp(App);

app.use(Cloudinary, {
	configuration: { cloudName: 'demo' },
	components: [CldImage, CldTransformation, CldVideo, CldContext]
});

app.mount('#app');
