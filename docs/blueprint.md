# **App Name**: Swasthio

## Core Features:

- AI Health Summaries: Summaries presented in a semi-transparent frosted glass panel (backdrop blur ~24–30px) with a slight inner glow. When a summary generates, reveal it with a soft unblur animation (blur ↓ 20px → 6px while fading in, 450ms, gentle spring). Read aloud control sits on the glass top-right with a subtle glass hover halo.
- Family Health Profiles: Each profile exists as a glass card with layered blur (card blur 18–22px). Switching profiles uses a card-flip + background-blur increase (temporary page blur +10px) to focus user attention. Profile avatars sit on a micro frosted badge (blur 12px) that slightly sharpens on focus.
- Offline Emergency Access: Emergency modal uses heavy backdrop blur (backdrop-filter: blur(36px)) to dim page content and draw eyes to the emergency card. Emergency QR / info card uses shallow blur (12–16px) so text remains perfectly legible.
- Prescription Insights: Prescription panel floats on a frosted sheet (blur 20px) with animated blurred highlights behind words as the AI tool points out keywords (animated radial blur pulses behind keywords, low-opacity, non-obstructive).
- Secure Cloud Storage: Vault visual uses multi-layer blur: a moving blurred gradient behind a vault icon (layer1 blur 8px, layer2 blur 28px) to imply depth and security. Scroll-triggered micro-blur increases slightly to illustrate the “locking” animation when a file is uploaded.
- Effortless Document Uploads: Drag-and-drop area uses a liquid ripple + soft glass blur overlay (blur 16px) on hover. Upload progress shows files sliding into a frosted folder that slightly de-blurs as upload completes.
- Engaging Landing Page: Hero uses a large background blur panel (backdrop-filter: blur(40px)) behind leaf patterns and soft gradients. Section transitions use progressive blur: background blur increases as the user scrolls into focus, then resolves as the content becomes active (subtle, not distracting).

## Style Guidelines:

- Use seafoam green (#0D9488) , white(#ffffff) and forest accent (#064E3B) as subtle tints on blurred layers with low opacity (4–12%) to keep readability.
- Blurred backgrounds must always have sufficient contrast for the foreground text (use semi-opaque fill behind text if necessary: rgba(255,255,255,0.6) + blur).
- Primary glass blur tiers (recommended): Hero / large backdrops: 32–45px (use sparingly); Main cards / panels: 16–28px (primary frosted look); Small badges / tooltips: 8–12px (light frosted effect); Modals / emergency overlay: 30–40px (to isolate focus)
- 1px soft border with 12% white/black overlay for depth.
- Unblur / blur transitions 300–600ms with spring easing; hover blurs 120–220ms for responsiveness.