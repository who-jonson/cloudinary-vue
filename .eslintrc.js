module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue-libs/recommended'
	],
	rules: {
		'comma-dangle': ['error', 'never'],
		indent: ['error', 'tab', {
			ignoredNodes: ['TemplateLiteral']
		}],
		quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
		'space-before-function-paren': ['error', 'never'],
		semi: ['error', 'always'],
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-tabs': 'off',
		'no-undef': 'off',
		'no-unused-vars': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'vue/script-setup-uses-vars': 'off'
	},
	parserOptions: {
		parser: '@babel/eslint-parser',
		extraFileExtensions: ['.vue'],
		ecmaFeatures: {
			jsx: true
		}
	}
};
