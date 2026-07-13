# Integrate High Score Client Cookies and Leaderboard UI

This plan outlines the changes required to hook the frontend client logic to the backend SQLite High Score API.

## 🏛️ Architecture & Code Changes

### 1. Prompt and Cookie Handling
- On page load, check if a cookie named `username` exists.
- If not, display a simple, styled prompt/input field inside the game overlay (or a browser prompt as a fallback, but a styled modal inside the overlay is much better!).
- Save the entered name in a cookie:
  - Cookie format: `username=<name>; max-age=31536000; path=/` (1 year expiration).

### 2. Save Score on Game Over or Victory
- In `gameOver()` and `gameVictory()`, read the `username` cookie.
- If a valid username is found, execute a `POST /api/scores` with JSON payload:
  ```json
  {
    "name": "<username>",
    "score": <score>
  }
  ```
- After posting, refresh the leaderboard.

### 3. Leaderboard HUD Panel
- Add a new container `#leaderboard-panel` in `web/index.html` inside the control panel or in a new side column.
- Style the leaderboard in `web/css/style.css` matching our modern dark theme:
  - Clean table headers.
  - Alternating row highlights.
  - Soft cyan border-top accents.
- Implement a JS function `fetchLeaderboard()` that calls `GET /api/scores`, parses the JSON array, and builds the HTML table/list dynamically.
- Call `fetchLeaderboard()` on game load, game over, and victory.

---

## 🛠️ Detailed File Edits

### 1. `web/index.html`
Add a Leaderboard Card in the UI:
```html
<div class="leaderboard-card">
  <h3>🏆 Leaderboard</h3>
  <table id="leaderboard-table">
    <thead>
      <tr>
        <th>Rank</th>
        <th>Player</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody id="leaderboard-body">
      <tr><td colspan="3">Loading...</td></tr>
    </tbody>
  </table>
</div>
```

### 2. `web/css/style.css`
Style the table, leaderboard wrapper, and modal name inputs.

### 3. `web/js/game.js`
- Helper functions to set/get cookies:
```javascript
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
  return '';
}
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`;
}
```
- Prompt name logic in `resetGame()` or on page load. Let's add a name input field to the main start overlay, so if the username cookie is empty, we show a text input for the player name in the overlay instead of starting immediately!
- Add `submitScore(name, score)` using `fetch("/api/scores", { method: "POST", ... })`.
- Add `fetchLeaderboard()` using `fetch("/api/scores")` and DOM manipulation.

---

## 🧪 Acceptance Criteria
1. On first start (or if cookie is cleared), the game forces the player to enter a name.
2. The name is stored in a cookie and persists on reload.
3. Completing the game (Game Over or Victory) posts the score to `/api/scores`.
4. Leaderboard displays the top 10 scores from SQLite dynamically.
