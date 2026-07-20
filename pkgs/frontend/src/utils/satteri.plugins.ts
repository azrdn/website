import { defineHastPlugin } from "satteri";

const extLinks = defineHastPlugin({
	name: "external-links",
	element: {
		filter: ["a"],
		visit(node, ctx) {
			const href = node.properties.href;
			if (typeof href !== "string" || !href.startsWith("http")) return;
			ctx.setProperty(node, "rel", "external nofollow");
		},
	},
});

const headingLinks = defineHastPlugin({
	name: "heading-links",
	element: {
		filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
		visit(node, ctx) {
			const id = node.properties.id;
			if (typeof id !== "string") return;
			ctx.prependChild(node, {
				type: "element",
				tagName: "a",
				properties: {
					href: `#${id}`,
					tabindex: -1,
					ariaLabel: "Permalink for this heading",
				},
				children: [
					{
						type: "element",
						tagName: "span",
						children: [],
						properties: {
							className: ["icon"],
						},
					},
				],
			});
		},
	},
});

const codeButtons = defineHastPlugin({
	name: "code-buttons",
	element: {
		filter: ["pre"],
		visit(node, ctx) {
			const [child] = node.children;
			if (child?.type !== "element") return;
			if (child.tagName !== "code") return;
			ctx.wrapNode(node, {
				type: "element",
				tagName: "div",
				children: [],
				properties: {
					className: ["codeblock"],
				},
			});
		},
	},
});

export default [extLinks, headingLinks, codeButtons];
