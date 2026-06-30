# PR Title

fix: add dark mode theme support across Astro landing page components

# PR Description

## Summary

This PR addresses the Astro landing page dark mode issue where components still rendered using hardcoded light-mode colors even when a theme toggle was present.

The root cause was that the landing page had no shared CSS variable definitions for dark mode and no `.dark` class overrides for the relevant sections. As a result, components continued to use fixed colors such as `#ffffff`, `#111827`, and `#e5e7eb` regardless of the selected theme.

## What changed

- Added global light/dark CSS theme tokens and `.dark` overrides in the main stylesheet.
- Wired the theme on initial page load so the correct mode is applied immediately.
- Added a working theme toggle in the navbar with persisted user preference.
- Updated Astro landing page components to use semantic theme variables instead of hardcoded light colors.
- Applied dark-mode-friendly styling to the hero, promise, feature discovery, benefits, security, and escrow card sections.

## Why this is needed

Without shared dark-mode variables and overrides, the Astro landing page looks inconsistent when switching themes. This change ensures the UI adapts properly and remains readable in both light and dark mode.

## Testing

- Verified the Astro project builds successfully with `npm run build`.

## Notes

This change keeps the landing page visually consistent while preserving the existing layout and content structure.
