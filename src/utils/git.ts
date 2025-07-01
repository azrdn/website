import { execSync } from "node:child_process";

export let hash: string;
try {
	hash = execSync("git rev-parse --short HEAD", {
		timeout: 10000,
		encoding: "utf8",
	}).trim();
} catch {
	hash = "";
}

export const commit_url = `${import.meta.env.REPO_URL}/${hash ? `commit/${hash}` : ""}`;
