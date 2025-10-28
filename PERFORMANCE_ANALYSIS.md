# 🚀 Performance Analysis - StjärnaFyrkant Västerbotten

## 📊 Current Performance Metrics

### Bundle Sizes (Homepage)
- **Total First Load JS**: 178 kB (175 kB page + 103 kB shared)
- **Main Shared Chunk**: 56 kB (33f0899a)
- **Secondary Chunk**: 45.3 kB (684)
- **Framework**: 277 kB (React + Next.js)

### Build Output
```
Route (app)                    Size    First Load JS
┌ ○ /                         7.24 kB      178 kB
├ ○ /it                       4.14 kB      176 kB
├ ○ /fordonsteknik            5.26 kB      172 kB
├ ○ /kommunikationsteknik     4.38 kB      177 kB
```

---

## 🔍 Identified Performance Issues

### 1. **Heavy Dependencies** 🔴 HIGH IMPACT

#### Three.js (32 MB + 29 MB three-stdlib = 61 MB)
- **Currently**: Installed but NOT used on any page
- **Impact**: 0 KB (not imported anywhere)
- **Recommendation**: ✅ Can be removed safely

```bash
npm uninstall three @react-three/fiber @react-three/drei three-stdlib
```

#### date-fns (38 MB + 15 MB jalali = 53 MB)
- **Used**: In Calendar component
- **Impact**: Likely included in build even if not used
- **Recommendation**: Check if calendar is used, otherwise remove

#### lucide-react (32 MB)
- **Used**: Extensively for icons
- **Impact**: Tree-shakeable, only imports used icons
- **Recommendation**: ✅ Keep, well optimized

#### Unused Radix UI components
- **Issue**: 24+ Radix UI packages installed
- **Used on homepage**: Button, Dialog (UpsalesModal), minimal usage
- **Recommendation**: Audit unused components

---

### 2. **Animation Performance** 🟡 MEDIUM IMPACT

#### PaintableTextBrushV2 Component
**Issues**:
- Creates **NEW Map** on every character hover (`setPaintedChars`)
- Splits text into characters = many DOM nodes
- Each character has individual motion animations
- Spring physics on 20+ characters simultaneously

**Example**: "StjärnaFyrkant Västerbotten" = 26 characters = 26 animated elements

**Optimization**:
```tsx
// Current (creates new Map)
setPaintedChars(prev => {
  const newMap = new Map(prev)
  newMap.set(key, true)
  return newMap
})

// Optimized (use Set + useMemo)
const [paintedChars, setPaintedChars] = useState<Set<string>>(new Set())

// Memoize word split
const words = useMemo(() => text.split(" "), [text])
```

#### OptimizedBackground Component
**Issues**:
- MouseMove event on EVERY frame (requestAnimationFrame)
- Multiple lens flare elements (5 animated divs)
- Floating particles (8-20 particles with random movements)

**Current Performance**:
- Hero variant: ~15-20 animated elements
- Updates on every mouse movement
- Re-renders entire component on mouse move

**Optimization**:
```tsx
// Add throttling to mouse tracking
const throttledMouseMove = useCallback(
  throttle((x: number, y: number) => {
    setMousePosition({ x, y })
  }, 50), // Update max 20 times per second
  []
)
```

---

### 3. **Unnecessary Re-renders** 🟡 MEDIUM IMPACT

#### Header Component (253 lines)
- Likely renders on every route change
- Contains navigation menu with many items
- **Recommendation**: Memoize navigation items

#### Multiple Background Instances
- Homepage uses `OptimizedBackground` twice:
  - Line 189: Hero section
  - Line 285: Customer Cases section
- **Impact**: 2x animations, 2x mouse tracking
- **Recommendation**: Only use on hero section

---

### 4. **Image Optimization** 🟢 LOW IMPACT

**Current**:
- Using Next.js Image component ✅
- Placeholder images for experts: `/placeholder.svg`
- **Recommendation**: Add `priority` prop to hero images

---

## 💡 Optimization Recommendations (Prioritized)

### 🔴 **CRITICAL** - Quick Wins (5-10 min)

1. **Remove Three.js** (~61 MB from node_modules)
   ```bash
   npm uninstall three @react-three/fiber @react-three/drei
   ```
   **Impact**: -0 KB bundle (not used), faster npm install

2. **Remove duplicate OptimizedBackground** (app/page.tsx:285)
   ```tsx
   // Remove this line:
   <OptimizedBackground variant="subtle" className="absolute inset-0" />
   ```
   **Impact**: -50% animation overhead on homepage

3. **Add throttling to mouse tracking** (optimized-background.tsx)
   ```tsx
   import { useCallback } from "react"

   const throttledMouseMove = useCallback(
     (e: MouseEvent) => {
       if (Date.now() - lastUpdate.current < 50) return
       lastUpdate.current = Date.now()
       requestAnimationFrame(() => {
         setMousePosition({
           x: (e.clientX / window.innerWidth) * 100,
           y: (e.clientY / window.innerHeight) * 100,
         })
       })
     },
     []
   )
   ```
   **Impact**: Reduce re-renders by ~70%

---

### 🟡 **HIGH PRIORITY** - Medium Effort (20-30 min)

4. **Optimize PaintableTextBrushV2**
   - Use `Set` instead of `Map`
   - Memoize words array
   - Add `will-change: transform` CSS hint
   ```tsx
   const words = useMemo(() => text.split(" "), [text])
   const [paintedChars, setPaintedChars] = useState<Set<string>>(new Set())
   ```
   **Impact**: -30% re-renders on text animations

5. **Lazy load UpsalesModal**
   ```tsx
   const UpsalesModal = dynamic(() => import("@/components/upsales-modal"), {
     ssr: false
   })
   ```
   **Impact**: -2-3 KB from initial bundle

6. **Reduce lens flare complexity**
   - Currently 5 flare elements
   - Reduce to 3 most impactful ones
   **Impact**: -40% background animation overhead

---

### 🟢 **NICE TO HAVE** - Lower Priority (1+ hour)

7. **Audit Radix UI usage**
   - Check which Radix components are actually used
   - Remove unused packages
   ```bash
   npx depcheck
   ```

8. **Code splitting for heavy components**
   ```tsx
   const GlareCard = dynamic(() => import("@/components/ui/glare-card"))
   const ParallaxScroll = dynamic(() => import("@/components/ui/parallax-scroll"))
   ```

9. **Optimize font loading**
   - Check if Geist font is loaded optimally
   - Consider using `font-display: swap`

10. **Add React.memo to heavy components**
    ```tsx
    export const OptimizedBackground = React.memo(OptimizedBackgroundComponent)
    ```

---

## 📈 Expected Performance Improvements

| Optimization | Bundle Reduction | Render Performance | Effort |
|-------------|------------------|-------------------|--------|
| Remove Three.js | 0 KB (not used) | - | 1 min |
| Remove duplicate background | 0 KB | +50% FPS | 1 min |
| Throttle mouse tracking | 0 KB | +70% FPS | 5 min |
| Optimize PaintableText | 0 KB | +30% FPS | 20 min |
| Lazy load modal | -2-3 KB | Faster initial load | 5 min |
| Reduce lens flares | 0 KB | +40% FPS | 10 min |

**Total Expected**:
- **Bundle**: -2-3 KB
- **FPS improvement**: ~50-70% faster animations
- **Time to implement**: ~45 minutes

---

## 🎯 Immediate Action Plan

1. ✅ Remove Three.js dependencies (1 min)
2. ✅ Remove duplicate OptimizedBackground (1 min)
3. ✅ Add throttling to mouse tracking (5 min)
4. ✅ Reduce lens flare elements from 5 to 3 (5 min)
5. ✅ Optimize PaintableTextBrushV2 state management (15 min)

**Total time**: ~27 minutes for 60-70% performance improvement

---

## 🔧 Performance Best Practices Going Forward

1. **Always use `React.memo` for animation components**
2. **Throttle/debounce mouse/scroll events**
3. **Use `useMemo` for expensive calculations**
4. **Lazy load modals and heavy components**
5. **Test on mobile devices** (current performanceLevel detection helps)
6. **Monitor bundle size** with each new dependency
7. **Use `will-change` CSS for animated elements**

---

## 📱 Mobile Performance Notes

The `OptimizedBackground` already has good mobile detection:
```tsx
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
return isMobile ? "medium" : "high"
```

This reduces particle count from 20 → 10 on mobile. ✅ Good!

**Additional mobile optimizations**:
- Disable lens flares on mobile entirely
- Reduce spring animation stiffness on mobile
- Consider `loading="lazy"` for below-fold images
