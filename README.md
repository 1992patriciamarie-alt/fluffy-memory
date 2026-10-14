# Multi-timezone Digital Clock

This is a small web page that shows live digital clocks for multiple time zones.

How to use
- Open `index.html` in a modern browser (double-click or serve through a simple static server).
- Use the dropdown to choose a time zone and click "Add" to display a clock for that zone.
- Click "Add Local" to add your system time zone.
- Click "Remove" on any clock to remove it.

Notes
- The page uses Intl.supportedValuesOf('timeZone') when available to populate a comprehensive list of time zones. Older browsers will fall back to a compact list of common zones.
- This is plain HTML/CSS/JS with no build step.

If you want, I can:
- Add this to the repository and create a GitHub Pages site so the clock is hosted.
- Add automatic tests or accessibility improvements.
