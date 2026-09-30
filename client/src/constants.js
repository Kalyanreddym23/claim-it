export const ITEM_CATEGORIES = [
  "Electronics",
  "Books & Notes",
  "Accessories",
  "ID & Documents",
  "Keys",
  "Clothing",
  "Sports",
  "Other",
];

export const ITEM_STATUSES = {
  active: "Active",
  claimed: "Claimed",
  resolved: "Resolved",
};

export function formatDate(value) {
  if (!value) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function toDateInputValue(value) {
  return value ? new Date(value).toISOString().slice(0, 10) : "";
}
