import { COMPONENTS } from '@/constants';

/**
 *
 * @param {Array<VNode>} children - nested Vue components
 * @returns {Object|VNode|null} cld-placeholder component if found.
 */
export const getCldPlaceholder = (children = []) => {
	return children?.find(child => isCldPlaceholder(child));
};

/**
 *
 * @param {Array<VNode>} children - nested Vue components
 * @returns {Object|VNode|null} cld-placeholder component if found.
 */
export const getCldPoster = (children = []) => {
	return children?.find(child => isCldPoster(child));
};

/**
 * @param {VNode} component
 * @returns {String|null}
 */
export const getComponentName = (component) => {
	return component.componentOptions?.Ctor?.extendOptions?.name || component.type?.name;
};

/**
* @param {VNode} component
* @returns {Boolean} true if component is CldPlaceholder
*/
export const isCldPlaceholder = (component) => getComponentName(component) === COMPONENTS.CldPlaceholder;

/**
 * @param {VNode} component
 * @returns {Boolean} true if component is CldPlaceholder
 */
export const isCldPoster = (component) => getComponentName(component) === COMPONENTS.CldPoster;
