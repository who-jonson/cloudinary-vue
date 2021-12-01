<template>
	<div id="app">
		<CldImage
			cloudName="demo"
			publicId="woman"
			responsive="fill"
			crop="fill"
			loading="lazy"
      lazy
		>
			<CldTransformation radius="20" />
			<CldTransformation effect="sepia" />
			<CldTransformation overlay="text:arial_60:This is my picture" gravity="north" y="20" />
			<CldTransformation angle="20" />
		</CldImage>

    <CldUploadWidget
      ref="upload"
      cloudName="demo"
      uploadPreset="default"
      v-slot="{ open }"
    >
      <button type="button" @click.prevent="open()">Open Uploader</button>
    </CldUploadWidget>

	</div>
</template>

<script>
import { CldUploadWidget } from '@/index';
export default {
	name: 'App',
	components: {
		CldUploadWidget
	}
};
</script>

<style>
#app {
  height:500px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
