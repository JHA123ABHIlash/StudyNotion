// Converts a category/course name into a safe, single-segment URL slug.
// Unlike a naive `name.split(" ").join("-").toLowerCase()`, this also
// strips out special characters (like "/", "&", "+", etc.) that would
// otherwise break routes defined as a single dynamic segment
// (e.g. "/catalog/:catalogName"), since a raw "/" in the slug turns one
// path segment into two and the route no longer matches.
export const slugify = (text) => {
  return text
    ?.toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // any run of non-alphanumeric chars -> single "-"
    .replace(/^-+|-+$/g, "") // trim leading/trailing "-"
}