# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated: Vite, React, and Supabase for shared event data and authenticated admin access. No deployment target selected.

## Users

Invitees who want to learn about Teacher Raksa's birthday gathering and leave a shared wish. An event administrator who needs to update gathering details and access legacy registrations.

## Product Purpose

Provide a welcoming birthday invitation where guests can leave a shared birthday wish and revisit photos from last year's celebration. Success means invitees can understand the event, submit a wish, and read the wishes others have left, while the administrator can update event information.

## Capabilities and Constraints

- The event date supplied most recently is 09/11/2026. Interpreted as 9 November 2026 (day/month/year, consistent with the user's locale).
- The event time is 5:30; evening is inferred from the birthday dinner photos and remains an assumption.
- The location is TBC.
- Birthday wishes and event details are shared online through Supabase. The public wish book displays each writer's name and message. The admin route is `/admin` and requires authenticated access.
- The wish form collects only a name and wish. The proposed stack requires the owner to provide Supabase project credentials and run the schema before shared online data can work.
- The user's requested cute birthday theme applies to the invitation surface.

## Brand Commitments

Use a warm, cute birthday voice. The event is for Teacher Raksa.

## Evidence on Hand

Five real photos from last year's celebration supplied by the user are in `public/memories/`: `raksa-cake.png`, `birthday-table.png`, `friends-together.png`, `friends-cooking.png`, and `cake-tasting.png`.

## Product Principles

- Keep the event details and wish form easy to find.
- Make sharing a wish welcoming and clear that the name and message are public.
- Keep event editing and guest review behind administrator authentication.
- Use the supplied celebration photos as the memories content.
