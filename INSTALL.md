# Installation Guide - Todo PWA

## Quick Setup (5 minutes)

### Step 1: Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Step 2: Start Development Server
\`\`\`bash
npm run dev
\`\`\`

The app will be available at `http://localhost:5173`

### Step 3: Test PWA Features
1. Open the app in Chrome/Edge
2. Open DevTools > Application > Service Workers
3. Verify service worker is registered
4. Test offline mode by going offline in DevTools

### Step 4: Build for Production
\`\`\`bash
npm run build
npm run preview
\`\`\`

## PWA Installation on Devices

### Desktop (Chrome/Edge)
1. Visit the app URL
2. Look for install icon in address bar
3. Click "Install Todo PWA"
4. App appears in applications menu

### Mobile (Android/iOS)
1. Open app in browser
2. Tap browser menu
3. Select "Add to Home Screen"
4. App icon appears on home screen

## Verification Checklist

- [ ] App loads without internet
- [ ] Tasks persist after page reload
- [ ] Install prompt appears
- [ ] Service worker registers successfully
- [ ] Manifest.json loads correctly
- [ ] Icons display properly

## Troubleshooting

**Service Worker not registering:**
- Ensure HTTPS or localhost
- Check browser console for errors
- Clear browser cache

**Install prompt not showing:**
- Use Chrome/Edge browser
- Ensure PWA criteria are met
- Check manifest.json validity

**Offline mode not working:**
- Verify service worker is active
- Check cache storage in DevTools
- Ensure all assets are cached

## Production Deployment

For production deployment:
1. Build the app: `npm run build`
2. Serve the `dist` folder with HTTPS
3. Ensure proper MIME types for manifest.json
4. Test PWA features in production environment