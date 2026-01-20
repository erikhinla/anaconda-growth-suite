# Eva Paradis Brand Bridge - Landing Page

A high-conversion landing page designed to capture leads and drive traffic to OnlyFans.

## Overview

This landing page implements a "Value Exchange" gate where users must enter their email to unlock:
- **Free Preview Gallery** - Unblurred teaser images
- **60% OFF Discount Code** - Promotional code for OnlyFans subscription

## Design Aesthetic

**"Italian Premium" Luxury Theme**
- Background: `#050505` (Deep Black)
- Accent: `#D4AF37` (Gold)
- CTA: `#8a0303` (Deep Red)
- Typography: Clean, modern sans-serif

## Features Highlighted

1. **VR Experience** - Unique Selling Point, prominently displayed
2. **Italian Heritage** - Authentic Italian branding throughout
3. **VIP Daily Chat** - Personal connection value proposition

## File Structure

```
├── src/
│   ├── pages/
│   │   └── EvaParadis.tsx          # React landing page component
│   ├── hooks/
│   │   └── useEvaTracking.ts       # Meta & TrafficJunky pixel hooks
│   └── utils/
│       └── brevo.ts                # Brevo CRM integration utility
├── backend/
│   ├── app.py                      # Flask API server
│   ├── requirements.txt            # Python dependencies
│   └── .env.example                # Environment variables template
└── public/
    └── eva-standalone/
        ├── index.html              # Standalone HTML version
        └── assets/                 # Image assets directory
```

## Quick Start

### Option 1: React Integration (Recommended)

The landing page is already integrated into the React app at route `/eva` or `/eva-paradis`.

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:5173/eva
```

### Option 2: Standalone HTML

Use the standalone HTML version for simple deployments:

1. Copy `public/eva-standalone/` to your web server
2. Add your images to the `assets/` folder
3. Update pixel IDs in the HTML
4. Configure your backend API endpoint

## Configuration

### Environment Variables

Create a `.env` file with the following:

```env
# Frontend (Vite)
VITE_META_PIXEL_ID=your_meta_pixel_id
VITE_TRAFFICJUNKY_ID=your_trafficjunky_id
VITE_BREVO_API_KEY=your_brevo_api_key

# Backend (Flask)
BREVO_API_KEY=your_brevo_api_key
LIST_ID_EVA_MAIN=2
PORT=5000
```

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy and configure environment
cp .env.example .env
# Edit .env with your actual API keys

# Run server
python app.py
```

## Tracking & Analytics

### User Funnel States

| State | Trigger | Pixel Event |
|-------|---------|-------------|
| **Browser** | Page load | `PageView` |
| **Lead** | Form submission | `Lead` |
| **Clicker** | OnlyFans link click | `InitiateCheckout` |

### Meta Pixel Events

- `PageView` - Fired on page load
- `Lead` - Fired on email submission
- `InitiateCheckout` - Fired on OnlyFans click (high intent signal)

### TrafficJunky Integration

- Page view tracking
- Lead conversion tracking
- Click-through tracking for retargeting

## Brevo CRM Integration

### Contact Attributes

| Attribute | Description |
|-----------|-------------|
| `SOURCE` | `Brand_Bridge` |
| `STATUS` | `Lead`, `Hot_Lead`, `Clicker`, `Subscriber` |
| `INTEREST` | `VR_Experience` |
| `SIGNUP_DATE` | Date of subscription |

### Automation Triggers

1. **Welcome Email** (Day 0)
   - Triggered when contact added to list
   - Contains 60% discount code

2. **Retargeting** (24h post-click)
   - If `trackClicker()` fired but no purchase
   - Show "You forgot your discount" ad

3. **VR Teaser Email** (Day 7)
   - If user hasn't clicked link
   - Highlight VR content differentiation

## Required Assets

Place these images in `public/` (React) or `public/eva-standalone/assets/` (standalone):

| File | Size | Purpose |
|------|------|---------|
| `eva-hero.jpg` | 1920x1080 | Hero background |
| `teaser1.jpg` | 500x500+ | Preview image 1 |
| `teaser2.jpg` | 500x500+ | Preview image 2 |
| `teaser3.jpg` | 500x500+ | Preview image 3 |

## Customization

### Changing the Discount Code

Edit the `DISCOUNT_CODE` constant in:
- `src/pages/EvaParadis.tsx` (React)
- `public/eva-standalone/index.html` (Standalone)

### Changing the OnlyFans URL

Edit the `ONLYFANS_URL` constant in:
- `src/pages/EvaParadis.tsx` (React)
- `public/eva-standalone/index.html` (Standalone)

### Modifying Brand Colors

Update CSS variables:
```css
:root {
    --brand-gold: #D4AF37;
    --brand-red: #8a0303;
    --brand-black: #050505;
}
```

## Deployment

### Vercel (React Version)

```bash
npm run build
vercel deploy
```

### Static Hosting (Standalone)

Upload `public/eva-standalone/` to any static hosting:
- Netlify
- GitHub Pages
- AWS S3
- CloudFlare Pages

### Backend (Flask)

Deploy to:
- Heroku
- Railway
- Render
- AWS Lambda (with API Gateway)
- VPS with Gunicorn

## Security Notes

- Never expose `BREVO_API_KEY` in frontend code
- Use the backend proxy for all CRM operations
- Implement rate limiting in production
- Add CAPTCHA for spam prevention if needed

## Support

For issues or questions, refer to the main project documentation or contact the development team.
