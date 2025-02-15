import { describe, expect, it, vi } from 'vitest';
/** @type {undefined | string} */
let basePath = undefined;

vi.mock('$evidence/config', () => ({
	config: {
		deployment: {
			get basePath() {
				return basePath;
			}
		}
	}
}));
vi.mock('../../../../configuration/getEvidenceConfig.js', () => ({
	getEvidenceConfig() {
		return {
			deployment: {
				get basePath() {
					return basePath;
				}
			}
		};
	}
}));

import { addBasePathToHrefAndSrc } from './addBasePathToHrefAndSrc.js';
describe('addBasePathToHrefAndSrc', () => {
	it('should leave files without href/src untouched', () => {
		const content = '<div>test</div>';
		expect(addBasePathToHrefAndSrc.markup({ content, filename: '+page.md' }).code).toBe(content);
	});
	it('should add the base path to a relative link', () => {
		basePath = '/base';
		const content = '<a href="/test">test</a><img src="/test">test</img>';
		expect(addBasePathToHrefAndSrc.markup({ content, filename: '+page.md' }).code).toBe(
			'<a href="/base/test">test</a><img src="/base/test">test</img>'
		);
	});
	it('should add the base path to multiple relative paths', () => {
		basePath = '/base';
		const content =
			'<a href="/test">test</a><a href="/test2">test2</a><img src="/test">test</img><img src="/test2">test2</img>';
		expect(addBasePathToHrefAndSrc.markup({ content, filename: '+page.md' }).code).toBe(
			'<a href="/base/test">test</a><a href="/base/test2">test2</a><img src="/base/test">test</img><img src="/base/test2">test2</img>'
		);
	});
	it('should ignore absolute paths', () => {
		basePath = '/base';
		const content =
			'<a href="https://example.com/test">test</a><img src="https://example.com/test">test</img>';
		expect(addBasePathToHrefAndSrc.markup({ content, filename: '+page.md' }).code).toBe(content);
	});
	it('should properly handle a mix of absolute and relative paths', () => {
		basePath = '/base';
		const content =
			'<a href="https://example.com/test">test</a><a href="/test">test</a><img src="https://example.com/test">test</img><img src="/test">test</img>';
		expect(addBasePathToHrefAndSrc.markup({ content, filename: '+page.md' }).code).toBe(
			'<a href="https://example.com/test">test</a><a href="/base/test">test</a><img src="https://example.com/test">test</img><img src="/base/test">test</img>'
		);
	});
	it('should work on paths in single quotes', () => {
		basePath = '/base';
		const content = "<a href='/test'>test</a><img src='/test'>test</img>";
		expect(addBasePathToHrefAndSrc.markup({ content, filename: '+page.md' }).code).toBe(
			"<a href='/base/test'>test</a><img src='/base/test'>test</img>"
		);
	});
	it('should work on paths in double quotes', () => {
		basePath = '/base';
		const content = '<a href="/test">test</a><img src="/test">test</img>';
		expect(addBasePathToHrefAndSrc.markup({ content, filename: '+page.md' }).code).toBe(
			'<a href="/base/test">test</a><img src="/base/test">test</img>'
		);
	});
	it('should work on paths with no quotes', () => {
		basePath = '/base';
		const content = '<a href=/test>test</a><img src=/test>test</img>';
		expect(addBasePathToHrefAndSrc.markup({ content, filename: '+page.md' }).code).toBe(
			'<a href=/base/test>test</a><img src=/base/test>test</img>'
		);
	});
});
