# 🖍️ NeonWipe: Next.js Crayon Transitions

**NeonWipe** is a premium, minimalist Next.js starter featuring high-energy SVG "crayon" stroke transitions. It uses **GSAP** and **next-transition-router** to create a seamless, cinematic navigation experience with a unique hand-drawn aesthetic.

## ✨ Key Features

- **Dynamic Crayon Transitions**: 3-path SVG strokes that draw and retract with customizable GSAP staggering.
- **Letter-by-Letter Hero Text**: A custom `SplitHeading` component that triggers staggered character animations on page entrance.
- **Floating Pill Navbar**: A modern, glassmorphism-inspired navigation bar with active state tracking.
- **Neon Aesthetic**: A bold, high-contrast color palette (Neon Pink, Green, Blue) designed for modern creative portfolios.
- **Performance First**: Built on Next.js 14+ (App Router) with optimized frame rates for complex SVG path animations.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Animation**: [GSAP](https://gsap.com/) (GreenSock Animation Platform)
- **Router Hook**: [next-transition-router](https://github.com/ismamz/next-transition-router)
- **Styling**: Vanilla CSS (Zero-utility bloat)

## 🚀 Getting Started

1. **Clone the repo**:
   ```bash
   git clone https://github.com/alihahamed/crayon-svg-transition.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

## 🎨 Configuration

You can easily customize the transition colors and timings in `src/app/globals.css`:

```css
:root {
  --transition-stroke-1: #FF2D87; /* Neon Pink */
  --transition-stroke-2: #AAFF00; /* Neon Green */
  --transition-stroke-3: #0066FF; /* Electric Blue */
}
```

And adjust the stagger timing in `src/providers/TransitionProvider.jsx`:
```javascript
tl.to(path, { ... }, index * 0.1); // Adjust the multiplier for more/less overlap
```

## 📜 License
MIT
