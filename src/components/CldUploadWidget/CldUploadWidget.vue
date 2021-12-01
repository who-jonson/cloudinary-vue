<script>
import { h, ref, onUnmounted, onBeforeMount, onBeforeUnmount, useSlots } from 'vue';
import { COMPONENTS, WIDGET_LINKS } from '@/constants';
import { loadScript, unloadScript } from '@/utils/script-loader';

export default {
	name: COMPONENTS.CldUploadWidget,
	props: {
		sources: { type: Array, default: () => ['url', 'camera', 'local'] },
		allowedFormats: { type: Array, default: null },
		defaultSource: { type: String, default: 'local' },
		tag: { type: String, default: 'span' },
		tags: { type: Array, default: null },
		folder: { type: String, default: 'uploads' },
		publicId: { type: String, default: null },
		cropping: { type: Boolean, default: false },
		multiple: { type: Boolean, default: true },
		secure: { type: Boolean, default: true },
		showPoweredBy: { type: Boolean, default: true },
		showAdvancedOptions: { type: Boolean, default: false },
		maxFiles: { type: Number, default: 10 },
		styles: { type: Object, default: null },
		maxImageWidth: { type: Number, default: null },
		maxImageHeight: { type: Number, default: null },
		cloudName: { type: String, required: true },
		uploadPreset: { type: String, default: null },
		maxImageFileSize: { type: Number, default: 3000000 },
		croppingAspectRatio: { type: Number, default: null },
		generateSignature: { type: [Function, String], default: null },
		buttonCaption: { type: String, default: 'Upload Image' }
	},
	setup(props, { emit, expose }) {
		if (!props.generateSignature && !props.uploadPreset) {
			throw new Error('Prop uploadPreset is required if uploadSignature is not used!');
		}
		const slots = useSlots();
		const uploadWidget = ref(null);
		const scriptLoaded = ref(false);
		const cloudinaryOptions = ref({});

		cloudinaryOptions.value = {
			cloudName: props.cloudName,
			uploadPreset: props.uploadPreset,
			uploadSignature: props.generateSignature,
			sources: props.sources,
			folder: props.folder,
			publicId: props.publicId,
			tags: props.tags,
			clientAllowedFormats: props.allowedFormats,
			buttonCaption: props.buttonCaption,
			showPoweredBy: props.showPoweredBy,
			showAdvancedOptions: props.showAdvancedOptions,
			cropping: props.cropping,
			multiple: props.multiple,
			secure: props.secure,
			defaultSource: props.defaultSource,
			maxImageWidth: props.maxImageWidth,
			maxImageHeight: props.maxImageHeight,
			maxImageFileSize: props.maxImageFileSize,
			croppingAspectRatio: props.croppingAspectRatio,
			showUploadMoreButton: props.multiple,
			styles: props.styles || {
				palette: {
					window: '#F5F5F5',
					sourceBg: '#FFFFFF',
					windowBorder: '#90a0b3',
					tabIcon: '#0094c7',
					inactiveTabIcon: '#69778A',
					menuIcons: '#0094C7',
					link: '#53ad9d',
					action: '#8F5DA5',
					inProgress: '#0194c7',
					complete: '#53ad9d',
					error: '#c43737',
					textDark: '#000000',
					textLight: '#FFFFFF'
				},
				fonts: {
					default: null,
					"'Exo 2', 'system-ui', '-apple-system', '.AppleSystemUIFont', 'BlinkMacSystemFont', sans-serif": {
						url: 'https://fonts.googleapis.com/css2?family=Exo+2:wght@100;200;300;400;500;600;700;800;900&display=swap',
						active: true
					}
				}
			}
		};

		const initiateWidget = (cloudinary, options) => {
			uploadWidget.value = cloudinary.createUploadWidget(options, (error, result) => {
				if (!error && result) {
					if (process.env.NODE_ENV !== 'production') {
						console.log(`Upload Widget Event Info (${result.event}):--- `, result.info);
					}

					emit(result.event, result.info);
					if (result.event === 'queues-end') {
						emit('upload', result.info.files.map(file => ({
							...file.uploadInfo,
							id: file.id,
							size: file.size,
							name: file.name,
							dimensions: file.dimensions
						})));
					}
				}
			});
			expose({ ...uploadWidget.value });
		};

		onBeforeMount(() => {
			loadScript(WIDGET_LINKS.UPLOAD).then(() => {
				const intVal = setInterval(() => {
					if (window && window.cloudinary) {
						clearInterval(intVal);
						scriptLoaded.value = true;
						initiateWidget(window.cloudinary, cloudinaryOptions.value);
					}
				}, 250);
			});
		});

		onBeforeUnmount(() => {
			uploadWidget.value.destroy();
		});

		onUnmounted(async() => {
			await unloadScript(WIDGET_LINKS.UPLOAD);
		});

		return () => {
			return scriptLoaded.value && slots.default
				? h(props.tag, slots.default({ ...uploadWidget.value }))
				: null;
		};
	}
};
</script>

<style scoped>

</style>
