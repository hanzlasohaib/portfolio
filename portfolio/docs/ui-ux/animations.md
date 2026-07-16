# Animations

> Version: 1.0.0
>
> Status: Approved
>
> Last Updated: 2026-07-16
>
> Owner: Project Team
>
> Category: UI-UX

---

# Philosophy

Animations should:

- Guide attention
- Improve usability
- Feel smooth
- Never distract

Performance always takes priority over visual effects.

---

# Timing

Fast

150ms

Normal

250ms

Slow

400ms

Page transitions

500ms maximum

---

# Easing

Default

ease-out

Entrance

ease-out

Exit

ease-in

---

# Allowed Animations

- Fade In
- Fade Up
- Fade Down
- Scale
- Hover Elevation
- Opacity
- Blur (subtle)
- Scroll Progress
- Background Blob Movement

---

# Hover Effects

Buttons

- Slight scale (1.02)
- Shadow increase

Cards

- Translate Y (-4px)
- Shadow increase

Links

- Color transition
- Underline animation

Icons

- Color transition
- Slight scale

---

# Page Entrance

Sections should appear with:

- Fade
- Small translateY
- Staggered children

Do not animate the entire page aggressively.

---

# Navigation

Navbar

- Background blur on scroll
- Smooth shadow transition

Mobile Menu

- Slide from top
- Fade overlay

---

# Loading

Use:

- Skeleton
- Spinner

Avoid long looping animations.

---

# Background

Allowed:

- Slow floating blobs
- Very subtle gradients

Forbidden:

- Fast movement
- Constant flashing
- Rotating backgrounds

---

# Scroll

Allowed:

- Progress bar
- Fade-in sections
- Back-to-top button

Avoid parallax unless there is a clear UX benefit.

---

# Modal

Open:

- Fade
- Scale (95% → 100%)

Close:

- Fade
- Scale (100% → 95%)

---

# Reduced Motion

Respect:

prefers-reduced-motion

When enabled:

- Disable decorative animations.
- Keep only essential transitions.

---

# Performance

Use:

- opacity
- transform

Avoid animating:

- width
- height
- top
- left

Use GPU-friendly properties whenever possible.

---

# Accessibility

Animations must never:

- Flash rapidly
- Trigger motion sickness
- Delay important interactions

---

# Animation Rules

Do:

- Keep motion subtle.
- Animate with purpose.
- Maintain consistency.

Don't:

- Bounce components.
- Overuse floating effects.
- Animate every element.
- Introduce random durations.

---

# Approved Motion Language

The application should feel:

- Smooth
- Premium
- Calm
- Professional
- Responsive

Motion should enhance the experience, not become the focus.