export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { first_name, email, message } = req.body;

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  const text = `nomonovfarhod.uz 🎯%0AName: ${first_name}%0AEmail: ${email}%0AMessage: ${message}%0A`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}&parse_mode=HTML`
    );
    const data = await response.json();

    if (data.ok) {
      return res.status(200).json({ ok: true });
    }
    return res.status(500).json({ ok: false });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
}