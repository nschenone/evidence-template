module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:svelte/recommended',
		'prettier',
		'plugin:storybook/recommended'
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 13,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: '*.svelte',
			rules: {
				'svelte/no-at-html-tags': 'off'
			}
		}
	]
};
