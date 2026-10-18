// Netlify Function: forwards the contact form to Telegram.
// Served at /.netlify/functions/send-message. Reads BOT_TOKEN and CHAT_ID
// from the environment; the text goes in a JSON body without parse_mode,
// so characters like & # + < > arrive exactly as typed.
export default async (req) => {
  if (req.method !== "POST") {
    return Response.json({ ok: false, error: "Method not allowed" }, { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { first_name = "", email = "", message = "" } = body || {};
  const { BOT_TOKEN, CHAT_ID } = process.env;

  if (!BOT_TOKEN || !CHAT_ID) {
    return Response.json({ ok: false, error: "Server is not configured" }, { status: 500 });
  }

  const text = `nomonovfarhod.uz 🎯\nName: ${first_name}\nEmail: ${email}\nMessage: ${message}\n`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });
    const data = await response.json();

    if (data.ok) {
      return Response.json({ ok: true });
    }
    return Response.json({ ok: false }, { status: 500 });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
};
