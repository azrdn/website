export const prerender = false
export const GET: import("astro").APIRoute = async ({ request, redirect }) => {
	const header = request.headers.get("sec-fetch-mode")
	if (header === "navigate") return redirect("/missing")

	return new Response(null, { status: 403 })
}
