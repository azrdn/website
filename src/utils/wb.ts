import { exec, type StdioOptions, spawn } from "node:child_process";
import { watch } from "node:fs";

const [command, ...args] =
	process.argv[2] === "cf"
		? ["wrangler", "dev", "--log-level=none"]
		: ["astro", "preview"];
const stdio: StdioOptions = ["ignore", "inherit", "inherit"];

const server = spawn(command, args, { stdio });
let build_ongoing = false;

process.on("SIGINT", () => {
	server.kill("SIGINT");
	console.log("Exiting");
	process.exit();
});

watch(`${process.cwd()}/src`, { recursive: true }, async () => {
	if (build_ongoing) return;

	build_ongoing = true;
	exec("astro build", { cwd: process.cwd() }, err => {
		if (err) console.error("Build failed");
		build_ongoing = false;
	});
});
