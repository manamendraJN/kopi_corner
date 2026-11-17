# Photos

Drop real photos here (keep each under ~2000px wide and ~500 KB).

Then pass them to a `PhotoSlot` as `src`, for example in `src/components/ProofScene.astro`:

```astro
import beans from '../assets/photos/beans.jpg';
<PhotoSlot label="Freshly roasted beans" src={beans} alt="Freshly roasted beans in a scoop" />
```

Astro's built-in `<Image>` resizes and compresses them at build time.
