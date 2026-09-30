import fs from 'fs';
import zlib from 'zlib';

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    const byte = buf[i];
    crc ^= byte;
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crcVal = crc32(body);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crcVal, 0);
  return Buffer.concat([len, body, crcBuf]);
}

function createPng(width, height, getPixel) {
  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Raw image data with 0 filter byte per row
  const rowLen = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowLen);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowLen;
    rawData[rowOffset] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const [r, g, b, a] = getPixel(x, y, width, height);
      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

// Generate stylized Zaitoon Roots Academy Icon
// Maroon background (#8B0000 to #550000 gradient), Gold border, Graduation Cap & Laurel
function renderZraIcon(x, y, w, h, isMaskable = false) {
  // Normalize to 0..1
  const nx = x / w;
  const ny = y / h;

  // Safe margin if maskable: maskable icons have content in central 80% circle
  const cx = 0.5;
  const cy = 0.5;
  const dist = Math.hypot(nx - cx, ny - cy);

  // Background gradient: Rich Crimson to Deep Maroon
  const bgR = Math.round(139 - (ny * 54)); // 139 -> 85
  const bgG = 0;
  const bgB = 0;

  if (isMaskable) {
    // Bleed background extends to edges
    // Inner emblem centered in radius <= 0.38
    const rFromCenter = Math.hypot(nx - 0.5, ny - 0.5);
    // Draw gold ring
    if (Math.abs(rFromCenter - 0.38) < 0.015) {
      return [245, 158, 11, 255]; // Gold #F59E0B
    }
    if (Math.abs(rFromCenter - 0.36) < 0.008) {
      return [252, 211, 77, 255]; // Light gold
    }

    // Inside central circle
    // Graduation cap diamond shape
    const capX = nx - 0.5;
    const capY = ny - 0.44;
    // Diamond |capX| / 0.28 + |capY| / 0.12 <= 1
    if (Math.abs(capX) / 0.25 + Math.abs(capY) / 0.11 <= 1) {
      // Top cap surface
      const goldGrad = 0.5 + capY * 2;
      return [252, 211, 77, 255];
    }
    // Cap headband
    if (Math.abs(capX) <= 0.14 && ny >= 0.44 && ny <= 0.52) {
      return [254, 240, 138, 255];
    }
    // Tassel
    if (capX >= 0.18 && capX <= 0.22 && ny >= 0.44 && ny <= 0.58) {
      return [245, 158, 11, 255];
    }

    // Wreath / arc under cap
    const arcDist = Math.hypot(nx - 0.5, ny - 0.52);
    if (arcDist >= 0.20 && arcDist <= 0.24 && ny >= 0.56 && ny <= 0.72) {
      return [245, 158, 11, 255];
    }

    // Default maroon background
    return [bgR, bgG, bgB, 255];
  } else {
    // Rounded rect boundary
    const cornerRadius = 0.22;
    // Check if within rounded rect
    const qx = Math.abs(nx - 0.5) - (0.5 - cornerRadius);
    const qy = Math.abs(ny - 0.5) - (0.5 - cornerRadius);
    const outsideDist = Math.hypot(Math.max(qx, 0), Math.max(qy, 0));
    if (outsideDist > cornerRadius) {
      return [0, 0, 0, 0]; // Transparent outer corners for standalone icons
    }

    // Gold outer border
    const borderDist = cornerRadius - outsideDist;
    if (qx > 0 || qy > 0) {
      if (outsideDist >= cornerRadius - 0.025) {
        return [245, 158, 11, 255];
      }
    } else {
      if (nx <= 0.025 || nx >= 0.975 || ny <= 0.025 || ny >= 0.975) {
        return [245, 158, 11, 255];
      }
    }

    // Graduation cap diamond shape
    const capX = nx - 0.5;
    const capY = ny - 0.42;
    if (Math.abs(capX) / 0.32 + Math.abs(capY) / 0.14 <= 1) {
      return [252, 211, 77, 255]; // Gold cap
    }
    // Cap headband
    if (Math.abs(capX) <= 0.18 && ny >= 0.42 && ny <= 0.52) {
      return [254, 240, 138, 255];
    }
    // Tassel
    if (capX >= 0.23 && capX <= 0.27 && ny >= 0.42 && ny <= 0.60) {
      return [245, 158, 11, 255];
    }

    // Wreath / arc under cap
    const arcDist = Math.hypot(nx - 0.5, ny - 0.52);
    if (arcDist >= 0.25 && arcDist <= 0.30 && ny >= 0.56 && ny <= 0.76) {
      return [245, 158, 11, 255];
    }

    return [bgR, bgG, bgB, 255];
  }
}

// Generate the files
console.log('Generating PWA icons...');

const pwa192 = createPng(192, 192, (x, y, w, h) => renderZraIcon(x, y, w, h, false));
fs.writeFileSync('public/pwa-192x192.png', pwa192);
console.log('Created public/pwa-192x192.png');

const pwa512 = createPng(512, 512, (x, y, w, h) => renderZraIcon(x, y, w, h, false));
fs.writeFileSync('public/pwa-512x512.png', pwa512);
console.log('Created public/pwa-512x512.png');

const pwaMaskable512 = createPng(512, 512, (x, y, w, h) => renderZraIcon(x, y, w, h, true));
fs.writeFileSync('public/pwa-maskable-512x512.png', pwaMaskable512);
console.log('Created public/pwa-maskable-512x512.png');

const appleTouch = createPng(180, 180, (x, y, w, h) => renderZraIcon(x, y, w, h, false));
fs.writeFileSync('public/apple-touch-icon.png', appleTouch);
console.log('Created public/apple-touch-icon.png');

console.log('All PWA icons generated successfully.');
