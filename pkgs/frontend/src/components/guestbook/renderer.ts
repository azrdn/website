export function renderEntry(
  entry_el: HTMLElement,
  data: { created_at: string; message: string; url?: string | null; username: string },
) {
	const clone = entry_el.cloneNode(true) as HTMLElement
	const msg_el = Object.assign(document.createElement("span"), {
		slot: "message",
		textContent: data.message,
	});
	const time_el = Object.assign(document.createElement("time"), {
		slot: "date",
		dateTime: data.created_at,
		title: data.created_at,
		textContent: data.created_at.slice(0, 10),
	});
	const user_el = Object.assign(
		data.url ? document.createElement("a") : document.createElement("span"),
		{
			slot: "username",
			href: data.url ? data.url : undefined,
			rel: data.url ? "external nofollow" : undefined,
			textContent: data.username,
		},
	);
	clone.append(msg_el, time_el, user_el);
	return clone;
}
