# Product Admin Dashboard (React + Vite + Tailwind + Axios)

A small admin dashboard for the DummyJSON products API, built as a
plain React single-page app: Vite, React Router, Tailwind CSS and
Axios for every API call.

## Setup

    npm install
    npm run dev

Open the URL Vite prints (usually http://localhost:5173) - it
redirects to /login.

Test login: username `emilys`, password `emilyspass`.

Build for production: `npm run build` (output in `dist/`), then
`npm run preview` to check it locally.

## Deploying

This is a client-side-only SPA, so Vercel or Netlify both work. Because
it uses React Router (real URLs like /products/5, not hash routes),
the host needs to serve index.html for every path, or refreshing a
page other than the home page will 404. Two files already handle that:
`public/_redirects` (Netlify) and `vercel.json` (Vercel). No
environment variables are needed.

## Project structure

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

## What's finished

- [x] Login page against /auth/login, with an error message for wrong
      details, and a logout button. RequireAuth wraps every /products
      route and redirects to /login if there's no token.
- [x] Product list: image, title, category, price, rating, stock - a
      table on desktop, cards on mobile.
- [x] Pagination using limit/skip, Previous/Next buttons, a page size
      selector (10/20/50) and a "Showing X-Y of Z" line.
- [x] Debounced search (500ms) against /products/search, reset to
      page 1 whenever the search text changes.
- [x] Filter by category, sort by title/price/rating, ascending and
      descending.
- [x] Product detail page at /products/:id, with a "not found" message
      for a bad id.
- [x] Add/edit product form with validation, and a confirm popup
      before deleting.
- [x] Loading, empty and error states (with a Retry button).
- [x] Page, search, filter and sort all live in the URL query string,
      so refreshing or sharing the link reproduces the same view.
- [x] One shared, reusable Input component used by every form.

## Decisions and trade-offs

**Old search results can't overwrite new ones.** Every product-list
request carries an AbortController signal. Starting a new request
aborts whatever was still in flight, and a requestId counter
double-checks a response belongs to the latest request before it's
used - so even a slow request (tested with a hardcoded delay) can
never overwrite a faster, newer one.

**Search and category filter can't both be sent to the API.** DummyJSON
has no endpoint combining free-text search with a category filter.
With an active search term, the app searches everything and shows a
note that the category filter is being ignored, rather than silently
dropping it.

**Add/edit/delete aren't really saved by DummyJSON.** The API answers
as if they worked, but nothing persists on reload. The app still makes
the real network call every time, then updates its own in-memory list
to match, and says so in a note after a delete.

**Bad URLs can't break the page.** ?page=abc, ?page=0, ?page=999 or an
unsupported ?pageSize=13 are read through small helpers
(src/lib/urlState.js) that fall back to a safe default instead of
trusting the value, and the address bar is tidied up to match.

**Double-clicking Save or Login doesn't send duplicate requests.** Both
forms track a submitting flag and disable/relabel their button while a
request is in flight.

**No React Query / SWR.** Data fetching is plain useEffect + the
functions in src/lib/api/*.js, with the abort/request-id logic above
handling races by hand.

## A problem I ran into

Getting "refreshing shows the same result" and "typing fast doesn't
break anything" to both work at once was the trickiest part - the
search box needs to feel instant, but the URL (and the API call)
should only update after a pause. That's why there are two pieces of
state for search: `searchInput` (every keystroke, local only) and the
debounced value that actually drives the URL and the fetch.

## Where AI tools helped

This project was built with AI assistance for scaffolding the file
structure and the repetitive parts (form fields, table/card markup,
Tailwind classes), staged into 12 incremental commits so each piece
could be reviewed and understood before moving to the next. The
API-call design, the debounce + abort/race-condition handling, the
URL-state approach, and the search-vs-category decision were reviewed
and adjusted by hand.
