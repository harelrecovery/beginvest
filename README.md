# Manny & Kimera — Reception Website

Files in this folder, all meant to sit in the same GitHub repo:

- `index.html` — the site itself
- `invitation-video.mp4` — hero video (already included)
- `invite-poster.jpg` — fallback image shown before the video loads
- `rsvp-apps-script.gs` — the code that turns a Google Sheet into your RSVP inbox
- `README.md` — this file

## About "a spreadsheet in the same GitHub folder"

One honest limitation up front: GitHub Pages only serves static files — there's
no server running, so nothing on the page can *write* to a file that lives in
your repo. A literal `.csv` sitting next to `index.html` can't update itself
when someone submits the form.

What actually works, and what I've wired the form up for, is a **Google
Sheet** — a real, live spreadsheet you open and track responses in, updated
the instant someone submits. It takes about five minutes to connect and costs
nothing. That's the setup below. If you'd rather keep everything literally
inside the GitHub repo, see "Alternative: CSV in the repo" at the end.

## Setup: connect the RSVP form to a Google Sheet (~5 min)

1. **Create the sheet.** Go to [sheets.google.com](https://sheets.google.com),
   new blank sheet, name it something like `Manny & Kimera RSVPs`. In row 1,
   add these headers exactly:
   ```
   Timestamp | Full Name | Email | Attending | Adults | Kids | Guest Names | Dietary / Notes
   ```
2. **Open the script editor.** In the Sheet, go to **Extensions > Apps
   Script**. Delete any starter code, and paste in the full contents of
   `rsvp-apps-script.gs` from this folder.
3. **Save** the project (the disk icon, or Ctrl/Cmd+S). Give it any name.
4. **Deploy it as a web app.**
   - Click **Deploy > New deployment**.
   - Click the gear icon next to "Select type" and choose **Web app**.
   - Description: anything, e.g. "RSVP endpoint".
   - **Execute as:** Me
   - **Who has access:** Anyone
   - Click **Deploy**. The first time, Google will ask you to authorize the
     script — click through the "Advanced" link if it warns about an unverified
     app (this is expected for a script you wrote yourself).
5. **Copy the Web app URL** it gives you (ends in `/exec`).
6. **Paste it into `index.html`.** Find this line near the bottom of the file:
   ```js
   const SCRIPT_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
   Replace the placeholder with your `/exec` URL, keeping the quotes.
7. Commit and push `index.html` to GitHub. Test the live RSVP form — a new row
   should appear in your Sheet within a second or two.

**If you ever update the script code**, you need to create a **new
deployment** (or use "Manage deployments > Edit > New version") for changes to
go live — saving the script alone isn't enough.

## Tracking responses

Open the Google Sheet any time to see every RSVP: name, email, attending
yes/no, adult count, kids count, guest names, and dietary notes — one row per
submission, sortable/filterable like any spreadsheet. You can also download
it as an actual `.csv` or `.xlsx` from Google Sheets (**File > Download**)
whenever you want a static copy.

## Alternative: CSV in the repo

If you'd genuinely rather avoid Google Sheets, two options that keep things
closer to "just files in GitHub":

- **Manual export loop:** collect RSVPs via the Google Sheet as above, then
  periodically download it as CSV and commit that file into the repo as a
  point-in-time snapshot. Simple, but not live.
- **Third-party form backend** (Formspree, Getform, Basin): similar idea to
  the Apps Script setup — you point the form at their endpoint and view/export
  submissions from their dashboard, no Google account needed. Swap the `fetch`
  call in `index.html` for whichever service's endpoint if you'd prefer this
  route.

Either way, a literal auto-updating spreadsheet file living inside a static
GitHub Pages repo isn't achievable without adding a server — Google Sheets is
the closest thing to that with zero hosting to manage.

## Customizing

- **RSVP deadline / copy:** edit the text directly in `index.html` under the
  `<section class="rsvp">` block.
- **Hotels:** three cards are included near the bottom of the file
  (`<section class="hotels">`) — swap in others the same way.
- **Colors/fonts:** all defined as CSS variables at the top of the
  `<style>` block (`--ivory`, `--blush`, `--rose-deep`, `--gold`, etc.) and two
  Google Fonts (Cormorant Garamond, Parisienne).
