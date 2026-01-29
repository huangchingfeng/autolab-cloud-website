// api-vercel.ts
var config = {
  runtime: "nodejs"
};
async function handler(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  if (path === "/api/health" || path === "/api") {
    return new Response(JSON.stringify({
      status: "ok",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      hasDb: !!process.env.DATABASE_URL,
      path
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
  return new Response(JSON.stringify({ error: "Not found", path }), {
    status: 404,
    headers: { "Content-Type": "application/json" }
  });
}
export {
  config,
  handler as default
};
