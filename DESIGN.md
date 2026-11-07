---
name: Raksa's Day Birthday Invitation
description: A paper-framed birthday invitation with warm editorial type, real celebration photos, and a simple RSVP flow.
colors:
  paper: "#fff4de"
  ink: "#392d39"
  accent: "#ffced8"
  deep-accent: "#8e526b"
  blush: "#ffdddd"
  peach: "#ffe8c4"
  line: "#ffced8"
  muted: "#766977"
  blush-surface: "#ffdddd"
  section-wash: "#ffe8c4"
typography:
  display:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(54px, 6.2vw, 86px)"
    fontWeight: 600
    lineHeight: 0.99
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(34px, 4vw, 48px)"
    fontWeight: 600
    lineHeight: 1.09
    letterSpacing: "-0.03em"
  body:
    fontFamily: "'DM Sans', Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "'DM Sans', Arial, sans-serif"
    fontSize: "10px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.15em"
rounded:
  field: "3px"
  control: "4px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "50px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 17px"
---

# Design System: Raksa's Day Birthday Invitation

## Overview

**Creative North Star: "The Keepsake Invitation"**

This visual system treats the birthday invitation as a small piece of party stationery: warm paper, expressive serif lettering, and real snapshots from last year's gathering. The four Color Hunt pastels give the invitation its warm, affectionate feel; dark ink keeps the event information and RSVP readable.

The public invitation pairs decorative details with straightforward interaction patterns. The `/admin` surface shares the palette and type but uses more restrained panels, labels, and form spacing for event editing and guest review. The implementation uses the supplied photographs `raksa-cake.png`, `birthday-table.png`, and `friends-together.png`. The displayed event date is interpreted as 9 November 2026 and the time as 5:30 PM, following the product context.

**Key Characteristics:**
- Warm vanilla paper surfaces with dark ink as the main anchor.
- Cormorant Garamond display lettering paired with DM Sans for reading and controls.
- Supplied celebration photographs presented as printed keepsakes.
- Cute stationery ornaments kept secondary to event details, RSVP, and admin tasks.

## Colors

The requested Color Hunt palette sets the atmosphere: `#FFCED8`, `#FFDDDD`, `#FFF4DE`, and `#FFE8C4`. Warm vanilla anchors the page, peach separates sections, and the two blush tones frame keepsakes and controls. Dark ink remains for readable text and navigation; subdued rose is reserved for small decorative details.

### Primary
- **Birthday Ink**: Anchors display headings, the brand mark, and important data in both invitation and admin surfaces.

### Secondary
- **Blush Accent**: Frames photos and marks primary actions with ink text for contrast.
- **Blush**: Supports section surfaces, emphasis, and small decorative marks.

### Tertiary
- **Peach**: Separates event details and memories with a warm section surface.

### Neutral
- **Invitation Paper**: The page background and the warm base for the invitation.
- **Ink**: Default reading color and contrast anchor across all pastel surfaces.
- **Soft Ink**: Supporting copy, captions, and quiet admin context.
- **Blush Surface**: Photo mats and form or admin card surfaces.
- **Section Wash**: Peach panels contrast with the vanilla page.
- **Paper Line**: Fine separators and understated panel edges.

**The Keepsake Accent Rule.** Keep decorative hues in supporting roles; keepsake rose carries the principal action, while dark ink preserves the information hierarchy.

## Typography

**Display Font:** Cormorant Garamond (with Georgia, serif fallback)  
**Body Font:** DM Sans (with Arial, sans-serif fallback)

**Character:** Cormorant Garamond brings a personal, invitation-like voice to names and section headings. DM Sans keeps RSVP fields, event facts, captions, and admin data compact and easy to scan.

### Hierarchy
- **Display** (600, responsive 54–86px, 0.99 line height): The large hero greeting; compacted at mobile sizes by the responsive rules.
- **Headline** (600, responsive 34–48px, 1.09 line height): Invitation section headings and memory title.
- **Title** (600, 27px): Admin panel headings and other smaller serif section titles.
- **Body** (400, 15px, 1.7 line height): Default reading text; supporting paragraphs may use smaller sizes where the layout requires density.
- **Label** (700, 10px, 0.15em tracking, uppercase): Event detail labels and admin overlines; form labels use DM Sans at 12px without forced uppercase.

**The Two-Voice Rule.** Reserve the serif for expressive names, headings, and short handwritten-feeling notes. Use the sans serif for paragraphs, navigation, labels, and controls.

## Layout

The desktop invitation uses a centered content frame capped at 1240px. The hero places the greeting and framed portrait side by side; event details sit in a centered three-column strip, followed by a two-column RSVP area and a three-photo gallery. The visual rhythm uses generous section padding and clear breathing room around the photos.

At 900px, the hero and RSVP spacing tighten. At 640px, the hero and RSVP become single-column, event facts stack, and the gallery becomes a two-column arrangement with its first photo spanning both columns. Navigation links collapse to the RSVP action. Admin panels use a narrower centered dashboard; the editor fields stack on mobile, while the guest table retains a minimum readable width inside a horizontal scroll region.

## Elevation & Depth

Depth is a hybrid of tonal section changes and soft shadows. Warm tinted sections separate content without adding heavy borders, while the white photo mats lift the supplied images from the paper background. Admin panels use thin borders and tonal contrast instead of prominent shadows.

### Shadow Vocabulary
- **Portrait mat** (`0 16px 34px rgba(75, 49, 63, .14)`): Gives the hero photograph its keepsake frame depth.
- **Gallery mat** (`0 9px 18px rgba(75, 49, 63, .10)`): Adds a lighter lift to memory cards.

## Shapes

Most controls and admin panels use restrained, nearly square corners; fields are slightly tighter than buttons. The photos use generous warm-vanilla mats and small rotations to suggest printed snapshots. The birthday sticker has an irregular cut-paper silhouette, balanced by a simple circular stamp. Fine borders define panels and separators without creating a dense card grid.

## Components

### Buttons
- **Shape:** Gently softened corners (4px) and a 50px minimum height for the filled action.
- **Primary:** Solid accent pink with dark ink text, medium-bold DM Sans, and horizontal padding of 22px. Hover shifts to blush and raises the control by 2px; disabled submission uses reduced opacity and a waiting cursor.
- **Outline:** The header RSVP action is transparent with an accent border, ink text, and compact padding. Links and quiet actions remain visually lighter than the filled RSVP button.
- **Focus:** Keyboard focus uses a visible 3px deep-accent outline with a 3px offset.

### Cards / Containers
- **Paper photo frames:** Warm-vanilla mats with a soft shadow, slight rotation, and image cropping. The hero mat is more prominent than gallery mats.
- **Admin panels:** Blush surfaces with a fine accent border and generous interior padding. Keep the same palette and serif headings while favoring orderly data entry over decoration.
- **Section bands:** A warm tinted background separates event details and memories from the paper page.

### Inputs / Fields
- **Style:** RSVP and admin fields use warm vanilla fills, a fine keepsake rose stroke, compact 3px corners, and at least 46px height. Labels are ink and sit above fields with a small consistent gap.
- **Focus:** Show the shared visible deep-accent outline with offset; do not rely on color change alone.
- **Error / Disabled:** Errors use a pale warm alert surface and dark red text; disabled primary actions reduce opacity.

### Navigation
- **Style:** The brand sits at the left in ink serif type; desktop section links are quiet sans-serif text. The outlined RSVP link is the navigation emphasis.
- **States:** Links shift toward muted rose on hover. At mobile widths, section links hide and the RSVP action remains available.

### Birthday Photo Keepsake
A supplied celebration photo sits inside a warm-vanilla mat, slightly rotated, with a small cut-paper sticker or caption nearby. Keep the image itself recognizable and let the frame provide the decorative treatment.

## Do's and Don'ts

### Do:
- **Do** use the actual celebration photos in `public/memories/` for the hero and memories gallery.
- **Do** keep ink as the principal text color and keepsake rose as the filled-action surface.
- **Do** use the established serif/sans pairing for display versus functional text.
- **Do** preserve the mobile RSVP flow and the gallery's responsive photo layout.
- **Do** keep admin data entry and guest review legible while sharing the invitation's palette and type.

### Don't:
- **Don't** replace the supplied celebration photos with generic stock imagery.
- **Don't** use decorative accents in a way that competes with event date, time, location, or RSVP actions.
- **Don't** turn the admin surface into a decorative invitation; its panels and labels support editing and guest review.

**Evidence note:** This document records the implementation in `src/App.jsx`, `src/styles.css`, `public/setup.html`, and the supplied assets. No approved comp was provided, and no screenshot validation is claimed.
