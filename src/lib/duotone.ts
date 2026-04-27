export type RGB = [number, number, number];

export type DuotonePair = {
  label: string;
  dark: RGB;
  light: RGB;
};

// Screen-print style colour pairs. Dark is mapped to image shadows, light to highlights.
export const DUOTONES: DuotonePair[] = [
  { label: "Pink / Yellow", dark: [217, 47, 124], light: [255, 222, 89] },
  { label: "Cyan / Orange", dark: [29, 155, 200], light: [255, 138, 56] },
  { label: "Red / Black", dark: [13, 13, 13], light: [255, 70, 56] },
  { label: "Green / Pink", dark: [42, 158, 110], light: [255, 138, 188] },
  { label: "Purple / Yellow", dark: [108, 56, 200], light: [255, 226, 70] },
  { label: "Blue / Red", dark: [22, 60, 200], light: [255, 70, 56] },
  { label: "Black / White", dark: [13, 13, 13], light: [244, 244, 240] },
  { label: "Magenta / Cyan", dark: [200, 40, 168], light: [70, 222, 220] },
  { label: "Orange / Teal", dark: [22, 110, 115], light: [240, 110, 40] },
  { label: "Yellow / Black", dark: [13, 13, 13], light: [255, 218, 41] },
];

export type DuotoneVariant = { url: string; label: string };

/**
 * Generate one duotone JPEG per DuotonePair from a loaded HTMLImageElement.
 * Image is downscaled so the longest side is `maxDim`.
 */
export async function generateDuotones(
  image: HTMLImageElement,
  maxDim = 800
): Promise<DuotoneVariant[]> {
  const naturalW = image.naturalWidth || image.width;
  const naturalH = image.naturalHeight || image.height;
  if (!naturalW || !naturalH) return [];

  const ratio = Math.min(1, maxDim / Math.max(naturalW, naturalH));
  const w = Math.max(1, Math.round(naturalW * ratio));
  const h = Math.max(1, Math.round(naturalH * ratio));

  const baseCanvas = document.createElement("canvas");
  baseCanvas.width = w;
  baseCanvas.height = h;
  const baseCtx = baseCanvas.getContext("2d", { willReadFrequently: true });
  if (!baseCtx) return [];
  baseCtx.drawImage(image, 0, 0, w, h);

  let base: ImageData;
  try {
    base = baseCtx.getImageData(0, 0, w, h);
  } catch {
    return [];
  }

  // Pre-compute luminance once
  const lum = new Float32Array(w * h);
  for (let i = 0; i < lum.length; i++) {
    const r = base.data[i * 4];
    const g = base.data[i * 4 + 1];
    const b = base.data[i * 4 + 2];
    // Rec.601 luma, scaled to 0..1
    lum[i] = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }

  const variants: DuotoneVariant[] = [];

  for (const dt of DUOTONES) {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) continue;

    const img = ctx.createImageData(w, h);
    for (let i = 0; i < lum.length; i++) {
      const t = lum[i];
      const inv = 1 - t;
      img.data[i * 4] = dt.light[0] * t + dt.dark[0] * inv;
      img.data[i * 4 + 1] = dt.light[1] * t + dt.dark[1] * inv;
      img.data[i * 4 + 2] = dt.light[2] * t + dt.dark[2] * inv;
      img.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);

    variants.push({
      url: canvas.toDataURL("image/jpeg", 0.85),
      label: dt.label,
    });
  }

  return variants;
}
