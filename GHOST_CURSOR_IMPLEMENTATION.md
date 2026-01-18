# Ghost Cursor Implementation

## Overview
This implementation creates a ghost cursor effect with text overlay, similar to the ReactBits example but customized with the text "Unlock savings only students know about".

## Components Used

### GhostCursor Component
- **Location**: `client/src/components/GhostCursor.jsx`
- **Purpose**: Creates a Three.js-based animated cursor effect that follows mouse movement
- **Features**:
  - Smoky, ethereal visual effect
  - Customizable colors, brightness, and bloom effects
  - Trail animation that follows cursor movement
  - Fade-out behavior when cursor is inactive

### Implementation in Home.jsx
- **Location**: `client/src/pages/Home.jsx`
- **Structure**:
  ```jsx
  <div className="ghost-cursor-section relative h-screen flex items-center justify-center overflow-hidden">
    <GhostCursor {...props} className="absolute inset-0" />
    <div className="relative z-20 text-center pointer-events-none px-4">
      <h2 className="ghost-text">Unlock savings only</h2>
      <h2 className="ghost-text-highlight">students know about</h2>
    </div>
  </div>
  ```

### Styling
- **Location**: `client/src/styles/ghost-cursor.css`
- **Features**:
  - Gradient background with subtle radial effects
  - Glowing text animations
  - Responsive text sizing
  - CSS animations for enhanced visual appeal

## Configuration

### GhostCursor Props
```jsx
{
  color: "#00f0ff",           // Cyan color matching brand
  brightness: 1.5,            // Enhanced brightness for visibility
  bloomStrength: 0.2,         // Increased bloom for dramatic effect
  trailLength: 50,            // Length of cursor trail
  inertia: 0.5,              // Smoothness of movement
  fadeDelayMs: 1000,         // Delay before fade starts
  fadeDurationMs: 1500       // Duration of fade animation
}
```

## How It Works

1. **Container Setup**: A full-screen container with dark background
2. **Ghost Effect**: The GhostCursor component renders a Three.js scene with shader effects
3. **Text Overlay**: Text is positioned above the cursor effect with CSS animations
4. **Mouse Interaction**: The ghost effect follows mouse movement within the container
5. **Visual Enhancement**: CSS provides additional glow effects and animations

## Customization Options

- **Text Content**: Modify the text in the `<h2>` elements
- **Colors**: Change the `color` prop and CSS color values
- **Animation Speed**: Adjust `fadeDelayMs` and `fadeDurationMs`
- **Visual Intensity**: Modify `brightness`, `bloomStrength`, and `grainIntensity`
- **Responsiveness**: Update CSS media queries for different screen sizes

## Browser Compatibility
- Requires WebGL support for Three.js rendering
- Optimized for both desktop and mobile devices
- Automatic performance scaling based on device capabilities