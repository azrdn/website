export const GET = async () => {
	const [ascii, robots] = await Promise.all([
		fetch(import.meta.env.ASCII_ART_URL),
		fetch(import.meta.env.ROBOTS_TXT_URL),
	]);
	const [asciiText, robotsText] = await Promise.all([
		ascii.text(),
		robots.text(),
	]);
	return new Response(`${asciiText}\n${robotsText}`);
};
