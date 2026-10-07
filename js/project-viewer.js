/**
 * PROJECT DETAIL & INTERACTIVE BLUEPRINT VIEWER
 * Yuvraj Singh Rathore - Civil Engineering Portfolio
 * Provides high-precision CAD blueprint diagrams, engineering parameters, and learning workflows.
 */

(function () {
  'use strict';

  const projectsData = {
    project1: {
      number: "PROJECT // 01",
      tag: "Academic Design Project",
      title: "Two-Storey 2BHK Residential Building Design",
      subtitle: "CAD-Based Residential Planning, Space Allocation & Drafting",
      tools: ["AutoCAD", "2D Drafting", "Building Planning", "Space Allocation"],
      overview: "An academic architectural and structural drafting design project for a two-storey residential building featuring multiple 2BHK residential units. The design focuses on functional space zoning, circulation efficiency, municipal setback compliance, natural lighting, and site integration including dedicated parking bays and perimeter landscaped green buffers.",
      specs: [
        { label: "Building Typology", value: "Two-Storey Residential (G+1)" },
        { label: "Configuration", value: "2BHK Units with Balconies" },
        { label: "Built-up Area", value: "~3,240 sq. ft. per floor (6,480 sq. ft. total)" },
        { label: "Software Utilized", value: "AutoCAD / CAD Drafting Tools" },
        { label: "Drawings Generated", value: "Floor Plans, Front Elevation, Cross Sections, Isometric" },
        { label: "Outdoor Planning", value: "Vehicular Parking Bays & Perimeter Garden Lawn" }
      ],
      methodology: [
        "1. Grid Setting & Setbacks: Established structural column grid coordinates and statutory boundary setbacks.",
        "2. Space Allocation: Formulated efficient circulation corridors, living/dining lounge, two private bedrooms with attached sanitation, and a modular kitchen.",
        "3. Vertical Circulation: Integrated dog-legged staircase with standard riser-tread dimensions compliant with building codes.",
        "4. Elevation & Isometric Views: Drafted front architectural elevation and isometric projections to communicate facade articulation and roof overhangs."
      ],
      blueprintSvg: `
        <svg viewBox="0 0 800 500" class="blueprint-vector" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid1" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 210, 255, 0.12)" stroke-width="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#0a1220"/>
          <rect width="100%" height="100%" fill="url(#grid1)"/>
          
          <!-- Outer Boundary & Setbacks -->
          <rect x="50" y="40" width="700" height="420" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="8,4"/>
          <text x="60" y="32" fill="#00d2ff" font-family="monospace" font-size="11">PROPERTY BOUNDARY // SETBACK LINE 3.0M</text>
          
          <!-- Main Building Envelope (~3240 sq ft footprint) -->
          <rect x="130" y="70" width="540" height="350" fill="rgba(30, 58, 138, 0.2)" stroke="#00d2ff" stroke-width="3"/>
          <text x="140" y="90" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="14">GROUND FLOOR 2BHK RESIDENTIAL UNIT</text>
          <text x="140" y="106" fill="#38bdf8" font-family="monospace" font-size="10">BUILT-UP AREA: ~3,240 SQ. FT. | SCALE 1:100</text>
          
          <!-- Interior Rooms & Partitions -->
          <!-- Living & Dining -->
          <rect x="130" y="120" width="280" height="180" fill="none" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="210" y="200" fill="#f8fafc" font-family="sans-serif" font-size="13" font-weight="600" text-anchor="middle">LIVING & DINING</text>
          <text x="210" y="218" fill="#94a3b8" font-family="monospace" font-size="10" text-anchor="middle">18'0" x 22'6"</text>
          
          <!-- Master Bedroom -->
          <rect x="410" y="120" width="260" height="170" fill="none" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="540" y="195" fill="#f8fafc" font-family="sans-serif" font-size="13" font-weight="600" text-anchor="middle">MASTER BEDROOM</text>
          <text x="540" y="213" fill="#94a3b8" font-family="monospace" font-size="10" text-anchor="middle">14'0" x 16'0"</text>
          
          <!-- Attached Toilet -->
          <rect x="550" y="120" width="120" height="70" fill="rgba(0, 210, 255, 0.05)" stroke="#38bdf8" stroke-width="1.2"/>
          <text x="610" y="158" fill="#94a3b8" font-family="sans-serif" font-size="9" text-anchor="middle">TOILET 6'x8'</text>
          
          <!-- Bedroom 2 -->
          <rect x="410" y="290" width="260" height="130" fill="none" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="540" y="355" fill="#f8fafc" font-family="sans-serif" font-size="13" font-weight="600" text-anchor="middle">BEDROOM 02</text>
          <text x="540" y="373" fill="#94a3b8" font-family="monospace" font-size="10" text-anchor="middle">13'0" x 14'6"</text>
          
          <!-- Modular Kitchen -->
          <rect x="130" y="300" width="150" height="120" fill="none" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="205" y="360" fill="#f8fafc" font-family="sans-serif" font-size="12" font-weight="600" text-anchor="middle">KITCHEN</text>
          <text x="205" y="378" fill="#94a3b8" font-family="monospace" font-size="10" text-anchor="middle">10'0" x 12'0"</text>
          
          <!-- Staircase to First Floor -->
          <rect x="280" y="300" width="130" height="120" fill="rgba(37, 99, 235, 0.15)" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="345" y="350" fill="#00d2ff" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">STAIRCASE</text>
          <line x1="290" y1="365" x2="400" y2="365" stroke="#00d2ff" stroke-width="1" stroke-dasharray="3,3"/>
          <line x1="290" y1="380" x2="400" y2="380" stroke="#00d2ff" stroke-width="1" stroke-dasharray="3,3"/>
          <line x1="290" y1="395" x2="400" y2="395" stroke="#00d2ff" stroke-width="1" stroke-dasharray="3,3"/>
          <text x="345" y="412" fill="#38bdf8" font-family="monospace" font-size="9" text-anchor="middle">UP ➔ L2 (+3.6M)</text>

          <!-- Parking Bay -->
          <rect x="50" y="240" width="70" height="180" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,2"/>
          <text x="85" y="325" fill="#10b981" font-family="monospace" font-size="10" text-anchor="middle" transform="rotate(-90 85 325)">PARKING (2 CARS)</text>

          <!-- Front Garden Lawn -->
          <rect x="50" y="70" width="70" height="160" fill="rgba(16, 185, 129, 0.12)" stroke="#10b981" stroke-width="1.5"/>
          <text x="85" y="150" fill="#10b981" font-family="monospace" font-size="10" text-anchor="middle" transform="rotate(-90 85 150)">GARDEN / LAWN</text>

          <!-- Structural Column Markers -->
          <rect x="126" y="66" width="8" height="8" fill="#00d2ff"/>
          <rect x="406" y="66" width="8" height="8" fill="#00d2ff"/>
          <rect x="666" y="66" width="8" height="8" fill="#00d2ff"/>
          <rect x="126" y="296" width="8" height="8" fill="#00d2ff"/>
          <rect x="406" y="296" width="8" height="8" fill="#00d2ff"/>
          <rect x="666" y="296" width="8" height="8" fill="#00d2ff"/>
          <rect x="126" y="416" width="8" height="8" fill="#00d2ff"/>
          <rect x="406" y="416" width="8" height="8" fill="#00d2ff"/>
          <rect x="666" y="416" width="8" height="8" fill="#00d2ff"/>
          
          <!-- Dimension Lines -->
          <line x1="130" y1="445" x2="670" y2="445" stroke="#94a3b8" stroke-width="1"/>
          <line x1="130" y1="440" x2="130" y2="450" stroke="#94a3b8" stroke-width="1"/>
          <line x1="670" y1="440" x2="670" y2="450" stroke="#94a3b8" stroke-width="1"/>
          <text x="400" y="460" fill="#94a3b8" font-family="monospace" font-size="11" text-anchor="middle">TOTAL LENGTH = 54' 0" (16.45 M)</text>
        </svg>
      `
    },

    project2: {
      number: "PROJECT // 02",
      tag: "Academic Learning Project",
      title: "BIM-Based Residential Building Model",
      subtitle: "Parametric 3D Modelling, Element Hierarchy & Digital Workflows",
      tools: ["BIM", "3D Visualization", "Architectural Elements", "Structural Coordination"],
      overview: "A student learning project focusing on Building Information Modelling (BIM) principles. The model explores the integration of parametric architectural elements (composite walls, fenestrations, slabs) with structural skeletons (RC columns, beams, foundation) across multiple floor levels with strict Level of Development (LOD) standards.",
      specs: [
        { label: "Modelling Approach", value: "Parametric Multi-Storey BIM" },
        { label: "Element Organization", value: "Floor-wise: Ground, First, Terrace" },
        { label: "Architectural Scope", value: "Curtain Walls, Partitions, Windows, Finishes" },
        { label: "Structural Scope", value: "RC Columns, Plinth Beams, Floor Diaphragms" },
        { label: "BIM Workflow", value: "Element Classification, Schedules, Spatial Coordination" },
        { label: "Visual Outputs", value: "Isometric 3D Cutaways & Sectional Perspectives" }
      ],
      methodology: [
        "1. Project Levels & Datum: Defined benchmark elevation levels (EL 0.00m Ground, EL +3.60m First Floor, EL +7.20m Terrace).",
        "2. Structural Grid & Skeleton: Modelled column family instances with accurate material properties and plinth tie-beams.",
        "3. Architectural Enclosure: Applied layered wall assemblies with thermal and plaster materials; placed doors and windows with parametric family constraints.",
        "4. Coordination & Scheduling: Extracted floor-wise material takeoff schedules and verified spatial clearances between structural members and service zones."
      ],
      blueprintSvg: `
        <svg viewBox="0 0 800 500" class="blueprint-vector" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#0a1220"/>
          <!-- Grid -->
          <line x1="0" y1="250" x2="800" y2="250" stroke="rgba(56, 189, 248, 0.1)" stroke-width="1"/>
          
          <!-- BIM Storey Bounding Boxes -->
          <!-- Terrace Level -->
          <polygon points="400,60 620,120 400,180 180,120" fill="rgba(37, 99, 235, 0.25)" stroke="#00d2ff" stroke-width="2"/>
          <text x="640" y="125" fill="#00d2ff" font-family="monospace" font-size="11">LEVEL 03: TERRACE (EL +7.20M)</text>

          <!-- First Floor Slab -->
          <polygon points="400,170 620,230 400,290 180,230" fill="rgba(37, 99, 235, 0.35)" stroke="#38bdf8" stroke-width="2"/>
          <text x="640" y="235" fill="#38bdf8" font-family="monospace" font-size="11">LEVEL 02: 1ST FLOOR (EL +3.60M)</text>

          <!-- Ground Floor Slab -->
          <polygon points="400,280 620,340 400,400 180,340" fill="rgba(15, 23, 42, 0.7)" stroke="#2563eb" stroke-width="2"/>
          <text x="640" y="345" fill="#94a3b8" font-family="monospace" font-size="11">LEVEL 01: GROUND (EL ±0.00M)</text>

          <!-- Vertical Columns Linking Slabs -->
          <line x1="180" y1="120" x2="180" y2="340" stroke="#00d2ff" stroke-width="3"/>
          <line x1="400" y1="180" x2="400" y2="400" stroke="#00d2ff" stroke-width="3"/>
          <line x1="620" y1="120" x2="620" y2="340" stroke="#00d2ff" stroke-width="3"/>
          <line x1="400" y1="60" x2="400" y2="280" stroke="#00d2ff" stroke-width="2" stroke-dasharray="3,3"/>

          <!-- BIM Data Callout Tags -->
          <rect x="60" y="70" width="180" height="50" fill="rgba(17, 26, 45, 0.85)" stroke="#00d2ff" stroke-width="1" rx="4"/>
          <text x="70" y="90" fill="#00d2ff" font-family="monospace" font-size="10" font-weight="bold">PARAMETRIC SLAB</text>
          <text x="70" y="105" fill="#94a3b8" font-family="monospace" font-size="9">Thk: 150mm | M25 Concrete</text>
          <line x1="240" y1="95" x2="310" y2="105" stroke="#00d2ff" stroke-width="1"/>

          <rect x="60" y="190" width="180" height="50" fill="rgba(17, 26, 45, 0.85)" stroke="#38bdf8" stroke-width="1" rx="4"/>
          <text x="70" y="210" fill="#38bdf8" font-family="monospace" font-size="10" font-weight="bold">RC COLUMN C1</text>
          <text x="70" y="225" fill="#94a3b8" font-family="monospace" font-size="9">300mm x 450mm | Fe500</text>
          <line x1="240" y1="215" x2="310" y2="235" stroke="#38bdf8" stroke-width="1"/>

          <!-- Watermark / Footer -->
          <text x="400" y="445" fill="#64748b" font-family="monospace" font-size="11" text-anchor="middle">BIM WORKFLOW // LEVEL OF DEVELOPMENT (LOD 200/300)</text>
          <text x="400" y="465" fill="#38bdf8" font-family="monospace" font-size="10" text-anchor="middle">COORDINATED ARCHITECTURAL & STRUCTURAL GEOMETRY</text>
        </svg>
      `
    },

    project3: {
      number: "PROJECT // 03",
      tag: "Academic / Learning Project",
      title: "Structural Analysis Study using ETABS",
      subtitle: "Finite Element Frame Modelling, Load Combinations & Shear-Moment Analysis",
      tools: ["ETABS", "Structural Analysis", "Load Assignment", "Moment Diagrams"],
      overview: "An academic structural engineering study analyzing multi-bay reinforced concrete frame behavior under static gravity and lateral loading combinations. The study covers node meshing, column and beam boundary conditions, dead and live load assignments according to standard building codes, and interpretation of resultant bending moment and shear envelopes.",
      specs: [
        { label: "Analysis Tool", value: "ETABS Structural Analysis Software" },
        { label: "Structure Type", value: "Multi-Storey Moment Resisting Frame (SMRF)" },
        { label: "Member Sizing", value: "Columns (300x450mm), Beams (230x400mm)" },
        { label: "Gravity Loads", value: "Dead (Self-weight + Floor Finish), Live (2.0-3.0 kN/m²)" },
        { label: "Lateral Considerations", value: "Preliminary Wind / Lateral Drift Checks" },
        { label: "Analysis Outputs", value: "Bending Moment (BMD), Shear Force (SFD), Axial Loads" }
      ],
      methodology: [
        "1. Material & Section Definition: Specified M25 grade concrete and Fe500 longitudinal reinforcement rebar properties.",
        "2. Frame Modelling: Placed orthogonal column grids, primary beams, and secondary cross members with rigid diaphragm slab constraints.",
        "3. Load Distribution: Applied uniformly distributed loads (UDL) along beam spans and area floor surface loads.",
        "4. Solver Execution & Evaluation: Executed linear elastic analysis; evaluated joint displacements, beam mid-span positive moments, and negative support moments."
      ],
      blueprintSvg: `
        <svg viewBox="0 0 800 500" class="blueprint-vector" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#0a1220"/>
          <text x="400" y="40" fill="#00d2ff" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">ETABS STRUCTURAL 2D ELEVATION FRAME & MOMENT ENVELOPE</text>

          <!-- Frame Baseline -->
          <line x1="150" y1="400" x2="650" y2="400" stroke="#475569" stroke-width="3"/>
          <text x="130" y="405" fill="#94a3b8" font-family="monospace" font-size="10">BASE</text>

          <!-- Fixed Supports -->
          <polygon points="190,400 210,400 200,415" fill="#38bdf8"/>
          <polygon points="390,400 410,400 400,415" fill="#38bdf8"/>
          <polygon points="590,400 610,400 600,415" fill="#38bdf8"/>

          <!-- Columns (Elevation) -->
          <line x1="200" y1="400" x2="200" y2="140" stroke="#38bdf8" stroke-width="4"/>
          <line x1="400" y1="400" x2="400" y2="140" stroke="#38bdf8" stroke-width="4"/>
          <line x1="600" y1="400" x2="600" y2="140" stroke="#38bdf8" stroke-width="4"/>

          <!-- Floor Beams -->
          <line x1="200" y1="270" x2="600" y2="270" stroke="#00d2ff" stroke-width="3"/>
          <line x1="200" y1="140" x2="600" y2="140" stroke="#00d2ff" stroke-width="3"/>

          <!-- Load Arrows (Uniform Gravity Load) on Roof Beam -->
          <g stroke="#f59e0b" stroke-width="1.5">
            <line x1="230" y1="105" x2="230" y2="135"/>
            <polygon points="227,130 233,130 230,138" fill="#f59e0b"/>
            <line x1="280" y1="105" x2="280" y2="135"/>
            <polygon points="277,130 283,130 280,138" fill="#f59e0b"/>
            <line x1="330" y1="105" x2="330" y2="135"/>
            <polygon points="327,130 333,130 330,138" fill="#f59e0b"/>
            <line x1="380" y1="105" x2="380" y2="135"/>
            <polygon points="377,130 383,130 380,138" fill="#f59e0b"/>
            <line x1="430" y1="105" x2="430" y2="135"/>
            <polygon points="427,130 433,130 430,138" fill="#f59e0b"/>
            <line x1="480" y1="105" x2="480" y2="135"/>
            <polygon points="477,130 483,130 480,138" fill="#f59e0b"/>
            <line x1="530" y1="105" x2="530" y2="135"/>
            <polygon points="527,130 533,130 530,138" fill="#f59e0b"/>
            <line x1="570" y1="105" x2="570" y2="135"/>
            <polygon points="567,130 573,130 570,138" fill="#f59e0b"/>
          </g>
          <text x="400" y="95" fill="#f59e0b" font-family="monospace" font-size="10" text-anchor="middle">UDL: DL + LL (COMB: 1.5 DL + 1.5 LL)</text>

          <!-- Bending Moment Curves (Parabolic Sagging & Hogging at Supports) -->
          <path d="M 200,270 Q 300,320 400,270 Q 500,320 600,270" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4,2"/>
          <text x="300" y="335" fill="#ef4444" font-family="monospace" font-size="10" text-anchor="middle">+M (Mid-span Sagging)</text>
          <text x="500" y="335" fill="#ef4444" font-family="monospace" font-size="10" text-anchor="middle">+M (Mid-span Sagging)</text>
          <text x="400" y="255" fill="#ef4444" font-family="monospace" font-size="10" text-anchor="middle">-M (Hogging at Column)</text>

          <!-- Joint Circles -->
          <circle cx="200" cy="270" r="5" fill="#00d2ff"/>
          <circle cx="400" cy="270" r="5" fill="#00d2ff"/>
          <circle cx="600" cy="270" r="5" fill="#00d2ff"/>
          <circle cx="200" cy="140" r="5" fill="#00d2ff"/>
          <circle cx="400" cy="140" r="5" fill="#00d2ff"/>
          <circle cx="600" cy="140" r="5" fill="#00d2ff"/>

          <text x="400" y="460" fill="#64748b" font-family="monospace" font-size="10" text-anchor="middle">FINITE ELEMENT ANALYSIS // NODE EQUILIBRIUM VERIFIED</text>
        </svg>
      `
    },

    project4: {
      number: "PROJECT // 04",
      tag: "Student Learning Project",
      title: "Civil 3D Site Development Concept",
      subtitle: "Topographical Surface Modelling, Grading & Road Alignment Geometry",
      tools: ["Civil 3D", "Surface Modelling", "Grading Concepts", "Road Alignment"],
      overview: "A student learning concept in infrastructure and land development utilizing Autodesk Civil 3D workflows. The project investigates TIN surface terrain generation from point cloud survey data, proposed grade terrace creation, cut-and-fill volume balancing, and horizontal/vertical road alignment design with super-elevation and cross-section profiles.",
      specs: [
        { label: "Software Tool", value: "Autodesk Civil 3D" },
        { label: "Surface Type", value: "Triangulated Irregular Network (TIN Surface)" },
        { label: "Grading Design", value: "Terraced Pads with Daylight Slope Constraints (1:2 / 1:3)" },
        { label: "Earthwork Principles", value: "Cut & Fill Balancing Optimization" },
        { label: "Linear Infrastructure", value: "Road Centerline Alignment with Stations (0+000 to 0+350)" },
        { label: "Visualization", value: "Contour Heatmap & Longitudinal Profile Section" }
      ],
      methodology: [
        "1. Survey Point Import & Surface Creation: Imported Northing/Easting/Elevation CSV points to generate existing ground (EG) TIN surface with 1.0m minor and 5.0m major contours.",
        "2. Alignment Geometry: Placed horizontal tangents, curve fillets, and spirals with standard radius design for smooth vehicular circulation.",
        "3. Vertical Profile & Grade Lines: Sampled existing ground profile and drafted proposed design finished ground (FG) profile with balanced crest/sag vertical curves.",
        "4. Grading & Corridor: Created daylight grading to existing surface and evaluated volume report for earthwork optimization."
      ],
      blueprintSvg: `
        <svg viewBox="0 0 800 500" class="blueprint-vector" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#0a1220"/>
          <text x="400" y="38" fill="#00d2ff" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">CIVIL 3D // SITE CONTOUR TOPOGRAPHY & ROAD ALIGNMENT</text>

          <!-- Topographic Contour Lines -->
          <g stroke="#1e3a8a" stroke-width="1.2" fill="none">
            <path d="M 50,120 Q 200,90 400,140 T 750,100"/>
            <path d="M 50,170 Q 220,150 420,200 T 750,160"/>
            <path d="M 50,220 Q 240,210 440,260 T 750,220"/>
            <path d="M 50,270 Q 260,270 460,320 T 750,280"/>
            <path d="M 50,320 Q 280,330 480,380 T 750,340"/>
            <path d="M 50,370 Q 300,390 500,440 T 750,400"/>
          </g>

          <!-- Major Index Contours (Brighter) -->
          <path d="M 50,150 Q 210,120 410,170 T 750,130" fill="none" stroke="#0284c7" stroke-width="1.8"/>
          <text x="80" y="145" fill="#38bdf8" font-family="monospace" font-size="9">EL +105.00 M</text>
          
          <path d="M 50,250 Q 250,240 450,290 T 750,250" fill="none" stroke="#0284c7" stroke-width="1.8"/>
          <text x="80" y="245" fill="#38bdf8" font-family="monospace" font-size="9">EL +100.00 M</text>

          <path d="M 50,350 Q 290,360 490,410 T 750,370" fill="none" stroke="#0284c7" stroke-width="1.8"/>
          <text x="80" y="345" fill="#38bdf8" font-family="monospace" font-size="9">EL +95.00 M</text>

          <!-- Road Alignment Centerline (Horizontal Geometry) -->
          <path d="M 90,420 Q 280,380 380,240 T 700,90" fill="none" stroke="#00d2ff" stroke-width="3.5"/>
          <path d="M 90,420 Q 280,380 380,240 T 700,90" fill="none" stroke="#ffffff" stroke-width="1" stroke-dasharray="8,6"/>

          <!-- Road Stations -->
          <circle cx="90" cy="420" r="4" fill="#00d2ff"/>
          <text x="100" y="440" fill="#00d2ff" font-family="monospace" font-size="10">STA 0+000 (POB)</text>

          <circle cx="280" cy="330" r="4" fill="#00d2ff"/>
          <text x="290" y="340" fill="#00d2ff" font-family="monospace" font-size="10">STA 0+150</text>

          <circle cx="480" cy="180" r="4" fill="#00d2ff"/>
          <text x="490" y="170" fill="#00d2ff" font-family="monospace" font-size="10">STA 0+250</text>

          <circle cx="700" cy="90" r="4" fill="#00d2ff"/>
          <text x="680" y="75" fill="#00d2ff" font-family="monospace" font-size="10">STA 0+350 (POE)</text>

          <!-- Terraced Building Pad (Grading Concept) -->
          <rect x="440" y="270" width="220" height="120" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="2" stroke-dasharray="5,3"/>
          <text x="550" y="325" fill="#10b981" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">PROPOSED BUILDING PAD</text>
          <text x="550" y="342" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">PAD ELEVATION: +98.50 M (BALANCED CUT/FILL)</text>

          <!-- North Arrow -->
          <g transform="translate(730, 420)">
            <circle cx="0" cy="0" r="22" fill="rgba(17, 26, 45, 0.9)" stroke="#00d2ff" stroke-width="1"/>
            <polygon points="0,-16 6,4 0,0 -6,4" fill="#00d2ff"/>
            <text x="0" y="-18" fill="#00d2ff" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">N</text>
          </g>

          <text x="400" y="475" fill="#64748b" font-family="monospace" font-size="10" text-anchor="middle">SURFACE DEFINITION: 2,450 SURVEY POINTS // TRIANGULATED IRREGULAR NETWORK (TIN)</text>
        </svg>
      `
    }
  };

  // Modal DOM elements
  const modalOverlay = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalNumber = document.getElementById('modal-project-number');
  const modalTag = document.getElementById('modal-project-tag');
  const modalBody = document.getElementById('modal-project-body');
  const modalClose = document.getElementById('modal-close-btn');

  function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    modalNumber.textContent = project.number;
    modalTag.textContent = project.tag;
    modalTitle.textContent = project.title;

    modalBody.innerHTML = `
      <div class="modal-blueprint-container" style="border: 1px solid var(--border-light); border-radius: 6px; overflow: hidden; margin-bottom: 1.75rem; background: #070b12;">
        ${project.blueprintSvg}
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Project Overview</h4>
        <p style="font-size: 0.92rem; line-height: 1.6; color: var(--text-secondary);">${project.overview}</p>
      </div>

      <div style="margin-bottom: 1.75rem;">
        <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.75rem;">Key Engineering Specifications</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 0.75rem; background: var(--bg-surface-elevated); padding: 1.25rem; border-radius: 6px; border: var(--border-hairline);">
          ${project.specs.map(s => `
            <div>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; display: block;">${s.label}</span>
              <span style="font-size: 0.88rem; color: var(--text-primary); font-weight: 500;">${s.value}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div>
        <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.75rem;">Academic & Engineering Methodology</h4>
        <ul style="display: flex; flex-direction: column; gap: 0.6rem;">
          ${project.methodology.map(m => `
            <li style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; padding-left: 1rem; border-left: 2px solid var(--accent-cyan);">
              ${m}
            </li>
          `).join('')}
        </ul>
      </div>

      <div style="margin-top: 2rem; padding-top: 1.25rem; border-top: var(--border-hairline); display: flex; justify-content: space-between; align-items: center; flex-wrap: gap;">
        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">STATUS: ${project.tag.toUpperCase()}</span>
        <button class="btn btn-blueprint btn-sm" id="btn-modal-close-bottom">Close Specification</button>
      </div>
    `;

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Hook bottom close button
    const bottomClose = document.getElementById('btn-modal-close-bottom');
    if (bottomClose) {
      bottomClose.addEventListener('click', closeProjectModal);
    }
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Hook project cards
  document.querySelectorAll('.btn-view-project').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projId = e.currentTarget.getAttribute('data-project');
      openProjectModal(projId);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeProjectModal();
    });
  }

  // Keyboard escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
    }
  });

  // Make globally available if needed
  window.openProjectModal = openProjectModal;
})();
