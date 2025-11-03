# TDPK HubPass - Coworking Network Membership Platform

A React-based web application for managing coworking space memberships with Stripe subscriptions and gated access.

## Features

- **Subscription Management**: Yearly subscription plans with Stripe integration
- **Gated Access**: Content locked behind active subscription status
- **QR Code Pass**: Digital membership verification for coworking spaces
- **Partner Directory**: Browse global network of coworking spaces
- **Exclusive Perks**: Member-only offers and discounts
- **Role-Based Access**: Admin, Member, and Partner user roles

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (via Lovable Cloud)
- **Payments**: Stripe Checkout & Customer Portal
- **Authentication**: Supabase Auth

## Environment Variables

The following environment variables are automatically configured in Lovable Cloud:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

## Stripe Configuration

### Required Secrets (in Supabase/Cloud)

Add these secrets in your Lovable Cloud backend:

1. **STRIPE_SECRET_KEY**: Your Stripe secret key (sk_test_... or sk_live_...)
2. **STRIPE_WEBHOOK_SECRET**: Your Stripe webhook signing secret (whsec_...)

### Setting Up Stripe

1. **Create Stripe Account**: Sign up at [stripe.com](https://stripe.com)

2. **Get API Keys**:
   - Go to Developers → API keys
   - Copy your Secret key (starts with `sk_test_` or `sk_live_`)
   - Add as `STRIPE_SECRET_KEY` in Lovable Cloud backend

3. **Set Up Webhook**:
   - Go to Developers → Webhooks
   - Click "Add endpoint"
   - URL: `https://[your-project-id].supabase.co/functions/v1/stripe-webhook`
   - Events to send:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Copy the Signing secret (starts with `whsec_`)
   - Add as `STRIPE_WEBHOOK_SECRET` in Lovable Cloud backend

4. **Create Products** (Optional):
   - The app will create products dynamically via API
   - Or manually create in Stripe Dashboard matching plan codes:
     - `MEMBER_THB_1188` - Member Yearly (฿1,188/year)
     - `MEMBER_PLUS_THB_2388` - Member Plus Yearly (฿2,388/year)
     - `GLOBAL_THB_3588` - Global Tenant Yearly (฿3,588/year)

## Database Schema

### Key Tables

- **members**: User profiles with tier and status
- **subscriptions**: Stripe subscription records
- **plans**: Subscription plan definitions
- **user_roles**: Role-based access control (admin, member, partner_user)
- **partners**: Coworking space partner locations
- **offers**: Exclusive perks and offers
- **qr_tokens**: Digital pass QR codes
- **verifications**: Check-in records
- **redemptions**: Offer redemption history

### Row Level Security (RLS)

All tables have RLS enabled with policies based on:
- User authentication (auth.uid())
- Role-based access (via has_role() function)
- Member ownership (member_id = auth.uid())

## Running Locally

1. **Clone and Install**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Seed Demo Data**:
   - Visit the home page
   - Click "Setup Demo Data"
   - This creates test users and subscriptions

### Demo Accounts

After seeding, you can log in with:

- **Admin**: `pakkanan.cha@truedigitalpark.com` / `Demo2025!`
- **Member (Active)**: `alice.member@demo.com` / `Demo2025!`
- **Tenant (Active)**: `taro.tenant@demo.com` / `Demo2025!`
- **Global (Active)**: `nicha.global@demo.com` / `Demo2025!`

All demo members have fake "Active until [1 year from now]" subscriptions.

## Testing Stripe Integration

### Test Mode

1. Use Stripe test API keys (starting with `sk_test_`)
2. Use test credit cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Any future expiry date (e.g., 12/34)
   - Any 3-digit CVC

### Test Flow

1. **Subscribe**:
   - Log in as a member
   - Go to `/billing`
   - Click "Subscribe Now" on any plan
   - Complete Stripe Checkout with test card
   - Webhook updates subscription status

2. **Verify Gated Access**:
   - After successful subscription, visit `/member`
   - QR Pass, Directory, and Perks should be unlocked
   - Without subscription, they show locked state

3. **Manage Billing**:
   - Click "Manage Billing" on billing page
   - Opens Stripe Customer Portal
   - Cancel, update payment method, or view invoices

### Webhook Testing

Test webhooks locally with Stripe CLI:

```bash
stripe listen --forward-to https://[your-project-id].supabase.co/functions/v1/stripe-webhook
stripe trigger checkout.session.completed
stripe trigger customer.subscription.updated
stripe trigger customer.subscription.deleted
```

## Deployment

The app auto-deploys on Lovable Cloud. Edge functions deploy automatically.

### Production Checklist

- [ ] Replace Stripe test keys with live keys
- [ ] Update webhook endpoint with live mode secret
- [ ] Test subscription flow end-to-end
- [ ] Verify RLS policies are secure
- [ ] Enable Supabase rate limiting
- [ ] Set up monitoring and alerts

## Subscription Plans

| Plan | Price | Code | Features |
|------|-------|------|----------|
| **Member Yearly** | ฿1,188/year | MEMBER_THB_1188 | Access to local network, 10hr meeting rooms, basic perks |
| **Member Plus Yearly** | ฿2,388/year | MEMBER_PLUS_THB_2388 | Regional access, 20hr meeting rooms, priority support, premium perks |
| **Tenant Global Yearly** | ฿3,588/year | GLOBAL_THB_3588 | Global network access, unlimited meeting rooms, VIP perks, dedicated support |

Plans are stored in the `plans` table and can be updated via Supabase.

## Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Landing page | Public |
| `/auth` | Sign in / Sign up | Public |
| `/member` | Member dashboard | Members only |
| `/billing` | Subscription plans & management | Members only |
| `/partners` | Partner directory preview | Public (limited) |
| `/perks` | Exclusive perks preview | Public (limited) |
| `/spaces` | Coworking spaces | Members only (full) |
| `/partner` | Partner dashboard | Partners only |

## Support

For issues or questions:
- Check [Lovable Documentation](https://docs.lovable.app)
- Review [Supabase Docs](https://supabase.com/docs)
- See [Stripe Documentation](https://stripe.com/docs)

## License

Proprietary - True Digital Park & Knowledge (TDPK)
