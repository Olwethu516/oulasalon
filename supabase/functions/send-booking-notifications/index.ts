import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface BookingPayload {
  id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_category: string;
  service_name: string;
  service_price: number;
  booking_date: string;
  booking_time: string;
  notes?: string;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00");
  return d.toLocaleDateString("en-ZA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  if (!resendApiKey) {
    console.warn("RESEND_API_KEY not configured — skipping email to", to);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Oula Salon <bookings@oula.co.za>",
      to,
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error("Resend error:", body);
  }
}

async function sendWhatsApp(to: string, message: string): Promise<void> {
  const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
  const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
  const from = Deno.env.get("TWILIO_WHATSAPP_FROM") ?? "whatsapp:+14155238886";

  if (!accountSid || !authToken) {
    console.warn("Twilio credentials not configured — skipping WhatsApp to", to);
    return;
  }

  const toWhatsapp = `whatsapp:${to.startsWith("+") ? to : "+" + to}`;
  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  const body = new URLSearchParams({
    From: from,
    To: toWhatsapp,
    Body: message,
  });

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Twilio error:", text);
  }
}

function customerEmailHtml(b: BookingPayload): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f5f4f2;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4f2;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
        <tr>
          <td style="background:#1c1917;padding:40px;text-align:center;">
            <p style="color:#d6d3d1;font-size:11px;letter-spacing:5px;text-transform:uppercase;margin:0 0 8px;">Oula Salon</p>
            <h1 style="color:#ffffff;font-size:28px;font-weight:300;letter-spacing:2px;margin:0;">Booking Confirmed</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <p style="color:#57534e;font-size:16px;margin:0 0 24px;">Hi ${b.customer_name},</p>
            <p style="color:#57534e;font-size:15px;line-height:1.7;margin:0 0 32px;">
              Your appointment at <strong>Oula Salon</strong> has been confirmed. We look forward to welcoming you!
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafaf9;border-radius:8px;padding:24px;margin-bottom:32px;">
              <tr><td style="padding:8px 0;border-bottom:1px solid #e7e5e4;">
                <table width="100%"><tr>
                  <td style="color:#a8a29e;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Service</td>
                  <td align="right" style="color:#1c1917;font-size:14px;font-weight:600;">${b.service_name}</td>
                </tr></table>
              </td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #e7e5e4;">
                <table width="100%"><tr>
                  <td style="color:#a8a29e;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Date</td>
                  <td align="right" style="color:#1c1917;font-size:14px;">${formatDate(b.booking_date)}</td>
                </tr></table>
              </td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #e7e5e4;">
                <table width="100%"><tr>
                  <td style="color:#a8a29e;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Time</td>
                  <td align="right" style="color:#1c1917;font-size:14px;">${b.booking_time}</td>
                </tr></table>
              </td></tr>
              <tr><td style="padding:8px 0;">
                <table width="100%"><tr>
                  <td style="color:#a8a29e;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Price</td>
                  <td align="right" style="color:#1c1917;font-size:16px;font-weight:700;">R${b.service_price.toLocaleString()}</td>
                </tr></table>
              </td></tr>
            </table>
            ${b.notes ? `<p style="color:#78716c;font-size:13px;background:#fafaf9;padding:16px;border-radius:8px;margin-bottom:32px;"><em>Your note: ${b.notes}</em></p>` : ""}
            <p style="color:#57534e;font-size:14px;line-height:1.7;margin:0 0 24px;">
              If you need to reschedule or have any questions, please contact us at
              <a href="mailto:info@oula.co.za" style="color:#1c1917;font-weight:600;">info@oula.co.za</a> or call
              <a href="tel:+27722332665" style="color:#1c1917;font-weight:600;">+27 72 233 2665</a>.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#fafaf9;padding:24px;text-align:center;border-top:1px solid #e7e5e4;">
            <p style="color:#a8a29e;font-size:12px;margin:0;">Oula Salon &bull; Sandton, Johannesburg</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function businessEmailHtml(b: BookingPayload): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f5f4f2;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4f2;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
        <tr>
          <td style="background:#1c1917;padding:40px;text-align:center;">
            <p style="color:#d6d3d1;font-size:11px;letter-spacing:5px;text-transform:uppercase;margin:0 0 8px;">Oula Salon</p>
            <h1 style="color:#ffffff;font-size:28px;font-weight:300;letter-spacing:2px;margin:0;">New Booking</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <p style="color:#57534e;font-size:16px;margin:0 0 24px;">A new appointment has been booked.</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafaf9;border-radius:8px;padding:24px;margin-bottom:24px;">
              ${[
                ["Client", b.customer_name],
                ["Email", b.customer_email],
                ["Phone", b.customer_phone],
                ["Service", b.service_name],
                ["Category", b.service_category],
                ["Date", formatDate(b.booking_date)],
                ["Time", b.booking_time],
                ["Price", `R${b.service_price.toLocaleString()}`],
              ].map(([label, value]) => `
              <tr><td style="padding:8px 0;border-bottom:1px solid #e7e5e4;">
                <table width="100%"><tr>
                  <td style="color:#a8a29e;font-size:12px;letter-spacing:2px;text-transform:uppercase;width:40%;">${label}</td>
                  <td align="right" style="color:#1c1917;font-size:14px;">${value}</td>
                </tr></table>
              </td></tr>`).join("")}
            </table>
            ${b.notes ? `<p style="color:#78716c;font-size:13px;background:#fafaf9;padding:16px;border-radius:8px;"><em>Client note: ${b.notes}</em></p>` : ""}
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { booking }: { booking: BookingPayload } = await req.json();

    const businessPhone = "+27722332665";

    const customerWhatsApp = `Hello ${booking.customer_name}! 🌿\n\nYour booking at *Oula Salon* is confirmed:\n\n*Service:* ${booking.service_name}\n*Date:* ${formatDate(booking.booking_date)}\n*Time:* ${booking.booking_time}\n*Price:* R${booking.service_price.toLocaleString()}\n\nWe look forward to seeing you! If you need to reschedule, please call us on +27 72 233 2665.\n\n— The Oula Team`;

    const businessWhatsApp = `*New Booking - Oula Salon*\n\n*Client:* ${booking.customer_name}\n*Phone:* ${booking.customer_phone}\n*Email:* ${booking.customer_email}\n*Service:* ${booking.service_name}\n*Date:* ${formatDate(booking.booking_date)}\n*Time:* ${booking.booking_time}\n*Price:* R${booking.service_price.toLocaleString()}${booking.notes ? `\n*Note:* ${booking.notes}` : ""}`;

    await Promise.allSettled([
      sendEmail(booking.customer_email, "Your Oula Salon Booking is Confirmed", customerEmailHtml(booking)),
      sendEmail("info@oula.co.za", `New Booking: ${booking.service_name} — ${booking.customer_name}`, businessEmailHtml(booking)),
      sendWhatsApp(booking.customer_phone, customerWhatsApp),
      sendWhatsApp(businessPhone, businessWhatsApp),
    ]);

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Notification error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to send notifications" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
