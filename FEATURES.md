# TDPK HubPass - Feature Implementation Guide

## Implemented Features

### 1. Map & Directory Filters ✅

**Route**: `/directory`

**Features**:
- Interactive Mapbox map with partner location markers
- List/Map toggle view
- Search partners by name, address, or country
- "Near Me" geolocation feature
- Click markers to highlight partners
- Responsive layout

**Setup Required**:
Add `VITE_MAPBOX_TOKEN` to your environment:
1. Sign up at [mapbox.com](https://mapbox.com)
2. Get your public token from the dashboard
3. Add to `.env`: `VITE_MAPBOX_TOKEN=your_token_here`

**Components**:
- `MapView.tsx` - Main map component with markers
- `DirectoryWithMap.tsx` - Page with map/list toggle

---

### 2. Global Search ✅

**Features**:
- Search bar in header (member dashboard)
- Real-time search across:
  - Partners (name, address, country)
  - Offers (title, partner)
- Debounced input (300ms)
- Dropdown with top 5 results per type
- Click to navigate to highlighted item

**Components**:
- `GlobalSearch.tsx` - Search component with dropdown
- Integrated in `MemberDashboard` header

---

### 3. Partner Portal Verification ✅

**Route**: `/partner/verify`

**Features**:
- QR code scanner using device camera
- Manual lookup by email or token
- Real-time member verification
- Subscription status check
- Verification logging to database
- Visual feedback (green/red for active/expired)

**Components**:
- `QRScanner.tsx` - Scanner and lookup component
- `PartnerVerification.tsx` - Verification page

**How It Works**:
1. Partner clicks "Scan & Verify" on dashboard
2. Camera opens or manual input field available
3. Scans QR code or enters email/token
4. System validates token expiry
5. Fetches member subscription status
6. Records verification in `verifications` table
7. Shows member details and access eligibility

---

### 4. Internationalization (i18n) ✅

**Languages**: English (EN), Thai (TH)

**Features**:
- Language switcher in header (globe icon)
- Translates:
  - Navigation labels
  - Button text
  - Common phrases
  - Form labels
  - Error messages
- Persists language preference in localStorage
- Default: English

**Components**:
- `i18n.ts` - Translation configuration
- `LanguageSwitcher.tsx` - Language toggle dropdown
- Integrated in all major pages

**Adding Translations**:
Edit `src/lib/i18n.ts` and add new keys to both `en` and `th` objects.

**Usage**:
```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
return <Button>{t('common.submit')}</Button>;
```

---

## Database Updates

### New Partner Data
Added 3 sample partners with GPS coordinates:
- True Digital Park Bangkok (13.721909, 100.568831)
- Salt Fukuoka (33.590008, 130.401716)
- CIT Taipei (25.043157, 121.559777)

### Verification Flow
When a partner verifies a member:
1. Record created in `verifications` table
2. Captures: partner_id, member_id, method (qr/lookup), result (active/expired)
3. Checks subscription status from `subscriptions` table
4. Returns member tier and eligibility

---

## Testing Guide

### Test Global Search
1. Log in as member (`alice.member@demo.com` / `Demo2025!`)
2. Use search bar in header
3. Type "True" → should show "True Digital Park Bangkok"
4. Type "offer" → searches offers table
5. Click result → navigates to highlighted item

### Test Map View
1. Visit `/directory`
2. Toggle between Map and List view
3. Click "Near Me" → requests location permission
4. Search for "Bangkok" → filters partners
5. Click map markers → highlights partner card

### Test QR Verification
1. Log in as partner (`test@truespace.co.th` / `Demo2025!`)
2. Go to Partner Dashboard → "Scan & Verify"
3. Use camera scanner or manual lookup
4. Try verifying: `alice.member@demo.com`
5. Should show: Active subscription, Member tier
6. Check `verifications` table for new record

### Test Language Switching
1. Click globe icon in header
2. Select "ไทย (TH)"
3. Navigation and buttons change to Thai
4. Reload page → language persists
5. Switch back to English

---

## Next Steps

### Implemented Enhancements ✅

1. **Pricing & Plans** ✅
   - Coupon code entry on checkout
   - Invoice history viewer for members
   - Stripe integration for discount codes

2. **Admin Console** ✅
   - Member management dashboard with subscription details
   - Audit log viewer with action tracking
   - Real-time stats (members, revenue, verifications)
   - Role-based access control (admin only)

3. **Legal Pages** ✅
   - `/terms` - Terms of Service
   - `/privacy` - Privacy Policy
   - Footer with legal links on all pages
   - Production-ready compliance pages

---

## Admin Features

### Admin Dashboard (`/admin`)

**Access**: Admin role required

**Features**:
- Overview stats cards:
  - Total members
  - Active subscriptions
  - Monthly revenue
  - Total verifications
- Member management table:
  - View all members with subscription status
  - Member details (name, tier, status)
  - Subscription info and renewal dates
- Audit logs viewer:
  - Recent system actions
  - Entity tracking (table + ID)
  - Actor information (user + role)
  - IP address logging

**Granting Admin Access**:
```sql
-- Insert admin role for a user
INSERT INTO user_roles (user_id, role)
VALUES ('user-uuid-here', 'admin');
```

### Invoice History

**Location**: `/billing` page (for subscribed members)

**Features**:
- View past invoices
- Download invoice PDFs (via Stripe integration)
- Invoice date, amount, status
- Currency formatting

**Note**: Currently shows mock data. Connect to Stripe API via edge function for live invoice data.

### Coupon Codes

**Usage**:
1. Enter coupon code on billing page
2. Code validated at Stripe checkout
3. Discount applied automatically
4. Valid Stripe coupon IDs required

**Creating Coupons**:
Use Stripe dashboard to create coupon codes, then share with customers.

---

## Legal Compliance

### Terms of Service (`/terms`)
- Membership agreement
- Subscription terms
- Refund policy
- User conduct guidelines
- Liability limitations

### Privacy Policy (`/privacy`)
- Data collection disclosure
- Information usage
- Third-party sharing
- User rights (access, deletion, portability)
- GDPR/CCPA compliance
- Security measures
- Cookie policy

### Footer Component
- Appears on all public pages
- Links to legal pages
- Product navigation
- Support contact

---

### Suggested Future Enhancements

1. **Enhanced Admin Tools**
   - Export to CSV functionality
   - Charts for revenue trends
   - Server-side pagination for large datasets
   - User role management UI
   - Partner approval workflow

2. **Advanced Billing**
   - Proration handling for plan changes
   - Usage-based pricing tiers
   - Invoice customization
   - Tax calculation integration
   - Multi-currency support

3. **Notifications**
   - Email notifications for expiring subscriptions
   - Push notifications for new offers
   - Partner verification alerts
   - Monthly usage summaries

4. **Analytics**
   - Member engagement tracking
   - Popular partner locations
   - Offer redemption rates
   - Revenue forecasting

5. **Mobile Optimization**
   - Progressive Web App (PWA) support
   - Offline access for digital pass
   - Native app considerations
   - Mobile-first UI improvements

---

## API Keys & Environment Variables

### Required
- `VITE_SUPABASE_URL` - Auto-configured ✅
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Auto-configured ✅
- `STRIPE_SECRET_KEY` - Add to backend secrets
- `STRIPE_WEBHOOK_SECRET` - Add to backend secrets

### Optional
- `VITE_MAPBOX_TOKEN` - For map functionality (get from mapbox.com)

---

## Dependencies Added

```json
{
  "mapbox-gl": "^3.x",
  "@mapbox/mapbox-gl-geocoder": "^5.x",
  "react-i18next": "^13.x",
  "i18next": "^23.x",
  "html5-qrcode": "^2.x"
}
```

---

## Security Notes

**RLS Policies**:
- Partners can only verify for their own partner_id
- Members can only view their own verifications
- QR tokens expire and are single-use
- Manual lookups require partner authentication

**Best Practices**:
- All verification attempts logged
- Subscription status checked in real-time
- No sensitive data exposed to client
- Token validation on server side

---

## Troubleshooting

### Map Not Loading
- Check `VITE_MAPBOX_TOKEN` is set correctly
- Verify token is public (starts with `pk.`)
- Check browser console for Mapbox errors

### QR Scanner Not Working
- Ensure HTTPS (required for camera access)
- Check browser permissions for camera
- Try manual lookup if camera fails
- Test with valid email from demo users

### Search Not Working
- Check database has partners/offers
- Verify RLS policies allow read access
- Check network tab for API errors
- Ensure user is authenticated

### Translation Missing
- Check key exists in `i18n.ts`
- Verify both EN and TH translations added
- Use `t('key')` not direct string
- Check console for i18n warnings

---

## Performance Tips

1. **Map Performance**
   - Markers lazy load based on zoom level
   - Use clustering for 100+ locations
   - Optimize marker images (WebP format)

2. **Search Performance**
   - 300ms debounce on input
   - Limit results to 5 per type
   - Add database indexes on searched fields

3. **i18n Performance**
   - Translations loaded once at startup
   - Switch language without reload
   - Minimal bundle size impact

---

For more help, see the main README.md or contact support.
