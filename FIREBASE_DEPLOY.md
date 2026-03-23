# Firebase deploy setup

## 1) One-time setup

1. Install Firebase CLI:
   - `npm install -g firebase-tools`
2. Login:
   - `firebase login`
3. Select your Firebase project:
   - `firebase use --add`

## 2) Local testing

- Start Vite app: `npm run dev`

## 3) Deploy to Firebase Hosting + Firestore Rules

- Build for Firebase root path:
  - `npm run firebase:build`
- Deploy:
  - `npm run firebase:deploy`

## Notes

- Challenge validation now relies on Firestore Security Rules in `firestore.rules`.
- The app writes challenge attempts to `challengeAttempts`; invalid submissions are rejected by rules.
- Frontend SPA routes rewrite to `index.html`.
- If you still deploy to GitHub Pages, use `npm run build` (keeps `/codeQuest/` base path).
