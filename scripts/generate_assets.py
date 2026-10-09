import os
import json
import struct
import math
from PIL import Image, ImageDraw, ImageFont

os.makedirs('public/projects', exist_ok=True)
os.makedirs('public/models', exist_ok=True)

# Helper to create nice dark blueish UI mockup images
def create_project_mockup(filename, title, subtitle, tags, stat_boxes, accent_color="#00D2FF", theme_bg="#08101E"):
    width, height = 1200, 750
    im = Image.new("RGBA", (width, height), (8, 16, 30, 255))
    draw = ImageDraw.Draw(im)

    # Gradient background simulation
    for y in range(height):
        ratio = y / height
        r = int(6 + 10 * ratio)
        g = int(12 + 15 * ratio)
        b = int(24 + 30 * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))

    # Grid lines (futuristic blueprint)
    for x in range(0, width, 50):
        draw.line([(x, 0), (x, height)], fill=(14, 30, 54, 120), width=1)
    for y in range(0, height, 50):
        draw.line([(0, y), (width, y)], fill=(14, 30, 54, 120), width=1)

    # Window / Glass frame
    card_margin = 40
    draw.rounded_rectangle(
        [card_margin, card_margin, width - card_margin, height - card_margin],
        radius=20,
        fill=(11, 22, 42, 235),
        outline=(30, 70, 130, 255),
        width=2
    )

    # Top title bar
    draw.rounded_rectangle(
        [card_margin, card_margin, width - card_margin, card_margin + 60],
        radius=20,
        fill=(15, 29, 56, 255)
    )
    # Window action buttons
    draw.ellipse([card_margin + 24, card_margin + 24, card_margin + 38, card_margin + 38], fill=(239, 68, 68, 255))
    draw.ellipse([card_margin + 48, card_margin + 24, card_margin + 62, card_margin + 38], fill=(245, 158, 11, 255))
    draw.ellipse([card_margin + 72, card_margin + 24, card_margin + 86, card_margin + 38], fill=(16, 185, 129, 255))

    # URL / Title in header
    draw.text((card_margin + 120, card_margin + 20), f"melston://projects/{title.lower()}", fill=(100, 140, 190, 255))

    # Project title & Subtitle
    draw.text((card_margin + 40, card_margin + 90), title, fill=(255, 255, 255, 255))
    draw.text((card_margin + 40, card_margin + 130), subtitle, fill=(56, 189, 248, 255))

    # Badges / Tech tags
    bx = card_margin + 40
    by = card_margin + 170
    for tag in tags:
        tw = len(tag) * 11 + 24
        draw.rounded_rectangle([bx, by, bx + tw, by + 30], radius=8, fill=(16, 37, 72, 255), outline=(56, 189, 248, 180), width=1)
        draw.text((bx + 12, by + 6), tag, fill=(186, 230, 253, 255))
        bx += tw + 12

    # Stat / metric boxes
    sx = card_margin + 40
    sy = card_margin + 230
    box_w = 240
    for label, val in stat_boxes:
        draw.rounded_rectangle([sx, sy, sx + box_w, sy + 100], radius=14, fill=(14, 30, 58, 240), outline=(38, 90, 160, 200), width=1)
        draw.text((sx + 18, sy + 18), label, fill=(148, 163, 184, 255))
        draw.text((sx + 18, sy + 48), val, fill=(0, 210, 255, 255))
        sx += box_w + 24

    # Main Chart / Visualization Canvas Area
    cx = card_margin + 40
    cy = card_margin + 360
    cw = width - card_margin * 2 - 80
    ch = 260
    draw.rounded_rectangle([cx, cy, cx + cw, cy + ch], radius=16, fill=(12, 25, 48, 255), outline=(30, 70, 130, 200), width=1)
    draw.text((cx + 24, cy + 20), "SYSTEM VISUALIZATION & ANALYTICS", fill=(100, 140, 200, 255))

    # Draw simulated graph line & area
    points = []
    num_pts = 14
    for i in range(num_pts):
        px = cx + 40 + i * ((cw - 80) / (num_pts - 1))
        # wave
        py = cy + 180 - math.sin(i * 0.7) * 50 - math.cos(i * 1.2) * 35
        points.append((px, py))

    # Glow line
    for offset in range(3, 0, -1):
        draw.line(points, fill=(0, 180, 255, 60 * (4 - offset)), width=offset * 2)
    draw.line(points, fill=(0, 220, 255, 255), width=3)

    for pt in points:
        draw.ellipse([pt[0] - 5, pt[1] - 5, pt[0] + 5, pt[1] + 5], fill=(255, 255, 255, 255), outline=(0, 210, 255, 255), width=2)

    im.convert("RGB").save(filename, "PNG")
    print(f"Generated {filename}")

# Generate project mockups
create_project_mockup(
    "public/projects/obsera-health.png",
    "Obsera-Health",
    "Maternal Health Risk Prediction System (Public Health Decision Support)",
    ["Python", "Streamlit", "Pandas", "Scikit-Learn", "Risk Indicators"],
    [("Risk Accuracy", "94.8%"), ("Indicators Analyzed", "12+ Health Metrics"), ("Jurisdictions", "District & State")]
)

create_project_mockup(
    "public/projects/expenseflow.png",
    "ExpenseFlow",
    "Full-Stack Expense Tracker & Financial Analytics Engine",
    ["Python", "Flask", "SQLAlchemy", "SQLite", "JavaScript", "Render"],
    [("Data Pipeline", "Instant CSV Export"), ("Category Filter", "Multi-Select"), ("Deployment", "Render Cloud")]
)

create_project_mockup(
    "public/projects/resume-screening.png",
    "Resume-Screening",
    "NLP-Based Automated Resume Screening & Skill Extraction",
    ["Python", "FastAPI", "spaCy", "scikit-learn", "PyPDF2", "python-docx"],
    [("Skill Extraction", "spaCy NLP Engine"), ("Matching Model", "Cosine Similarity"), ("Parsing", "PDF & DOCX")]
)

# Generate a professional PDF resume placeholder
def create_pdf_resume(filepath):
    # Minimal valid PDF writer
    content = """%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 720 >>
stream
BT
/F1 20 Tf
50 740 Td
(MELSTON JAISEL SEQUEIRA) Tj
/F1 11 Tf
0 -24 Td
(Data Engineer | Machine Learning | Software Engineer | Full Stack Developer) Tj
0 -18 Td
(Bengaluru, Karnataka | melstonjaiselsequeira@gmail.com | +91-7337764722) Tj
0 -30 Td
(EDUCATION) Tj
0 -16 Td
(Master of Computer Applications - PES University | CGPA: 7.50/10.0 (09/2025 - Present)) Tj
0 -16 Td
(Bachelor of Computer Applications - St. Aloysius College | CGPA: 7.50/10.0 (08/2022 - 05/2025)) Tj
0 -30 Td
(PROJECTS) Tj
0 -16 Td
(Obsera-Health: Maternal Health Risk Prediction (Python, Streamlit, Pandas)) Tj
0 -16 Td
(ExpenseFlow: Expense Tracker (Flask, SQLite, SQLAlchemy, HTML, CSS, JS)) Tj
0 -16 Td
(Resume-Screening: NLP Resume Parser (FastAPI, spaCy, scikit-learn, SQLite)) Tj
0 -30 Td
(TECHNICAL SKILLS) Tj
0 -16 Td
(Python, JavaScript, C, SQL, Kafka, PyFlink, Node.js, Express, FastAPI, React.js) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000224 00000 n 
0000001015 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
1104
%%EOF
"""
    with open(filepath, "w", encoding="latin-1") as f:
        f.write(content)
    print(f"Generated {filepath}")

create_pdf_resume("public/Melston_Jaisel_Sequeira_Resume.pdf")

# Generate a valid rigged GLB model with nodes:
# Root -> Spine -> Neck -> Head
def create_avatar_glb(filepath):
    # A complete valid glTF 2.0 binary container (.glb) with:
    # Nodes:
    # 0: Root
    # 1: Spine (child of Root)
    # 2: Neck (child of Spine)
    # 3: Head (child of Neck)
    # 4: TorsoMesh (child of Spine)
    # 5: HeadMesh (child of Head)
    # 6: VisorMesh (child of Head)
    
    # Let's create box/cube geometries for the meshes
    # Box vertices (positions, normals, indices)
    def make_box(sx, sy, sz, ox, oy, oz):
        # 8 corners
        x0, x1 = ox - sx/2, ox + sx/2
        y0, y1 = oy - sy/2, oy + sy/2
        z0, z1 = oz - sz/2, oz + sz/2
        
        # 6 faces * 4 vertices = 24 vertices
        pos = []
        norm = []
        indices = []
        
        faces = [
            # front (+z)
            ([ (x0,y0,z1), (x1,y0,z1), (x1,y1,z1), (x0,y1,z1) ], (0, 0, 1)),
            # back (-z)
            ([ (x1,y0,z0), (x0,y0,z0), (x0,y1,z0), (x1,y1,z0) ], (0, 0, -1)),
            # top (+y)
            ([ (x0,y1,z1), (x1,y1,z1), (x1,y1,z0), (x0,y1,z0) ], (0, 1, 0)),
            # bottom (-y)
            ([ (x0,y0,z0), (x1,y0,z0), (x1,y0,z1), (x0,y0,z1) ], (0, -1, 0)),
            # right (+x)
            ([ (x1,y0,z1), (x1,y0,z0), (x1,y1,z0), (x1,y1,z1) ], (1, 0, 0)),
            # left (-x)
            ([ (x0,y0,z0), (x0,y0,z1), (x0,y1,z1), (x0,y1,z0) ], (-1, 0, 0)),
        ]
        
        idx_offset = 0
        for quad, n in faces:
            for v in quad:
                pos.extend(v)
                norm.extend(n)
            indices.extend([idx_offset, idx_offset + 1, idx_offset + 2, idx_offset, idx_offset + 2, idx_offset + 3])
            idx_offset += 4
            
        return pos, norm, indices

    # 1. Torso geometry (centered around y=0.4)
    t_pos, t_norm, t_idx = make_box(0.7, 0.9, 0.45, 0.0, 0.45, 0.0)
    # 2. Neck geometry (centered around y=0.1)
    n_pos, n_norm, n_idx = make_box(0.2, 0.25, 0.2, 0.0, 0.12, 0.0)
    # 3. Head geometry (centered around y=0.3)
    h_pos, h_norm, h_idx = make_box(0.48, 0.52, 0.46, 0.0, 0.26, 0.0)
    # 4. Futuristic cyber visor (attached to head, protruding forward)
    v_pos, v_norm, v_idx = make_box(0.52, 0.16, 0.15, 0.0, 0.28, 0.25)
    
    # Pack buffer:
    # We will assemble meshes:
    # Mesh 0: Torso (t_pos, t_norm, t_idx)
    # Mesh 1: Head & Visor (can have 2 primitives: Head + Visor)
    
    def pack_floats(arr):
        return struct.pack(f'<{len(arr)}f', *arr)
    
    def pack_ushorts(arr):
        return struct.pack(f'<{len(arr)}H', *arr)

    buf = bytearray()
    
    def add_to_buf(data):
        offset = len(buf)
        buf.extend(data)
        # 4-byte align
        while len(buf) % 4 != 0:
            buf.append(0)
        return offset, len(data)

    # Torso
    t_pos_bytes = pack_floats(t_pos)
    t_norm_bytes = pack_floats(t_norm)
    t_idx_bytes = pack_ushorts(t_idx)
    t_pos_off, t_pos_len = add_to_buf(t_pos_bytes)
    t_norm_off, t_norm_len = add_to_buf(t_norm_bytes)
    t_idx_off, t_idx_len = add_to_buf(t_idx_bytes)
    
    # Head
    h_pos_bytes = pack_floats(h_pos)
    h_norm_bytes = pack_floats(h_norm)
    h_idx_bytes = pack_ushorts(h_idx)
    h_pos_off, h_pos_len = add_to_buf(h_pos_bytes)
    h_norm_off, h_norm_len = add_to_buf(h_norm_bytes)
    h_idx_off, h_idx_len = add_to_buf(h_idx_bytes)
    
    # Visor
    v_pos_bytes = pack_floats(v_pos)
    v_norm_bytes = pack_floats(v_norm)
    v_idx_bytes = pack_ushorts(v_idx)
    v_pos_off, v_pos_len = add_to_buf(v_pos_bytes)
    v_norm_off, v_norm_len = add_to_buf(v_norm_bytes)
    v_idx_off, v_idx_len = add_to_buf(v_idx_bytes)

    # Build GLTF json
    gltf = {
        "asset": {
            "version": "2.0",
            "generator": "Melston3DGenerator"
        },
        "scene": 0,
        "scenes": [{ "nodes": [0] }],
        "nodes": [
            { "name": "Root", "children": [1], "translation": [0, -0.6, 0] },
            { "name": "Spine", "children": [2, 4] },
            { "name": "Neck", "children": [3], "translation": [0, 0.9, 0] },
            { "name": "Head", "children": [5, 6], "translation": [0, 0.25, 0] },
            { "name": "TorsoMesh", "mesh": 0 },
            { "name": "HeadMesh", "mesh": 1 },
            { "name": "VisorMesh", "mesh": 2 }
        ],
        "materials": [
            {
                "name": "CyberDarkBlueArmor",
                "pbrMetallicRoughness": {
                    "baseColorFactor": [0.06, 0.14, 0.28, 1.0],
                    "metallicFactor": 0.85,
                    "roughnessFactor": 0.25
                }
            },
            {
                "name": "CyberCyanGlowingVisor",
                "pbrMetallicRoughness": {
                    "baseColorFactor": [0.0, 0.85, 1.0, 1.0],
                    "metallicFactor": 0.1,
                    "roughnessFactor": 0.1
                },
                "emissiveFactor": [0.0, 0.82, 1.0]
            }
        ],
        "meshes": [
            {
                "name": "Torso",
                "primitives": [{
                    "attributes": { "POSITION": 0, "NORMAL": 1 },
                    "indices": 2,
                    "material": 0
                }]
            },
            {
                "name": "Head",
                "primitives": [{
                    "attributes": { "POSITION": 3, "NORMAL": 4 },
                    "indices": 5,
                    "material": 0
                }]
            },
            {
                "name": "Visor",
                "primitives": [{
                    "attributes": { "POSITION": 6, "NORMAL": 7 },
                    "indices": 8,
                    "material": 1
                }]
            }
        ],
        "accessors": [
            # 0: Torso Pos
            { "bufferView": 0, "componentType": 5126, "count": len(t_pos)//3, "type": "VEC3", "max": [0.35, 0.9, 0.225], "min": [-0.35, 0.0, -0.225] },
            # 1: Torso Norm
            { "bufferView": 1, "componentType": 5126, "count": len(t_norm)//3, "type": "VEC3" },
            # 2: Torso Idx
            { "bufferView": 2, "componentType": 5123, "count": len(t_idx), "type": "SCALAR" },
            
            # 3: Head Pos
            { "bufferView": 3, "componentType": 5126, "count": len(h_pos)//3, "type": "VEC3", "max": [0.24, 0.52, 0.23], "min": [-0.24, 0.0, -0.23] },
            # 4: Head Norm
            { "bufferView": 4, "componentType": 5126, "count": len(h_norm)//3, "type": "VEC3" },
            # 5: Head Idx
            { "bufferView": 5, "componentType": 5123, "count": len(h_idx), "type": "SCALAR" },
            
            # 6: Visor Pos
            { "bufferView": 6, "componentType": 5126, "count": len(v_pos)//3, "type": "VEC3", "max": [0.26, 0.36, 0.325], "min": [-0.26, 0.2, 0.175] },
            # 7: Visor Norm
            { "bufferView": 7, "componentType": 5126, "count": len(v_norm)//3, "type": "VEC3" },
            # 8: Visor Idx
            { "bufferView": 8, "componentType": 5123, "count": len(v_idx), "type": "SCALAR" }
        ],
        "bufferViews": [
            { "buffer": 0, "byteOffset": t_pos_off, "byteLength": t_pos_len, "target": 34962 },
            { "buffer": 0, "byteOffset": t_norm_off, "byteLength": t_norm_len, "target": 34962 },
            { "buffer": 0, "byteOffset": t_idx_off, "byteLength": t_idx_len, "target": 34963 },
            
            { "buffer": 0, "byteOffset": h_pos_off, "byteLength": h_pos_len, "target": 34962 },
            { "buffer": 0, "byteOffset": h_norm_off, "byteLength": h_norm_len, "target": 34962 },
            { "buffer": 0, "byteOffset": h_idx_off, "byteLength": h_idx_len, "target": 34963 },
            
            { "buffer": 0, "byteOffset": v_pos_off, "byteLength": v_pos_len, "target": 34962 },
            { "buffer": 0, "byteOffset": v_norm_off, "byteLength": v_norm_len, "target": 34962 },
            { "buffer": 0, "byteOffset": v_idx_off, "byteLength": v_idx_len, "target": 34963 }
        ],
        "buffers": [{ "byteLength": len(buf) }]
    }
    
    json_bytes = json.dumps(gltf).encode('utf-8')
    # Pad JSON to 4-byte boundary
    while len(json_bytes) % 4 != 0:
        json_bytes += b' '
        
    glb_header = struct.pack('<4sII', b'glTF', 2, 12 + 8 + len(json_bytes) + 8 + len(buf))
    chunk0_header = struct.pack('<II', len(json_bytes), 0x4E4F534A) # JSON
    chunk1_header = struct.pack('<II', len(buf), 0x004E4942) # BIN
    
    with open(filepath, 'wb') as f:
        f.write(glb_header)
        f.write(chunk0_header)
        f.write(json_bytes)
        f.write(chunk1_header)
        f.write(buf)
        
    print(f"Generated {filepath} ({os.path.getsize(filepath)} bytes)")

create_avatar_glb("public/models/avatar.glb")
