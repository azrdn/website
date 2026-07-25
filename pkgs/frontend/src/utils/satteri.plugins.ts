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

export const hastPlugins = [extLinks, codeButtons];
export const mdAstPlugins = [];
