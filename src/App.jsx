import { useState, useEffect, useRef } from “react”;
import { createClient } from “@supabase/supabase-js”;

const SUPABASE_URL = “https://vsorhflhpxpuvlhpspkx.supabase.co”;
const SUPABASE_KEY = “eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzb3JoZmxocHhwdXZsaHBzcGt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNjU0NjIsImV4cCI6MjA5NTg0MTQ2Mn0.dxzzlZeBDgx073449M-qTXZhgH0kRd5cqCDom31zMRY”;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const EMAILJS_SERVICE_ID = “service_uwkdxmj”;
const EMAILJS_TEMPLATE_ID = “template_p69k9ij”;
const EMAILJS_PUBLIC_KEY = “So9LgSzB6IdIDIJcy”;

const sendOrderEmail = async (orderData) => {
try {
const res = await fetch(“https://api.emailjs.com/api/v1.0/email/send”, {
method: “POST”,
headers: { “Content-Type”: “application/json” },
body: JSON.stringify({
service_id: EMAILJS_SERVICE_ID,
template_id: EMAILJS_TEMPLATE_ID,
user_id: EMAILJS_PUBLIC_KEY,
template_params: {
name: orderData.name,
handle: orderData.handle || “—”,
phone: orderData.phone,
colorway: orderData.colorway,
size: orderData.size,
shirtQty: orderData.shirtQty,
trouserQty: orderData.trouserQty,
total: “₦” + orderData.total.toLocaleString(“en-NG”),
address: orderData.address,
},
}),
});
return res.ok;
} catch { return false; }
};

const COLORWAYS = [“Warm Cream”, “Charcoal Earth”, “Tobacco Road”, “Rust Memory”];
const SIZES = [“XS”, “S”, “M”, “L”, “XL”, “XXL”];
const SHIRT_PRICE = 13000;
const TROUSER_PRICE = 15000;
const ADMIN_PASSWORD = “kreatebyali2024”;

const COLORWAY_META = {
“Warm Cream”:     { bg: “#F5F0E8”, accent: “#C8B898”, text: “#6B5B45”, desc: “A quiet light. Worn like memory.” },
“Charcoal Earth”: { bg: “#E2DFDA”, accent: “#5A5550”, text: “#3A3530”, desc: “Grounded. Unhurried. Certain.” },
“Tobacco Road”:   { bg: “#EDE0C8”, accent: “#7A5C2E”, text: “#5A3C0E”, desc: “The road less travelled, worn well.” },
“Rust Memory”:    { bg: “#F0DDD8”, accent: “#8B3A2A”, text: “#6B1A0A”, desc: “What remains after the fire.” },
};

const STATUS_META = {
Pending:   { bg: “#FFF8E8”, color: “#8B6914”, border: “#E8D080” },
Verified:  { bg: “#E8F5E8”, color: “#2A6B2A”, border: “#80C880” },
Rejected:  { bg: “#F5E8E8”, color: “#8B2A2A”, border: “#E08080” },
Fulfilled: { bg: “#E8F0FF”, color: “#2A3A8B”, border: “#8090E8” },
};

function formatNaira(n) { return “₦” + n.toLocaleString(“en-NG”); }

const GS = {
app: { minHeight: “100vh”, background: “#F0EBE1”, fontFamily: “‘Palatino Linotype’, Palatino, serif”, color: “#1A1A1A” },
hero: { background: “#1A1A1A”, padding: “40px 20px 32px”, textAlign: “center” },
heroEyebrow: { fontSize: 10, letterSpacing: “0.3em”, color: “#888”, textTransform: “uppercase”, marginBottom: 10 },
heroTitle: { fontSize: 38, fontStyle: “italic”, color: “#F5F0E8”, fontWeight: “normal”, margin: “0 0 6px”, lineHeight: 1.1 },
heroDrop: { fontSize: 11, letterSpacing: “0.2em”, color: “#7A5C2E”, textTransform: “uppercase”, marginTop: 10 },
stepBar: { display: “flex”, background: “#151515”, borderBottom: “1px solid #2A2A2A” },
stepItem: (active, done) => ({ flex: 1, padding: “12px 4px”, textAlign: “center”, fontSize: 9, letterSpacing: “0.15em”, textTransform: “uppercase”, color: done ? “#7A5C2E” : active ? “#F5F0E8” : “#555”, borderBottom: active ? “2px solid #8B3A2A” : “2px solid transparent”, transition: “all 0.3s” }),
section: { padding: “20px 18px 0” },
sectionTitle: { fontSize: 10, letterSpacing: “0.2em”, textTransform: “uppercase”, color: “#888”, marginBottom: 14, display: “block” },
colorwayCard: (cw, selected) => ({ background: selected ? COLORWAY_META[cw].bg : “#FFF”, border: selected ? `2px solid ${COLORWAY_META[cw].accent}` : “2px solid transparent”, borderRadius: 8, padding: “14px 16px”, marginBottom: 10, cursor: “pointer”, transition: “all 0.2s”, boxShadow: selected ? `0 2px 12px ${COLORWAY_META[cw].accent}44` : “0 1px 4px rgba(0,0,0,0.06)” }),
cwDot: (cw) => ({ width: 14, height: 14, borderRadius: “50%”, background: COLORWAY_META[cw].accent, display: “inline-block”, marginRight: 10, verticalAlign: “middle” }),
cwName: (cw, selected) => ({ fontSize: 14, fontStyle: “italic”, color: selected ? COLORWAY_META[cw].text : “#1A1A1A” }),
cwDesc: { fontSize: 11, color: “#AAA”, marginTop: 3, letterSpacing: “0.03em” },
itemRow: { display: “flex”, justifyContent: “space-between”, alignItems: “center”, background: “#FFF”, borderRadius: 8, padding: “14px 16px”, marginBottom: 8 },
itemLabel: { fontSize: 14, fontStyle: “italic” },
itemPrice: { fontSize: 12, color: “#888”, marginTop: 2 },
qtyControl: { display: “flex”, alignItems: “center”, gap: 14 },
qtyBtn: { width: 30, height: 30, borderRadius: “50%”, border: “1px solid #E0DDD8”, background: “#FFF”, fontSize: 18, cursor: “pointer”, display: “flex”, alignItems: “center”, justifyContent: “center”, color: “#555” },
qtyNum: { fontSize: 16, fontStyle: “italic”, minWidth: 20, textAlign: “center” },
sizeGrid: { display: “grid”, gridTemplateColumns: “repeat(3, 1fr)”, gap: 8 },
sizeBtn: (selected) => ({ padding: “10px”, borderRadius: 6, border: selected ? “2px solid #1A1A1A” : “1px solid #E0DDD8”, background: selected ? “#1A1A1A” : “#FFF”, color: selected ? “#F5F0E8” : “#555”, fontSize: 13, cursor: “pointer”, fontFamily: “inherit”, fontStyle: selected ? “italic” : “normal”, transition: “all 0.15s” }),
input: { width: “100%”, background: “#FFF”, border: “1px solid #E0DDD8”, borderRadius: 6, padding: “12px 14px”, fontSize: 14, fontFamily: “inherit”, color: “#1A1A1A”, boxSizing: “border-box”, outline: “none” },
textarea: { width: “100%”, background: “#FFF”, border: “1px solid #E0DDD8”, borderRadius: 6, padding: “12px 14px”, fontSize: 14, fontFamily: “inherit”, color: “#1A1A1A”, boxSizing: “border-box”, outline: “none”, resize: “vertical”, minHeight: 80 },
totalBox: { background: “#1A1A1A”, margin: “20px 18px 0”, borderRadius: 8, padding: “16px 18px” },
totalLabel: { fontSize: 10, letterSpacing: “0.2em”, textTransform: “uppercase”, color: “#666”, marginBottom: 4 },
totalAmt: { fontSize: 30, fontStyle: “italic”, color: “#F5F0E8” },
bankBox: { background: “#F5F0E8”, margin: “16px 18px 0”, borderRadius: 8, padding: “18px” },
bankTitle: { fontSize: 10, letterSpacing: “0.2em”, textTransform: “uppercase”, color: “#8B3A2A”, marginBottom: 12 },
bankDetail: { fontSize: 15, fontStyle: “italic”, color: “#1A1A1A”, marginBottom: 4 },
bankAcct: { fontSize: 22, fontStyle: “italic”, color: “#1A1A1A”, letterSpacing: “0.05em”, margin: “8px 0 4px” },
bankSub: { fontSize: 11, color: “#888”, letterSpacing: “0.05em” },
uploadBox: (hasFile) => ({ border: hasFile ? “2px solid #7A5C2E” : “2px dashed #C8C0B8”, borderRadius: 8, padding: “24px 16px”, textAlign: “center”, cursor: “pointer”, background: hasFile ? “#EDE0C8” : “#FFF”, transition: “all 0.2s” }),
uploadIcon: { fontSize: 28, marginBottom: 8 },
uploadText: { fontSize: 13, color: “#888”, lineHeight: 1.5 },
primaryBtn: { width: “100%”, background: “#1A1A1A”, color: “#F5F0E8”, border: “none”, borderRadius: 6, padding: “15px”, fontSize: 12, letterSpacing: “0.15em”, textTransform: “uppercase”, cursor: “pointer”, fontFamily: “inherit”, marginTop: 8 },
secondaryBtn: { width: “100%”, background: “transparent”, color: “#888”, border: “1px solid #DDD”, borderRadius: 6, padding: “12px”, fontSize: 11, letterSpacing: “0.1em”, textTransform: “uppercase”, cursor: “pointer”, fontFamily: “inherit”, marginTop: 6 },
navHalf: (active) => ({ flex: “unset”, padding: “8px 20px”, textAlign: “center”, fontSize: 10, letterSpacing: “0.15em”, textTransform: “uppercase”, cursor: “pointer”, borderRadius: 6, background: active ? “#F5F0E8” : “transparent”, color: active ? “#1A1A1A” : “#888”, border: active ? “none” : “1px solid #555”, fontFamily: “inherit” }),
orderCard: { background: “#FFF”, borderRadius: 8, margin: “0 18px 10px”, padding: “16px”, boxShadow: “0 1px 4px rgba(0,0,0,0.06)” },
orderName: { fontSize: 16, fontStyle: “italic”, marginBottom: 2 },
orderHandle: { fontSize: 11, color: “#AAA”, marginBottom: 10 },
orderMeta: { display: “flex”, gap: 8, flexWrap: “wrap”, alignItems: “center” },
pill: (status) => ({ background: STATUS_META[status]?.bg || “#F0EDE8”, color: STATUS_META[status]?.color || “#555”, border: `1px solid ${STATUS_META[status]?.border || "#DDD"}`, borderRadius: 20, padding: “3px 10px”, fontSize: 11 }),
cwPill: (cw) => ({ background: COLORWAY_META[cw]?.bg || “#F0EDE8”, color: COLORWAY_META[cw]?.text || “#555”, borderRadius: 20, padding: “3px 10px”, fontSize: 11, fontStyle: “italic” }),
proofImg: { width: “100%”, borderRadius: 6, marginTop: 10, maxHeight: 200, objectFit: “cover” },
adminAction: { display: “flex”, gap: 8, marginTop: 10 },
verifyBtn: { flex: 1, background: “#1A1A1A”, color: “#F5F0E8”, border: “none”, borderRadius: 4, padding: “9px”, fontSize: 10, letterSpacing: “0.1em”, textTransform: “uppercase”, cursor: “pointer”, fontFamily: “inherit” },
rejectBtn: { flex: 1, background: “transparent”, color: “#8B2A2A”, border: “1px solid #E08080”, borderRadius: 4, padding: “9px”, fontSize: 10, letterSpacing: “0.1em”, textTransform: “uppercase”, cursor: “pointer”, fontFamily: “inherit” },
fulfillBtn: { flex: 1, background: “#2A3A8B”, color: “#FFF”, border: “none”, borderRadius: 4, padding: “9px”, fontSize: 10, letterSpacing: “0.1em”, textTransform: “uppercase”, cursor: “pointer”, fontFamily: “inherit” },
toast: { position: “fixed”, bottom: 30, left: “50%”, transform: “translateX(-50%)”, background: “#1A1A1A”, color: “#F5F0E8”, borderRadius: 24, padding: “10px 22px”, fontSize: 12, letterSpacing: “0.08em”, zIndex: 999, whiteSpace: “nowrap”, boxShadow: “0 4px 16px rgba(0,0,0,0.2)” },
statRow: { display: “flex”, gap: 10, padding: “16px 18px 0” },
statBox: (color) => ({ flex: 1, background: color || “#FFF”, borderRadius: 8, padding: “14px 12px”, textAlign: “center” }),
statNum: { fontSize: 26, fontStyle: “italic”, color: “#1A1A1A” },
statLabel: { fontSize: 9, letterSpacing: “0.15em”, textTransform: “uppercase”, color: “#888”, marginTop: 2 },
adminLogin: { maxWidth: 340, margin: “60px auto”, background: “#FFF”, borderRadius: 10, padding: “32px 24px”, textAlign: “center”, boxShadow: “0 2px 20px rgba(0,0,0,0.08)” },
};

export default function App() {
const [mode, setMode] = useState(“public”);
const [step, setStep] = useState(1);
const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(false);
const [adminTab, setAdminTab] = useState(“orders”);
const [adminAuth, setAdminAuth] = useState(false);
const [adminPw, setAdminPw] = useState(””);
const [toast, setToast] = useState(null);
const [expandedOrder, setExpandedOrder] = useState(null);
const fileRef = useRef();

const [form, setForm] = useState({
colorway: “”, shirtQty: 0, trouserQty: 0, size: “”,
name: “”, handle: “”, phone: “”, address: “”, proofFile: null, proofPreview: null,
});

useEffect(() => {
if (mode === “admin” && adminAuth) fetchOrders();
}, [mode, adminAuth]);

const fetchOrders = async () => {
setLoading(true);
const { data } = await supabase.from(“orders”).select(”*”).order(“created_at”, { ascending: false });
if (data) setOrders(data);
setLoading(false);
};

const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };
const total = form.shirtQty * SHIRT_PRICE + form.trouserQty * TROUSER_PRICE;

const handleFile = (file) => {
if (!file) return;
const reader = new FileReader();
reader.onload = (e) => setForm(f => ({ …f, proofFile: file.name, proofPreview: e.target.result }));
reader.readAsDataURL(file);
};

const submitOrder = async () => {
if (!form.proofFile) { showToast(“Please upload payment proof.”); return; }
setLoading(true);
const orderData = {
name: form.name, handle: form.handle, phone: form.phone,
colorway: form.colorway, size: form.size,
shirt_qty: form.shirtQty, trouser_qty: form.trouserQty,
total: total, address: form.address,
status: “Pending”, date: new Date().toLocaleDateString(“en-GB”),
};
await supabase.from(“orders”).insert([orderData]);
await sendOrderEmail({ …form, total });
setLoading(false);
setStep(5);
};

const updateStatus = async (id, status) => {
await supabase.from(“orders”).update({ status }).eq(“id”, id);
setOrders(orders.map(o => o.id === id ? { …o, status } : o));
showToast(`Order marked as ${status}.`);
};

const canNext = () => {
if (step === 1) return !!form.colorway;
if (step === 2) return (form.shirtQty + form.trouserQty) > 0 && !!form.size;
if (step === 3) return !!form.name && !!form.phone && !!form.address;
if (step === 4) return !!form.proofFile;
return true;
};

const steps = [“Colorway”, “Items”, “Details”, “Payment”];

// ADMIN LOGIN
if (mode === “admin” && !adminAuth) {
return (
<div style={{ …GS.app, display: “flex”, alignItems: “flex-start”, justifyContent: “center” }}>
<div style={GS.adminLogin}>
<div style={{ fontSize: 20, fontStyle: “italic”, marginBottom: 6 }}>Admin Access</div>
<div style={{ fontSize: 11, color: “#AAA”, marginBottom: 24, letterSpacing: “0.05em” }}>Kreate by ALI · SHE IS</div>
<input style={{ …GS.input, marginBottom: 10, textAlign: “center”, letterSpacing: “0.1em” }}
type=“password” placeholder=“Enter password” value={adminPw}
onChange={e => setAdminPw(e.target.value)}
onKeyDown={e => { if (e.key === “Enter” && adminPw === ADMIN_PASSWORD) setAdminAuth(true); }}
/>
<button style={GS.primaryBtn} onClick={() => { if (adminPw === ADMIN_PASSWORD) setAdminAuth(true); else showToast(“Incorrect password.”); }}>Enter</button>
<button style={GS.secondaryBtn} onClick={() => setMode(“public”)}>Back to Order Form</button>
</div>
{toast && <div style={GS.toast}>{toast}</div>}
</div>
);
}

// ADMIN PANEL
if (mode === “admin” && adminAuth) {
const pending = orders.filter(o => o.status === “Pending”).length;
const verified = orders.filter(o => o.status === “Verified”).length;
const fulfilled = orders.filter(o => o.status === “Fulfilled”).length;
const totalRev = orders.filter(o => o.status !== “Rejected”).reduce((s, o) => s + (o.total || 0), 0);

```
return (
  <div style={GS.app}>
    <div style={{ ...GS.hero, padding: "28px 20px 22px" }}>
      <div style={GS.heroEyebrow}>Kreate by ALI · Admin</div>
      <div style={GS.heroTitle}>SHE IS Orders</div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
        <button style={GS.navHalf(adminTab === "orders")} onClick={() => setAdminTab("orders")}>Orders</button>
        <button style={GS.navHalf(adminTab === "stats")} onClick={() => setAdminTab("stats")}>Summary</button>
        <button style={GS.navHalf(false)} onClick={() => fetchOrders()}>Refresh</button>
        <button style={{ ...GS.navHalf(false), color: "#8B3A2A" }} onClick={() => { setAdminAuth(false); setMode("public"); }}>Exit</button>
      </div>
    </div>

    {loading && <div style={{ textAlign: "center", padding: 30, color: "#888", fontStyle: "italic" }}>Loading orders...</div>}

    {adminTab === "stats" && !loading && (
      <>
        <div style={GS.statRow}>
          <div style={GS.statBox("#FFF8E8")}><div style={GS.statNum}>{pending}</div><div style={GS.statLabel}>Pending</div></div>
          <div style={GS.statBox("#E8F5E8")}><div style={GS.statNum}>{verified}</div><div style={GS.statLabel}>Verified</div></div>
          <div style={GS.statBox("#E8F0FF")}><div style={GS.statNum}>{fulfilled}</div><div style={GS.statLabel}>Fulfilled</div></div>
        </div>
        <div style={{ ...GS.totalBox, margin: "12px 18px 0" }}>
          <div style={GS.totalLabel}>Total Revenue</div>
          <div style={GS.totalAmt}>{formatNaira(totalRev)}</div>
        </div>
        <div style={{ height: 16 }} />
        {COLORWAYS.map(cw => {
          const cwOrders = orders.filter(o => o.colorway === cw);
          return (
            <div key={cw} style={{ background: COLORWAY_META[cw].bg, borderRadius: 8, margin: "0 18px 10px", padding: "14px 16px" }}>
              <div style={{ fontSize: 13, fontStyle: "italic", color: COLORWAY_META[cw].text, marginBottom: 6 }}>{cw}</div>
              <div style={{ display: "flex", gap: 16 }}>
                {["Pending","Verified","Fulfilled"].map(s => (
                  <div key={s}><span style={{ fontSize: 18, fontStyle: "italic", color: COLORWAY_META[cw].text }}>{cwOrders.filter(o => o.status === s).length}</span><span style={{ fontSize: 10, color: "#AAA", marginLeft: 4 }}>{s.toLowerCase()}</span></div>
                ))}
              </div>
            </div>
          );
        })}
        <div style={{ height: 30 }} />
      </>
    )}

    {adminTab === "orders" && !loading && (
      <>
        <div style={{ height: 14 }} />
        {orders.length === 0 && (
          <div style={{ textAlign: "center", padding: "50px 20px", color: "#AAA" }}>
            <div style={{ fontSize: 18, fontStyle: "italic", marginBottom: 6 }}>No orders yet.</div>
            <div style={{ fontSize: 12 }}>Orders appear here once customers submit.</div>
          </div>
        )}
        {orders.map(o => (
          <div key={o.id} style={GS.orderCard} onClick={() => setExpandedOrder(expandedOrder === o.id ? null : o.id)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={GS.orderName}>{o.name}</div>
                <div style={GS.orderHandle}>{o.handle || o.phone}</div>
              </div>
              <span style={GS.pill(o.status)}>{o.status}</span>
            </div>
            <div style={GS.orderMeta}>
              <span style={GS.cwPill(o.colorway)}>{o.colorway}</span>
              <span style={{ fontSize: 11, color: "#888" }}>Size {o.size}</span>
              <span style={{ fontSize: 11, color: "#1A1A1A", fontStyle: "italic" }}>{formatNaira(o.total)}</span>
              <span style={{ fontSize: 10, color: "#CCC", marginLeft: "auto" }}>{o.date}</span>
            </div>
            {expandedOrder === o.id && (
              <div style={{ marginTop: 12, borderTop: "1px solid #F0EDE8", paddingTop: 12 }}>
                {o.shirt_qty > 0 && <div style={{ fontSize: 12, color: "#888", marginBottom: 2 }}>Shirt x{o.shirt_qty} — {formatNaira(o.shirt_qty * SHIRT_PRICE)}</div>}
                {o.trouser_qty > 0 && <div style={{ fontSize: 12, color: "#888", marginBottom: 2 }}>Trouser x{o.trouser_qty} — {formatNaira(o.trouser_qty * TROUSER_PRICE)}</div>}
                <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>{o.address}</div>
                <div style={{ fontSize: 11, color: "#AAA", marginTop: 4 }}>Phone: {o.phone}</div>
                <div style={GS.adminAction}>
                  {o.status === "Pending" && <>
                    <button style={GS.verifyBtn} onClick={e => { e.stopPropagation(); updateStatus(o.id, "Verified"); }}>Verify</button>
                    <button style={GS.rejectBtn} onClick={e => { e.stopPropagation(); updateStatus(o.id, "Rejected"); }}>Reject</button>
                  </>}
                  {o.status === "Verified" && <button style={GS.fulfillBtn} onClick={e => { e.stopPropagation(); updateStatus(o.id, "Fulfilled"); }}>Mark Fulfilled</button>}
                  {(o.status === "Rejected" || o.status === "Fulfilled") && <div style={{ fontSize: 11, color: "#AAA", padding: "8px 0" }}>No further actions.</div>}
                </div>
              </div>
            )}
          </div>
        ))}
        <div style={{ height: 30 }} />
      </>
    )}
    {toast && <div style={GS.toast}>{toast}</div>}
  </div>
);
```

}

// SUCCESS
if (step === 5) {
return (
<div style={GS.app}>
<div style={GS.hero}><div style={GS.heroEyebrow}>Kreate by ALI</div><div style={GS.heroTitle}>SHE IS</div></div>
<div style={{ textAlign: “center”, padding: “50px 24px” }}>
<div style={{ fontSize: 48, marginBottom: 16 }}>✦</div>
<div style={{ fontSize: 26, fontStyle: “italic”, marginBottom: 8 }}>Order Received.</div>
<div style={{ fontSize: 13, color: “#888”, lineHeight: 1.7 }}>
Your payment proof has been submitted.<br />
We will verify and confirm your order within 24 hours.<br /><br />
<span style={{ color: “#7A5C2E”, fontStyle: “italic” }}>Welcome to SHE IS.</span>
</div>
<button style={{ …GS.primaryBtn, marginTop: 32 }} onClick={() => { setStep(1); setForm({ colorway: “”, shirtQty: 0, trouserQty: 0, size: “”, name: “”, handle: “”, phone: “”, address: “”, proofFile: null, proofPreview: null }); }}>
Place Another Order
</button>
</div>
<div style={{ textAlign: “center”, paddingBottom: 20 }}>
<button style={{ background: “none”, border: “none”, color: “#CCC”, fontSize: 10, letterSpacing: “0.1em”, cursor: “pointer”, fontFamily: “inherit” }} onClick={() => setMode(“admin”)}>Admin</button>
</div>
</div>
);
}

// PUBLIC ORDER FORM
return (
<div style={GS.app}>
<div style={GS.hero}>
<div style={GS.heroEyebrow}>Kreate by ALI</div>
<div style={GS.heroTitle}>SHE IS</div>
<div style={GS.heroDrop}>Mid-June Drop · Preorder Now</div>
</div>

```
  <div style={GS.stepBar}>
    {steps.map((s, i) => (
      <div key={s} style={GS.stepItem(step === i + 1, step > i + 1)}>
        {step > i + 1 ? "✓ " : ""}{s}
      </div>
    ))}
  </div>

  {step === 1 && (
    <div>
      <div style={GS.section}>
        <span style={GS.sectionTitle}>Choose your colorway</span>
        {COLORWAYS.map(cw => (
          <div key={cw} style={GS.colorwayCard(cw, form.colorway === cw)} onClick={() => setForm(f => ({ ...f, colorway: cw }))}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={GS.cwDot(cw)} />
              <span style={GS.cwName(cw, form.colorway === cw)}>{cw}</span>
              {form.colorway === cw && <span style={{ marginLeft: "auto", fontSize: 16 }}>✦</span>}
            </div>
            <div style={GS.cwDesc}>{COLORWAY_META[cw].desc}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "16px 18px 40px" }}>
        <button style={{ ...GS.primaryBtn, opacity: canNext() ? 1 : 0.4 }} onClick={() => canNext() && setStep(2)}>Continue</button>
      </div>
    </div>
  )}

  {step === 2 && (
    <div>
      <div style={GS.section}>
        <span style={GS.sectionTitle}>Select items</span>
        {[{ label: "Shirt", key: "shirtQty", price: SHIRT_PRICE }, { label: "Trouser", key: "trouserQty", price: TROUSER_PRICE }].map(({ label, key, price }) => (
          <div key={key} style={GS.itemRow}>
            <div><div style={GS.itemLabel}>{label}</div><div style={GS.itemPrice}>{formatNaira(price)}</div></div>
            <div style={GS.qtyControl}>
              <button style={GS.qtyBtn} onClick={() => setForm(f => ({ ...f, [key]: Math.max(0, f[key] - 1) }))}>−</button>
              <span style={GS.qtyNum}>{form[key]}</span>
              <button style={GS.qtyBtn} onClick={() => setForm(f => ({ ...f, [key]: f[key] + 1 }))}>+</button>
            </div>
          </div>
        ))}
      </div>
      {(form.shirtQty + form.trouserQty) > 0 && (
        <div style={GS.section}>
          <span style={GS.sectionTitle}>Select size</span>
          <div style={GS.sizeGrid}>
            {SIZES.map(s => <button key={s} style={GS.sizeBtn(form.size === s)} onClick={() => setForm(f => ({ ...f, size: s }))}>{s}</button>)}
          </div>
        </div>
      )}
      {total > 0 && <div style={GS.totalBox}><div style={GS.totalLabel}>Order Total</div><div style={GS.totalAmt}>{formatNaira(total)}</div></div>}
      <div style={{ padding: "16px 18px 40px" }}>
        <button style={{ ...GS.primaryBtn, opacity: canNext() ? 1 : 0.4 }} onClick={() => canNext() && setStep(3)}>Continue</button>
        <button style={GS.secondaryBtn} onClick={() => setStep(1)}>Back</button>
      </div>
    </div>
  )}

  {step === 3 && (
    <div>
      <div style={GS.section}>
        <span style={GS.sectionTitle}>Your details</span>
        {[{ label: "Full Name *", key: "name", placeholder: "Your full name" }, { label: "Instagram Handle", key: "handle", placeholder: "@yourhandle" }, { label: "Phone Number *", key: "phone", placeholder: "080XXXXXXXX" }].map(({ label, key, placeholder }) => (
          <div key={key} style={{ marginBottom: 12 }}>
            <label style={{ ...GS.sectionTitle, marginBottom: 6 }}>{label}</label>
            <input style={GS.input} placeholder={placeholder} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
          </div>
        ))}
        <div>
          <label style={{ ...GS.sectionTitle, marginBottom: 6 }}>Delivery Address *</label>
          <textarea style={GS.textarea} placeholder="Full delivery address including city and state" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
        </div>
      </div>
      <div style={{ padding: "16px 18px 40px" }}>
        <button style={{ ...GS.primaryBtn, opacity: canNext() ? 1 : 0.4 }} onClick={() => canNext() && setStep(4)}>Continue</button>
        <button style={GS.secondaryBtn} onClick={() => setStep(2)}>Back</button>
      </div>
    </div>
  )}

  {step === 4 && (
    <div>
      <div style={GS.section}><span style={GS.sectionTitle}>Payment</span></div>
      <div style={GS.totalBox}>
        <div style={GS.totalLabel}>Amount to Transfer</div>
        <div style={GS.totalAmt}>{formatNaira(total)}</div>
        <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>
          {form.shirtQty > 0 && `${form.shirtQty} Shirt · `}{form.trouserQty > 0 && `${form.trouserQty} Trouser · `}Size {form.size} · {form.colorway}
        </div>
      </div>
      <div style={GS.bankBox}>
        <div style={GS.bankTitle}>Transfer To</div>
        <div style={GS.bankDetail}>Aliyu Abba Muhammad</div>
        <div style={GS.bankAcct}>9116768515</div>
        <div style={GS.bankSub}>OPay</div>
        <div style={{ marginTop: 12, padding: "10px 12px", background: "#1A1A1A", borderRadius: 6 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", color: "#7A5C2E", marginBottom: 3 }}>IMPORTANT</div>
          <div style={{ fontSize: 11, color: "#F5F0E8", lineHeight: 1.6 }}>Transfer the exact amount shown. Upload your payment screenshot below to confirm your order.</div>
        </div>
      </div>
      <div style={GS.section}>
        <span style={GS.sectionTitle}>Upload Payment Proof *</span>
        <input type="file" ref={fileRef} accept="image/*" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
        <div style={GS.uploadBox(!!form.proofFile)} onClick={() => fileRef.current.click()}>
          {form.proofPreview
            ? <img src={form.proofPreview} alt="proof" style={{ width: "100%", borderRadius: 6, maxHeight: 200, objectFit: "cover" }} />
            : <><div style={GS.uploadIcon}>↑</div><div style={GS.uploadText}>Tap to upload your payment screenshot<br /><span style={{ fontSize: 11, color: "#CCC" }}>JPG, PNG accepted</span></div></>}
        </div>
        {form.proofFile && <div style={{ fontSize: 11, color: "#7A5C2E", marginTop: 6, textAlign: "center" }}>✓ {form.proofFile}</div>}
      </div>
      <div style={{ padding: "16px 18px 40px" }}>
        <button style={{ ...GS.primaryBtn, opacity: canNext() && !loading ? 1 : 0.4 }} onClick={() => canNext() && !loading && submitOrder()}>
          {loading ? "Submitting..." : "Submit Order"}
        </button>
        <button style={GS.secondaryBtn} onClick={() => setStep(3)}>Back</button>
      </div>
    </div>
  )}

  <div style={{ textAlign: "center", paddingBottom: 20 }}>
    <button style={{ background: "none", border: "none", color: "#DDD", fontSize: 10, letterSpacing: "0.1em", cursor: "pointer", fontFamily: "inherit" }} onClick={() => setMode("admin")}>Admin</button>
  </div>
  {toast && <div style={GS.toast}>{toast}</div>}
</div>
```

);
}
