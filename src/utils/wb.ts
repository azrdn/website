import { type StdioOptions, spawn } from "node:child_process";
import { watch } from "node:fs";
import { build } from "astro";

const [command, ...args] =
	process.argv[2] === "cf" ? ["wrangler", "dev"] : ["astro", "preview"];
const stdio: StdioOptions = ["ignore", "inherit", "inherit"];
const child = spawn(command, args, { stdio });

let build_ongoing = false;

process.on("SIGINT", () => {
	child.kill("SIGINT");
	console.log("Exiting");
	process.exit();
});

watch(`${process.cwd()}/src`, { recursive: true }, async () => {
	if (build_ongoing) return;

	build_ongoing = true;
	await build({ root: process.cwd() }, { teardownCompiler: false });
	build_ongoing = false;
});
