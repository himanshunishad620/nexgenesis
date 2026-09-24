# Product Admin Dashboard

A small admin dashboard for the [DummyJSON](https://dummyjson.com) products API — log in, browse, search, filter, sort, and manage products. Built with **React (Vite)**, **Tailwind CSS**, **React Router**, and **Axios** for every API call.

**Live app:** https://nexgenesis.vercel.app
**Repo:** https://github.com/himanshunishad620/nexgenesis

---

## Setup

```bash
git clone https://github.com/himanshunishad620/nexgenesis.git
cd nexgenesis
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`) — it redirects to `/login`.

**Test login:** username `emilys`, password `emilyspass`.

To build for production: `npm run build` (output in `dist/`), then `npm run preview` to check it locally before deploying.

### Deploying

This is a client-side-only SPA (Vite + React Router), so any static host works. It's currently deployed on **Vercel** at the link above. Because React Router uses real URLs (`/products/5`, not hash routes), the host needs to serve `index.html` for every path, or refreshing a page other than the home page will 404. `vercel.json` and `public/_redirects` already handle this for Vercel and Netlify respectively. No environment variables are needed — the app only talks to the public `dummyjson.com` API.

---

## What I finished

Everything in the brief is implemented:

- [x] **Login page** — `POST /auth/login` with `emilys` / `emilyspass`, shows an error on wrong details, and a logout button. Product pages are only reachable while logged in.
- [x] **Product list** — image, title, category, price, rating and stock; a table on desktop, cards on mobile.
- [x] **Pagination** — loads page by page using `limit`/`skip`, with Previous/Next buttons, a page size option (10/20/50), and a "Showing 21–40 of 194" style line.
- [x] **Search** — `/products/search?q=`, debounced so it waits until typing stops, and resets to page 1 when the search changes.
- [x] **Filter and sort** — category filter via `/products/categories`, sort by price, rating or title, ascending or descending.
- [x] **Product details** — `/products/[id]` page with images, description, price and reviews; a "not found" page for a bad id.
- [x] **Add, edit and delete** — a validated form (shared between add/edit) and a confirm popup before deleting.
- [x] **Loading, empty and error states** — a loader while fetching, a message when nothing is found, and a Retry button when a request fails.

### Rules followed

- One shared Axios setup file (`src/lib/axiosClient.js`) — attaches the login token to every request and handles errors (401 → logout) in one place.
- Page, search, filter and sort values all live in the URL query string, so refreshing or sharing the link reproduces the same view.
- No React Query, SWR, or ready-made table/pagination libraries — all fetching and pagination logic is hand-written.
- Small, single-purpose components; all API calls live in `src/lib/api/*.js`, never inline in a component.

---

## Decisions and trade-offs

**Old search results can't overwrite new ones.** Every product-list request carries an `AbortController` signal. Starting a new request (new keystroke, new filter, new page) aborts whatever was still in flight, and a `requestId` counter double-checks that a response belongs to the _latest_ request before it's used — so even an artificially slow request can never overwrite a faster, newer one.

**Search and category filter can't both be sent to the API.** DummyJSON has no endpoint that combines free-text search with a category filter. When a search term is active, the app searches across everything and shows a small note that the category filter is being ignored, rather than silently dropping it or pretending both are applied.

**Add/edit/delete aren't really saved by DummyJSON.** The API accepts these calls and answers as if they worked, but nothing persists if you reload. The app still makes the real network call every time, then updates its own in-memory list to match, and says so in a note after a delete.

**Bad URLs can't break the page.** `?page=abc`, `?page=0`, `?page=999`, or an unsupported `?pageSize=13` are all read through small helpers (`src/lib/urlState.js`) that fall back to a safe default instead of trusting the value directly.

**Double-clicking Save or Login doesn't send duplicate requests.** Both forms track a `submitting` flag: the handler exits immediately if a request is already in flight, and the button disables and relabels itself ("Saving...", "Logging in...") while that's happening.

---

## A problem I ran into

Getting "refreshing the page shows the same result" and "typing fast in search doesn't break anything" to both work at once was the trickiest part — the search box needs to feel instant to type into, but the URL (and the API call) should only update once the user pauses. I fixed it by splitting search into two pieces of state: `searchInput` (updates on every keystroke, purely local) and a debounced value that only changes after a pause and is what actually drives the URL and the fetch.

---

## Where AI tools helped

I used AI assistance to scaffold the project structure and write the repetitive parts (form fields, table/card markup, Tailwind classes), building it up in small, incremental commits so each piece could be reviewed and understood before moving to the next rather than as one large change. The core decisions — the Axios interceptor design, the debounce + abort/race-condition handling, keeping state in the URL, and the search-vs-category trade-off — were reviewed and adjusted by hand so I can walk through and explain every part of it.

---

## Project structure

```
src/lib/axiosClient.js        one shared Axios instance (token + 401 handling)
src/lib/api/*.js               all network calls, grouped by resource
src/lib/useDebouncedValue.js   debounce hook used by the search box
src/lib/urlState.js            helpers that turn URL values into safe values
src/hooks/useAuth.js           username + logout, for pages behind RequireAuth
src/components/RequireAuth.jsx redirects to /login if there's no token
src/components/Input.jsx       the one reusable input/textarea field
src/components/*               other small, single-purpose UI pieces
src/pages/Login.jsx            login form
src/pages/Products.jsx         list page: search, filter, sort, pagination
src/pages/ProductDetail.jsx    product detail page
src/pages/ProductNew.jsx       add product form
src/pages/ProductEdit.jsx      edit product form
src/App.jsx                    route definitions
```
