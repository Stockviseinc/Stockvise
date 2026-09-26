# One-off: remaps the old sage/cream palette onto the Stockroom palette.
import colorsys, re, sys

INK = (0x17, 0x18, 0x1C)

def parse(h):
    h = h[1:]
    if len(h) in (3, 4): h = ''.join(c * 2 for c in h)
    rgb = tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))
    return rgb, h[6:8]

def fmt(rgb, a=''):
    return '#' + ''.join(f'{max(0, min(255, round(c))):02x}' for c in rgb) + a

def remap(hexcolor, text=False):
    rgb, a = parse(hexcolor)
    if rgb in ((255, 255, 255), (0, 0, 0)): return hexcolor
    h, l, s = colorsys.rgb_to_hls(*(c / 255 for c in rgb))
    deg = h * 360
    if not (65 <= deg <= 165):          # browns, clays, golds: product illustrations stay
        return hexcolor
    if s > 0.28 and l > 0.3:            # green accents -> racking blue family
        if l > 0.86: out = (0xE6, 0xEB, 0xF8)
        elif l > 0.72: out = (0xC4, 0xD0, 0xF2)
        elif l > 0.55: out = (0x7F, 0x97, 0xDE)
        else: out = (0x1F, 0x46, 0xC4)
        return fmt(out, a)
    if l < 0.3:                          # forest greens -> ink
        return fmt(INK, a)
    if text and 0.3 <= l <= 0.7:         # mid-tone text -> readable grey
        l = min(l, 0.4)
    r, g, b = colorsys.hls_to_rgb(45 / 360, l, 0.05)   # warm-neutral concrete
    return fmt((r * 255, g * 255, b * 255), a)

def process(css):
    def decl(m):
        prop, val = m.group(1), m.group(2)
        is_text = prop.strip().lower() == 'color'
        val = re.sub(r'#[0-9a-fA-F]{3,8}\b', lambda c: remap(c.group(0), is_text), val)
        if prop.strip().lower() == 'border-radius':
            val = re.sub(r'\b(\d+(?:\.\d+)?)px\b', lambda n: '3px' if float(n.group(1)) > 4 else n.group(0), val)
        return f'{prop}:{val}'
    return re.sub(r'([a-zA-Z-]+)\s*:\s*([^;{}]+)', decl, css)

for path in sys.argv[1:]:
    src = open(path, encoding='utf-8').read()
    open(path, 'w', encoding='utf-8').write(process(src))
    print('remapped', path)
