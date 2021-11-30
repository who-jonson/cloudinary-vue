<template>
	<div id="app">
		<CldImage
			cloudName="demo"
			publicId="woman"
			responsive="fill"
			crop="fill"
			loading="lazy"
		>
			<CldTransformation radius="20" />
			<CldTransformation effect="sepia" />
			<CldTransformation overlay="text:arial_60:This is my picture" gravity="north" y="20" />
			<CldTransformation angle="20" />
		</CldImage>
	</div>
</template>

<script>

export default {
	name: 'App'
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
