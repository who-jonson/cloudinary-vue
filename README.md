# Cloudinary Vue SDK

[![Build Status](https://travis-ci.org/cloudinary/cloudinary-vue.svg?branch=master)](https://travis-ci.org/cloudinary/cloudinary-vue)

Cloudinary is a [cloud-based service](https://cloudinary.com/solutions) that provides an end-to-end image and video management solution
including uploads,storage, manipulations, optimizations and delivery. 
All your media resources are optimized and delivered through a fast CDN using industry best practices.

Using Cloudinary's Vue.js SDK, you can easily perform smart image and video manipulations 
using code that integrates seamlessly with your existing Vue.js application, and deliver optimized and responsive media to your users.

This Readme provides basic installation and usage information. For the complete documentation, see the [Vue.js SDK guide](https://cloudinary.com/documentation/vue_integration)_

# 🛠️ Installation 
## Vue 3.x

Install using your favorite package manager (yarn, npm)
    ```bash
    npm install cloudinary-vue
    yarn add cloudinary-vue
    ```

### Nuxt.js

Please use [Cloudinary module](https://cloudinary.nuxtjs.org/) for [Nuxt.js](https://nuxtjs.org) projects. You can set it up by using the following:

```
yarn add @nuxtjs/cloudinary
#OR
npm i @nuxtjs/cloudinary
```

## Setup and configuration

### Vue 3.x - Setup and configuration
1. **A Global setup** - Include CloudinaryVue globally 
    ```javascript
    // main.js
    import { createApp } from 'vue';
    import Cloudinary, { CldImage, CldTransformation } from 'cloudinary-vue';
    
    const app = createApp({ /* component options */ });
    
    // Install Cloudinary
    app.use(Cloudinary, {
      configuration: { 
         cloudName: 'demo'
      },
      components: {
        CldImage,
        CldTransformation
      }
    });
   
    app.mount('#app');
    ```
   
2. **A Local setup** - You can also import the cloudinary components manually in each of your components.

```html
<!-- ExampleComponent.vue -->
<script>
   import { CldImage, CldTransformation } from 'cloudinary-vue';
	
   export default {
      name: 'ExampleComponent',
      components: {
        CldImage,
        CldTransformation
      }
   }
</script>
```

# Plugin Configuration
The CloudinaryVue Plugin accepts a `components` object with the Cloudinary components to install

   - `components` can also be passed as an array: 
      ```javascript
      components:[CldImage. CldTransformation]
      ```
 
   - `components` can also be used to rename the cloudinary components:   
       ```javascript
           components: {
               myImage: CldImage,
               myTransformation: CldTransformation
           }
       ```

# General usage

In order to properly use this library you have to provide it with a few configuration parameters. All configuration parameters can be applied directly to the element, using a `CldContext` component or while installing a plugin (second argument of `Vue.use`).

```html
<template>
  <div>
    <h1>Hello, world!</h1>

    <CldImage cloudName="demo" publicId="sample" crop="scale" width="300" />

    <CldContext cloudName="demo">
      <CldImage publicId="sample">
        <CldTransformation crop="scale" width="200" angle="10" />
      </CldImage>
    </CldContext>
  </div>
</template>
```

Required:

- `cloudName` - The cloudinary cloud name associated with your Cloudinary account.

Optional:

- `privateCdn`, `secureDistribution`, `cname`, `cdnSubdomain` - Please refer to [Cloudinary Documentation](https://cloudinary.com/documentation/react_integration#3_set_cloudinary_configuration_parameters) for information on these parameters.

### Specific usage

The library includes 5 components:

- `CldContext`
- `CldTransformation`
- `CldImage`
- `CldVideo`
- `CldPoster` (only used together with `CldVideo`)

#### CldContext

`CldContext` allows you to define shared configuration and resource transformation parameters that are applied to all children elements.

#### CldImage

outputs HTML `img` tag with a correct `src` attribute for provided Cloudinary resource, based on configuration and transformation parameters provided as attributes of this component instance, parent `CldContext` and children `CldTransformation` instances.

#### CldVideo

outputs HTML `video` tag with a correct `sources` for provided Cloudinary resource, based on configuration and transformation parameters provided as attributes of this component instance, parent `CldContext` and children `CldTransformation` instances.

#### CldPoster (optional)
specify image resource to be provided to `poster` attribute of the `video` element

#### CldTransformation

The Transformation element allows you to defined additional transformations on the parent element. You can also use built-in `transformation` attribute available in `CldImage` and `CldVideo` for the same effect.

For example:

```jsx
<CldImage cloudName="demo" publicId="sample">
  <CldTransformation angle="-45" />
  <CldTransformation effect="trim" angle="45" crop="scale" width="600" />
  <CldTransformation overlay="text:Arial_100:Hello" />
</CldImage>
```

## How to contribute?

See [contributing guidelines](/CONTRIBUTING.md) in a separate file.

## Additional resources

Additional resources are available at:

- [Website](http://cloudinary.com)
- [Documentation](https://cloudinary.com/documentation/vue_integration)
- [Knowledge Base](http://support.cloudinary.com/forums)
- [Image transformations documentation](http://cloudinary.com/documentation/image_transformations)
- [Video transformations documentation](https://cloudinary.com/documentation/video_manipulation_and_delivery#video_transformations_reference)
- [Cli plugin for Cloudinary Vue](https://github.com/cloudinary/vue-cli-plugin-cloudinary)

## Support

You can [open an issue through GitHub](https://github.com/CloudinaryLtd/cloudinary_vue/issues).

Contact us at [http://cloudinary.com/contact](http://cloudinary.com/contact).

Stay tuned for updates, tips and tutorials: [Blog](http://cloudinary.com/blog), [Twitter](https://twitter.com/cloudinary), [Facebook](http://www.facebook.com/Cloudinary).

## Join the Community

Impact the product, hear updates, test drive new features and more! Join [here](https://www.facebook.com/groups/CloudinaryCommunity).

## License

Released under the MIT license.
