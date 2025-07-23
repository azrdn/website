import { exec, type StdioOptions, spawn } from "node:child_process";
import { watch } from "node:fs";
import { performance } from "node:perf_hooks";

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
	const start_time = performance.now();
	exec("astro build", { cwd: process.cwd() }, err => {
		const duration = performance.now() - start_time;
		if (err) console.error("Build failed");
		else console.log(`Rebuilt in ${duration.toFixed(0)}ms`);
		build_ongoing = false;
	});
});
