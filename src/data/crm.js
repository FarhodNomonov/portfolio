/**
 * CRM case study: client name and the made-up data drawn in its mockups.
 *
 * CLIENT_NAME stays null until the client agrees to be named; while it is
 * null the case is titled "CRM for a developer" in every language.
 *
 * Everything below is fictional: the complex, the people, the numbers.
 * No real names, passports or bank details.
 */
export const CLIENT_NAME = null;

export const COMPLEX = "Navo Residence (demo)";

export const CLIENTS = ["Aziz Rahimov", "Malika Yusupova", "Bekzod Tursunov", "Dilnoza Karimova", "Sardor Aliyev", "Nodira Qosimova"];

export const MANAGERS = [
  { name: "Javohir M.", deals: 34, rate: 24 },
  { name: "Shahnoza T.", deals: 29, rate: 19 },
  { name: "Otabek R.", deals: 22, rate: 12 },
];

// Apartment statuses and the CRM brand ("Architect") colours for them.
export const STATUS = {
  free: { label: "Bo‘sh", color: "#2F8F6B" },
  hold: { label: "Bron", color: "#D49B2E" },
  sold: { label: "Sotilgan", color: "#B5523B" },
  off: { label: "Sotuvda emas", color: "#9AA1AC" },
};

// Whole complex, both blocks (the facade mockup shows block A).
export const KPI = { free: 41, hold: 9, sold: 21, off: 1 };

/*
 * Facade of block A: 2 entrances × 6 floors × 3 apartments.
 * Row strings go from the top floor down; one letter per apartment:
 * f = free, h = hold, s = sold, o = not for sale.
 */
const FACADE_ROWS = [
  ["fff", "fhf"],
  ["fsf", "ffh"],
  ["hff", "sfs"],
  ["sfs", "fhf"],
  ["ssf", "sfs"],
  ["sso", "ssh"],
];
const LAYOUT = [
  { rooms: 2, area: 58.4 },
  { rooms: 1, area: 41.2 },
  { rooms: 3, area: 82.6 },
];
const CODE = { f: "free", h: "hold", s: "sold", o: "off" };
// Price per m² grows a little with the floor (sum, in millions).
const PRICE_M2 = [8.6, 8.8, 9, 9.2, 9.4, 9.6];

export const FACADE = FACADE_ROWS.map((row, r) => {
  const floor = 6 - r;
  return row.map((entrance, e) =>
    [...entrance].map((code, i) => {
      const { rooms, area } = LAYOUT[i];
      return {
        number: (e * 6 + floor - 1) * 3 + i + 1,
        status: CODE[code],
        rooms,
        area,
        price: Math.round(area * PRICE_M2[floor - 1]),
      };
    })
  );
});

// Apartment 25 (block A, entrance 2, floor 3) is the demo deal everywhere.
// Installment schedule: 525 600 000 total, 30% down,
// the rest over 12 months. Everything is a multiple of 1000.
export const DEAL = {
  client: "Aziz Rahimov",
  apartment: 25,
  rooms: 2,
  area: 58.4,
  total: 525_600_000,
  contract: "NR-2026/025",
  date: "12.06.2026",
};

export const SCHEDULE = [
  { n: 0, date: "12.06.2026", sum: 157_680_000, paid: 157_680_000, status: "paid" },
  { n: 1, date: "15.07.2026", sum: 30_660_000, paid: 30_660_000, status: "paid" },
  { n: 2, date: "15.08.2026", sum: 30_660_000, paid: 30_660_000, status: "paid" },
  { n: 3, date: "15.09.2026", sum: 30_660_000, paid: 18_000_000, status: "partial" },
  { n: 4, date: "15.10.2026", sum: 30_660_000, paid: 0, status: "overdue" },
  { n: 5, date: "15.11.2026", sum: 30_660_000, paid: 0, status: "pending" },
  { n: 6, date: "15.12.2026", sum: 30_660_000, paid: 0, status: "pending" },
];

export const PAYMENT_STATUS = {
  paid: { label: "To‘langan", color: "#2F8F6B" },
  partial: { label: "Qisman", color: "#D49B2E" },
  overdue: { label: "Muddati o‘tgan", color: "#B5523B" },
  pending: { label: "Kutilmoqda", color: "#9AA1AC" },
};

/** 525600000 → "525 600 000" (thin groups, like the real UI). */
export const sum = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
