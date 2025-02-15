import { useCallback } from "react";

// 画像をモザイク化
export const useMosaicImage = () => {
  return useCallback((img: HTMLImageElement, levels: number) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imgData.data;

    const blockSize = levels;
    for (let y = 0; y < img.height; y += blockSize) {
      for (let x = 0; x < img.width; x += blockSize) {
        let r = 0;
        let g = 0;
        let b = 0;
        for (let py = 0; py < blockSize; py++) {
          for (let px = 0; px < blockSize; px++) {
            const index = (y + py) * img.width * 4 + (x + px) * 4;
            r += data[index];
            g += data[index + 1];
            b += data[index + 2];
          }
        }
        r /= blockSize * blockSize;
        g /= blockSize * blockSize;
        b /= blockSize * blockSize;

        for (let py = 0; py < blockSize; py++) {
          for (let px = 0; px < blockSize; px++) {
            const index = (y + py) * img.width * 4 + (x + px) * 4;
            data[index] = r;
            data[index + 1] = g;
            data[index + 2] = b;
            data[index + 3] = 255;
          }
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL();
  }, []);
};
