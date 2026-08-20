# Cross-Page Account Identity Consistency

- Task: cross-page canonical account avatar, initials and tone
- Date: 2026-08-20
- Scope: Pages 13–18 Product identity presentation only
- Implementation: shared `AccountAvatar.vue` and `accountIdentity.ts`; Product
  cards and demo pages now use the shared primitive.
- Initials: trim whitespace; one word uses its first character; multiple words
  use the first characters of the first two words; uppercase; empty is neutral.
- Tone: deterministic presentation derived from stable account ID, with name
  fallback only where no ID exists. It does not encode account semantics.
- Contract/version boundaries: API-CONTRACT-R2, backend 0.0.0/unassigned,
  frontend 0.2.0, Figma DS 1.2.0; no backend or route changes.
- Human review: pending
- Outcome: `cross_page_account_identity_consistency_pending_human_review`
