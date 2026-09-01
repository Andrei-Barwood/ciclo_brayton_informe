const fs = require("fs");
const path = require("path");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  ImageRun,
  Header,
  Footer,
  AlignmentType,
  HeadingLevel,
  LevelFormat,
  BorderStyle,
  WidthType,
  ShadingType,
  VerticalAlign,
  PageNumber,
  PageBreak,
  ExternalHyperlink,
  TabStopType,
  UnderlineType,
} = require("docx");

// Datos de portada (fáciles de cambiar también después en Pages)
const STUDENT_NAME = "Andrei Barwood";
const TEACHER_NAME = "[Completar nombre del docente]";
const COURSE = "Taller de Energía II";
const CAREER = "Electricidad y Energías Renovables";
const INSTITUTION = "CFT Los Ríos";
const DELIVERY_DATE = "1 de septiembre de 2026";
const UNIT = "Unidad 1";

const ROOT = path.resolve(__dirname, "../..");
const FIGURES = path.join(ROOT, "figures");
const OUTPUT_DOCX = path.join(ROOT, "output", "Informe_Ciclo_Brayton.docx");

const A4_W = 11906;
const A4_H = 16838;
const MARGIN_TB = 1418; // 2,5 cm
const MARGIN_LR = 1701; // 3,0 cm
const CONTENT_W = A4_W - 2 * MARGIN_LR; // 8504 DXA

const NAVY = "18324B";
const BLUE = "2B5D7D";
const TEAL = "377F87";
const INK = "1F252B";
const MID = "5C6770";
const LINE = "C5CDD4";
const PALE = "F2F6F9";
const PALE_ORANGE = "FFF4EA";
const HEADER_FILL = "18324B";

const thin = { style: BorderStyle.SINGLE, size: 8, color: LINE };
const borders = { top: thin, bottom: thin, left: thin, right: thin };
const noBorder = {
  style: BorderStyle.NONE,
  size: 0,
  color: "FFFFFF",
};
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function run(text, extra = {}) {
  return new TextRun({
    text,
    font: extra.font || "Arial",
    size: extra.size ?? 22,
    bold: extra.bold || false,
    italics: extra.italics || false,
    color: extra.color || INK,
    subScript: extra.sub || false,
    superScript: extra.sup || false,
    underline: extra.underline || undefined,
  });
}

function body(children, extra = {}) {
  const content = Array.isArray(children) ? children : [run(children)];
  return new Paragraph({
    alignment: extra.align || AlignmentType.JUSTIFIED,
    spacing: {
      line: 360,
      lineRule: "auto",
      before: extra.before ?? 0,
      after: extra.after ?? 200,
    },
    indent: extra.indent,
    keepLines: extra.keepLines,
    children: content,
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 160, line: 276 },
    outlineLevel: 0,
    children: [run(text, { size: 28, bold: true, color: NAVY })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120, line: 276 },
    outlineLevel: 1,
    children: [run(text, { size: 28, bold: true, color: BLUE })],
  });
}

function caption(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 80, after: 40, line: 276 },
    children: [run(text, { size: 18, italics: true, color: INK })],
  });
}

function note(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 240, line: 276 },
    children: [run(text, { size: 16, italics: true, color: MID })],
  });
}

function eq(children) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 160, after: 160, line: 360 },
    children,
  });
}

function spacer(after = 200) {
  return new Paragraph({
    spacing: { after },
    children: [run("")],
  });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function hyperlink(text, url) {
  return new ExternalHyperlink({
    children: [
      run(text, {
        size: 22,
        color: "2B5D7D",
        underline: { type: UnderlineType.SINGLE, color: "2B5D7D" },
      }),
    ],
    link: url,
  });
}

function imageParagraph(fileName, maxWidthPx, altName, altDesc) {
  const filePath = path.join(FIGURES, fileName);
  const data = fs.readFileSync(filePath);
  const dims = pngSize(data);
  const width = maxWidthPx;
  const height = Math.round(maxWidthPx * (dims.height / dims.width));
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 160, after: 60 },
    children: [
      new ImageRun({
        type: "png",
        data,
        transformation: { width, height },
        altText: { name: altName, description: altDesc, title: altName },
      }),
    ],
  });
}

function pngSize(buf) {
  if (buf.toString("ascii", 1, 4) !== "PNG") {
    throw new Error("No es un PNG válido");
  }
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function cell(children, width, extra = {}) {
  const content = Array.isArray(children)
    ? children
    : [
        new Paragraph({
          alignment: extra.align || AlignmentType.LEFT,
          spacing: { after: 0, line: 276 },
          children: Array.isArray(children) ? children : [run(String(children), extra.run || {})],
        }),
      ];
  if (typeof children === "string" || (children && children.constructor && children.constructor.name === "TextRun")) {
    // handled below
  }
  let paras;
  if (typeof extra.text === "string") {
    paras = [
      new Paragraph({
        alignment: extra.align || AlignmentType.LEFT,
        spacing: { after: 0, line: 276 },
        children: [run(extra.text, extra.run || {})],
      }),
    ];
  } else if (Array.isArray(children) && children[0] && children[0].type === undefined && children[0].root) {
    paras = children;
  } else if (typeof children === "string") {
    paras = [
      new Paragraph({
        alignment: extra.align || AlignmentType.LEFT,
        spacing: { after: 0, line: 276 },
        children: [run(children, extra.run || {})],
      }),
    ];
  } else if (Array.isArray(children) && children[0] instanceof Paragraph) {
    paras = children;
  } else if (Array.isArray(children)) {
    paras = [
      new Paragraph({
        alignment: extra.align || AlignmentType.LEFT,
        spacing: { after: 0, line: 276 },
        children,
      }),
    ];
  } else {
    paras = content;
  }

  return new TableCell({
    borders: extra.borders || borders,
    width: { size: width, type: WidthType.DXA },
    shading: extra.fill
      ? { fill: extra.fill, type: ShadingType.CLEAR }
      : undefined,
    margins: { top: 70, bottom: 70, left: 90, right: 90 },
    verticalAlign: extra.valign || VerticalAlign.CENTER,
    columnSpan: extra.span,
    children: paras,
  });
}

function textCell(text, width, extra = {}) {
  const isHeader = extra.header === true;
  return new TableCell({
    borders: extra.borders || borders,
    width: { size: width, type: WidthType.DXA },
    shading: {
      fill: extra.fill || (isHeader ? HEADER_FILL : extra.alt ? PALE : "FFFFFF"),
      type: ShadingType.CLEAR,
    },
    margins: { top: 70, bottom: 70, left: 90, right: 90 },
    verticalAlign: VerticalAlign.CENTER,
    children: [
      new Paragraph({
        alignment: extra.align || (isHeader ? AlignmentType.CENTER : AlignmentType.LEFT),
        spacing: { after: 0, line: 276 },
        children: [
          run(text, {
            size: extra.size || 20,
            bold: extra.bold ?? isHeader,
            italics: extra.italics || false,
            color: extra.color || (isHeader ? "FFFFFF" : INK),
          }),
        ],
      }),
    ],
  });
}

function richCell(children, width, extra = {}) {
  return new TableCell({
    borders: extra.borders || borders,
    width: { size: width, type: WidthType.DXA },
    shading: {
      fill: extra.fill || (extra.alt ? PALE : "FFFFFF"),
      type: ShadingType.CLEAR,
    },
    margins: { top: 70, bottom: 70, left: 90, right: 90 },
    verticalAlign: VerticalAlign.CENTER,
    children: [
      new Paragraph({
        alignment: extra.align || AlignmentType.LEFT,
        spacing: { after: 0, line: 276 },
        children,
      }),
    ],
  });
}

function makeTable(columnWidths, rows) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths,
    rows,
  });
}

function coverRow(label, value, alt) {
  const c1 = Math.round(CONTENT_W * 0.38);
  const c2 = CONTENT_W - c1;
  return new TableRow({
    children: [
      textCell(label, c1, { bold: true, fill: alt ? PALE : "FFFFFF", size: 22, color: NAVY }),
      textCell(value, c2, { fill: alt ? PALE : "FFFFFF", size: 22 }),
    ],
  });
}

function qaItem(num, question, answer) {
  return body([
    run(`${num}. `, { bold: true }),
    run(question, { bold: true }),
    run(" " + answer),
  ]);
}

const imgWidth = 520; // px at 96 dpi, dentro del ancho útil A4

const children = [];

// ---------------------------------------------------------------------------
// PORTADA
// ---------------------------------------------------------------------------
children.push(
  spacer(360),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [run(INSTITUTION.toUpperCase(), { size: 24, bold: true, color: TEAL })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [run(CAREER, { size: 22, color: MID })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 280 },
    children: [run(`${COURSE}  ·  ${UNIT}`, { size: 20, color: MID })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 12, color: TEAL, space: 8 },
    },
    children: [run("INFORME ACADÉMICO", { size: 20, bold: true, color: TEAL })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 280, after: 80 },
    children: [run("Ciclo Brayton", { size: 56, bold: true, color: NAVY })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 360 },
    children: [
      run("Funcionamiento, diagramas, eficiencia y aplicaciones de la turbina a gas", {
        size: 22,
        italics: true,
        color: MID,
      }),
    ],
  }),
  makeTable(
    [Math.round(CONTENT_W * 0.38), CONTENT_W - Math.round(CONTENT_W * 0.38)],
    [
      coverRow("Título del trabajo", "Ciclo Brayton", true),
      coverRow("Nombre del docente", TEACHER_NAME, false),
      coverRow("Nombre del estudiante", STUDENT_NAME, true),
      coverRow("Asignatura / módulo", COURSE, false),
      coverRow("Carrera", CAREER, true),
      coverRow("Institución", INSTITUTION, false),
      coverRow("Fecha de entrega", DELIVERY_DATE, true),
    ]
  ),
  spacer(400),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200 },
    children: [
      run("Documento elaborado para la evaluación de informe y disertación de la Unidad 1.", {
        size: 18,
        italics: true,
        color: MID,
      }),
    ],
  }),
  pageBreak()
);

// ---------------------------------------------------------------------------
// 1. INTRODUCCIÓN
// ---------------------------------------------------------------------------
children.push(
  h1("1. Introducción"),
  body("En este informe se presenta el ciclo Brayton, que es el modelo termodinámico que se usa para explicar cómo funciona una turbina a gas. La idea de fondo es bastante directa: entra aire, el compresor le sube la presión, la combustión eleva la temperatura y después los gases calientes se expanden en una turbina para producir movimiento. Ese mismo principio aparece en centrales eléctricas, turbinas industriales y motores aeronáuticos (National Aeronautics and Space Administration [NASA], 2021)."),
  body("El tema me parece importante en Taller de Energía II porque permite seguir una cadena completa de transformación. La energía química del combustible se convierte en energía térmica, después en energía mecánica y, si hay un generador, termina como energía eléctrica. También ayuda a no olvidar un detalle que a veces se pasa por alto: la turbina no entrega todo su trabajo a la carga, ya que una parte considerable se usa para mover el propio compresor."),
  body("Este trabajo se relaciona con lo visto en clases sobre máquinas térmicas, conversión de energía y comparación entre ciclos. Brayton se parece a Rankine en el objetivo —obtener trabajo a partir de calor—, pero se diferencia en que el fluido se mantiene siempre como gas, sin evaporar ni condensar. Respecto de Carnot, sirve como techo teórico: el ciclo real e incluso el Brayton ideal rinden menos que ese límite."),
  body("En las páginas siguientes se explican los componentes, las cuatro etapas del ciclo ideal, los diagramas P-v y T-s, las ecuaciones de trabajo y eficiencia, un ejemplo numérico, las diferencias con la máquina real y las aplicaciones, incluyendo el ciclo combinado y su vínculo con las energías renovables. El propósito es que el informe quede claro para la evaluación escrita y también sirva como guía para la disertación.")
);

// ---------------------------------------------------------------------------
// 2. DESARROLLO
// ---------------------------------------------------------------------------
children.push(
  h1("2. Desarrollo"),
  h2("2.1 Funcionamiento y componentes principales"),
  body("El ciclo Brayton es un modelo que ordena una secuencia de procesos mediante los estados 1, 2, 3 y 4. Se considera un ciclo porque, en la representación ideal, el fluido vuelve a sus condiciones iniciales después de recibir calor y entregar trabajo. En una turbina abierta real no regresa la misma masa: entra aire nuevo por la admisión y los gases salen por el escape. El rechazo de calor 4 → 1 permite cerrar termodinámicamente el modelo (Çengel et al., 2019)."),
  body("Si se recorre el equipo de izquierda a derecha, la admisión filtra y conduce el aire. El compresor recibe trabajo del eje y aumenta la presión y la temperatura. La cámara de combustión mezcla ese aire comprimido con combustible y eleva mucho la temperatura; en la máquina real hay una pequeña caída de presión. La turbina expande los gases, hace girar el eje y produce trabajo. Por último, el escape descarga los gases o dirige su calor hacia un sistema de recuperación. El eje conecta la turbina con el compresor y con la carga útil, por ejemplo un generador (U.S. Department of Energy, s. f.-b)."),
  imageParagraph(
    "figura_1_esquema_turbina_gas.png",
    imgWidth,
    "Figura 1. Esquema simplificado de una turbina a gas",
    "Recorrido del aire por admisión, compresor, cámara de combustión, turbina y escape, con eje común y generador."
  ),
  caption("Figura 1. Esquema simplificado de una turbina a gas."),
  note("Nota. El aire avanza por admisión, compresor, combustión, turbina y escape. La línea gris representa el eje mecánico. Elaboración propia."),
  body("Una forma sencilla de no perderse es pensar el equipo como una línea de producción: primero se prepara el aire, después se le agrega energía y recién ahí se extrae trabajo. Si se mezcla el orden, el ciclo deja de tener sentido. Por eso, en la disertación conviene explicar los componentes en el mismo sentido en que circula el fluido.")
);

children.push(
  h2("2.2 Las cuatro etapas del ciclo ideal"),
  body([
    run("1 → 2: compresión isentrópica. ", { bold: true }),
    run("El compresor realiza trabajo sobre el aire. Aumentan la presión y la temperatura, mientras disminuye el volumen específico. La palabra "),
    run("isentrópica", { italics: true }),
    run(" significa que la entropía permanece constante. En el modelo ideal se supone un proceso adiabático e internamente reversible, o sea, sin pérdidas por fricción ni transferencia de calor hacia afuera."),
  ]),
  body([
    run("2 → 3: adición de calor a presión constante. ", { bold: true }),
    run("El aire comprimido entra a la cámara de combustión. La energía química del combustible eleva la temperatura y la entalpía del gas. En el modelo ideal se mantiene "),
    run("P", { italics: true }),
    run("2", { italics: true, sub: true }),
    run(" = "),
    run("P", { italics: true }),
    run("3", { italics: true, sub: true }),
    run(", aunque en una cámara real existe una caída de presión."),
  ]),
  body([
    run("3 → 4: expansión isentrópica. ", { bold: true }),
    run("Los gases calientes se expanden a través de los álabes de la turbina. Disminuyen la presión y la temperatura, aumenta el volumen específico y el gas entrega trabajo al eje. Una parte de este trabajo mueve el compresor y el resto puede aprovecharse externamente, que es justamente el trabajo útil."),
  ]),
  body([
    run("4 → 1: rechazo de calor a presión constante. ", { bold: true }),
    run("El modelo devuelve el fluido a la condición inicial. En una turbina abierta esta etapa representa la salida de los gases y su reemplazo por aire ambiente; no significa necesariamente que exista un enfriador físico. En un Brayton cerrado sí puede haber un intercambiador que enfríe y recircule el mismo fluido (Çengel et al., 2019; Moran et al., 2018)."),
  ]),
  body("Lo que hay que retener es el patrón: dos procesos isentrópicos y dos procesos a presión constante. Esa estructura es la que después se ve dibujada en los diagramas.")
);

children.push(
  h2("2.3 Lectura de los diagramas P-v y T-s"),
  body([
    run("En el diagrama "),
    run("Presión-Volumen específico (P-v)", { bold: true }),
    run(", la compresión 1 → 2 sube hacia la izquierda y la expansión 3 → 4 baja hacia la derecha. Los tramos 2 → 3 y 4 → 1 son horizontales porque ocurren a presión constante. En el diagrama "),
    run("Temperatura-Entropía (T-s)", { bold: true }),
    run(", las etapas isentrópicas aparecen verticales. La adición de calor aumenta temperatura y entropía; el rechazo de calor reduce ambas."),
  ]),
  imageParagraph(
    "figura_resumen_pv_ts.png",
    imgWidth,
    "Figura 2. Diagramas P-v y T-s del ciclo Brayton ideal",
    "Diagramas pedagógicos del ciclo Brayton ideal con los estados 1, 2, 3 y 4."
  ),
  caption("Figura 2. Diagramas P-v y T-s del ciclo Brayton ideal."),
  note("Nota. Los estados 1, 2, 3 y 4 son iguales en ambos gráficos. Los valores de los ejes tienen finalidad pedagógica. Elaboración propia."),
  body("Las variables que más se usan en este análisis son la temperatura, que indica el nivel térmico; la presión, fuerza por unidad de área; el volumen específico, volumen por kilogramo; la entropía, útil para reconocer irreversibilidades; la entalpía, que sirve para calcular cambios de energía; y el calor y el trabajo, que son formas de transferencia de energía. Las unidades habituales son K, kPa, m³/kg, kJ/(kg·K) y kJ/kg."),
  body("Una lectura práctica de los gráficos es esta: si un proceso es vertical en T-s, no cambia la entropía; si es horizontal en P-v, no cambia la presión. Con esa regla se puede reconstruir el ciclo aunque uno se ponga nervioso en la exposición.")
);

children.push(
  h2("2.4 Trabajo, relación de presiones y eficiencia"),
  body("Con aire ideal y un calor específico a presión constante aproximadamente uniforme, el trabajo específico del compresor y de la turbina se puede calcular a partir de las temperaturas:"),
  eq([
    run("w", { italics: true, size: 24 }),
    run("c", { italics: true, sub: true, size: 24 }),
    run(" = ", { size: 24 }),
    run("c", { italics: true, size: 24 }),
    run("p", { italics: true, sub: true, size: 24 }),
    run(" (", { size: 24 }),
    run("T", { italics: true, size: 24 }),
    run("2", { italics: true, sub: true, size: 24 }),
    run(" − ", { size: 24 }),
    run("T", { italics: true, size: 24 }),
    run("1", { italics: true, sub: true, size: 24 }),
    run(")", { size: 24 }),
  ]),
  eq([
    run("w", { italics: true, size: 24 }),
    run("t", { italics: true, sub: true, size: 24 }),
    run(" = ", { size: 24 }),
    run("c", { italics: true, size: 24 }),
    run("p", { italics: true, sub: true, size: 24 }),
    run(" (", { size: 24 }),
    run("T", { italics: true, size: 24 }),
    run("3", { italics: true, sub: true, size: 24 }),
    run(" − ", { size: 24 }),
    run("T", { italics: true, size: 24 }),
    run("4", { italics: true, sub: true, size: 24 }),
    run(")", { size: 24 }),
  ]),
  body("El compresor consume trabajo y la turbina lo produce. Por eso, el trabajo que queda disponible antes de las pérdidas mecánicas y eléctricas es:"),
  eq([
    run("w", { italics: true, size: 24 }),
    run("neto", { italics: true, sub: true, size: 24 }),
    run(" = ", { size: 24 }),
    run("w", { italics: true, size: 24 }),
    run("t", { italics: true, sub: true, size: 24 }),
    run(" − ", { size: 24 }),
    run("w", { italics: true, size: 24 }),
    run("c", { italics: true, sub: true, size: 24 }),
  ]),
  body([
    run("La relación de presiones compara la presión absoluta de salida y entrada del compresor, "),
    run("r", { italics: true }),
    run("p", { italics: true, sub: true }),
    run(" = "),
    run("P", { italics: true }),
    run("2", { italics: true, sub: true }),
    run("/"),
    run("P", { italics: true }),
    run("1", { italics: true, sub: true }),
    run(". Si aumenta, normalmente también suben la temperatura después de la compresión y el trabajo que pide el compresor. En el modelo ideal, con gas ideal, calores específicos constantes y procesos isentrópicos, la eficiencia térmica se expresa como:"),
  ]),
  eq([
    run("η", { size: 24 }),
    run("ideal", { italics: true, sub: true, size: 24 }),
    run(" = 1 − 1 / ", { size: 24 }),
    run("r", { italics: true, size: 24 }),
    run("p", { italics: true, sub: true, size: 24 }),
    run("((γ − 1)/γ)", { sup: true, size: 24 }),
  ]),
  body("Esta ecuación indica que una relación de presiones mayor puede elevar la eficiencia ideal. No hay que confundirla con una garantía para la máquina real, porque también influyen la temperatura máxima, las pérdidas, la eficiencia de los componentes y las condiciones ambientales (Moran et al., 2018). En simple: el modelo sirve para entender la tendencia, no para copiar el rendimiento de una central.")
);

const t1 = [2000, 2800, CONTENT_W - 4800];
children.push(
  h2("2.5 Ejemplo numérico resumido"),
  body([
    run("Se utilizan "),
    run("T", { italics: true }),
    run("1", { italics: true, sub: true }),
    run(" = 300 K, "),
    run("T", { italics: true }),
    run("2", { italics: true, sub: true }),
    run(" = 450 K, "),
    run("T", { italics: true }),
    run("3", { italics: true, sub: true }),
    run(" = 1.200 K, "),
    run("T", { italics: true }),
    run("4", { italics: true, sub: true }),
    run(" = 800 K y "),
    run("c", { italics: true }),
    run("p", { italics: true, sub: true }),
    run(" = 1,005 kJ/(kg·K). Los valores son coherentes con un mismo ciclo Brayton ideal."),
  ]),
  caption("Tabla 1. Resultados del ejemplo numérico"),
  makeTable(t1, [
    new TableRow({
      tableHeader: true,
      cantSplit: true,
      children: [
        textCell("Cálculo", t1[0], { header: true }),
        textCell("Procedimiento", t1[1], { header: true }),
        textCell("Resultado", t1[2], { header: true }),
      ],
    }),
    new TableRow({
      children: [
        textCell("Compresor", t1[0], { alt: true }),
        textCell("1,005 (450 − 300)", t1[1], { alt: true, align: AlignmentType.CENTER }),
        richCell(
          [
            run("w", { italics: true, size: 20 }),
            run("c", { italics: true, sub: true, size: 20 }),
            run(" = 150,75 kJ/kg", { size: 20 }),
          ],
          t1[2],
          { alt: true }
        ),
      ],
    }),
    new TableRow({
      children: [
        textCell("Turbina", t1[0]),
        textCell("1,005 (1.200 − 800)", t1[1], { align: AlignmentType.CENTER }),
        richCell(
          [
            run("w", { italics: true, size: 20 }),
            run("t", { italics: true, sub: true, size: 20 }),
            run(" = 402,00 kJ/kg", { size: 20 }),
          ],
          t1[2]
        ),
      ],
    }),
    new TableRow({
      children: [
        textCell("Trabajo neto", t1[0], { alt: true }),
        textCell("402,00 − 150,75", t1[1], { alt: true, align: AlignmentType.CENTER }),
        richCell(
          [
            run("w", { italics: true, size: 20 }),
            run("neto", { italics: true, sub: true, size: 20 }),
            run(" = 251,25 kJ/kg", { size: 20 }),
          ],
          t1[2],
          { alt: true }
        ),
      ],
    }),
    new TableRow({
      children: [
        textCell("Calor agregado", t1[0]),
        textCell("1,005 (1.200 − 450)", t1[1], { align: AlignmentType.CENTER }),
        richCell(
          [
            run("q", { italics: true, size: 20 }),
            run("in", { italics: true, sub: true, size: 20 }),
            run(" = 753,75 kJ/kg", { size: 20 }),
          ],
          t1[2]
        ),
      ],
    }),
    new TableRow({
      children: [
        textCell("Eficiencia", t1[0], { alt: true }),
        textCell("251,25 / 753,75", t1[1], { alt: true, align: AlignmentType.CENTER }),
        textCell("η = 33,33 %", t1[2], { alt: true }),
      ],
    }),
  ]),
  spacer(160),
  body("El resultado se lee así: la turbina produce 402,00 kJ por kilogramo, pero 150,75 kJ/kg vuelven al compresor. Por eso solo quedan 251,25 kJ/kg como trabajo neto ideal. Si en la exposición preguntan por qué el rendimiento no es más alto, la respuesta corta es que una parte importante de la energía se va en comprimir el aire y otra parte se rechaza con los gases de escape.")
);

const t2 = [1900, 3302, CONTENT_W - 5202];
children.push(
  h2("2.6 Diferencias entre el ciclo ideal y el real"),
  caption("Tabla 2. Comparación entre el modelo ideal y una turbina real"),
  makeTable(t2, [
    new TableRow({
      tableHeader: true,
      cantSplit: true,
      children: [
        textCell("Aspecto", t2[0], { header: true }),
        textCell("Ciclo ideal", t2[1], { header: true }),
        textCell("Ciclo real", t2[2], { header: true }),
      ],
    }),
    new TableRow({
      children: [
        textCell("Compresor", t2[0], { alt: true, bold: true }),
        textCell("Isentrópico; mínimo trabajo teórico.", t2[1], { alt: true }),
        textCell("Fricción y turbulencia; necesita más trabajo.", t2[2], { alt: true }),
      ],
    }),
    new TableRow({
      children: [
        textCell("Combustión", t2[0], { bold: true }),
        textCell("Calor agregado a presión constante.", t2[1]),
        textCell("Hay caída de presión y composición variable.", t2[2]),
      ],
    }),
    new TableRow({
      children: [
        textCell("Turbina", t2[0], { alt: true, bold: true }),
        textCell("Expansión isentrópica; máximo trabajo teórico.", t2[1], { alt: true }),
        textCell("Produce menos trabajo y aumenta la entropía.", t2[2], { alt: true }),
      ],
    }),
    new TableRow({
      children: [
        textCell("Conjunto", t2[0], { bold: true }),
        textCell("Sin pérdidas mecánicas ni térmicas.", t2[1]),
        textCell("Presenta fricción, fugas, calor perdido y auxiliares.", t2[2]),
      ],
    }),
  ]),
  spacer(160),
  body("Esta comparación es de las más útiles para la asignatura. El ciclo ideal sirve como referencia, pero la máquina real siempre se aleja de ese dibujo. Si se afirma que una turbina “cumple Brayton” de manera perfecta, se está mezclando el modelo con el equipo.")
);

children.push(
  h2("2.7 Generación eléctrica, aplicaciones y ciclo combinado"),
  body("En una central, la expansión hace girar el eje de la turbina. Ese eje mueve el rotor de un generador dentro de un campo magnético y produce energía eléctrica por inducción. La cadena principal es: energía química → energía térmica → energía mecánica → energía eléctrica. En cada conversión existen pérdidas, por lo que la electricidad obtenida es menor que la energía inicial del combustible. Esta parte conecta directamente con máquinas eléctricas y con el tema de eficiencia que se trabaja en la carrera."),
  imageParagraph(
    "figura_4_conversion_energetica.png",
    imgWidth,
    "Figura 3. Conversión de energía en una turbina a gas con generador",
    "Cadena de conversión desde el combustible hasta la electricidad, con pérdidas intermedias."
  ),
  caption("Figura 3. Conversión de energía en una turbina a gas con generador."),
  note("Nota. Parte de la energía se pierde como calor, fricción y pérdidas eléctricas. Elaboración propia."),
  body("Las aplicaciones más conocidas son las turbinas estacionarias, centrales de ciclo simple, equipos de respaldo, turbinas industriales y motores aeronáuticos. La alta relación potencia/peso es especialmente útil en aviación. Algunas unidades de generación pueden responder con rapidez, dependiendo de la instalación."),
  body("Una central de ciclo combinado Brayton-Rankine aprovecha los gases calientes del escape en una caldera de recuperación. El calor produce vapor, el vapor mueve otra turbina y se genera electricidad adicional. Así se aprovecha mejor el combustible que en un ciclo simple. En promedios operacionales analizados por la U.S. Energy Information Administration (2022), las unidades combinadas necesitaron menos energía de combustible por kWh que las unidades de ciclo simple."),
  caption("Tabla 3. Ventajas y limitaciones principales"),
);

const t3 = [Math.round(CONTENT_W / 2), CONTENT_W - Math.round(CONTENT_W / 2)];
children.push(
  makeTable(t3, [
    new TableRow({
      tableHeader: true,
      cantSplit: true,
      children: [
        textCell("Ventajas", t3[0], { header: true }),
        textCell("Desventajas", t3[1], { header: true }),
      ],
    }),
    new TableRow({
      children: [
        textCell("Flujo continuo y buena relación potencia/peso.", t3[0], { alt: true }),
        textCell("Altas temperaturas y exigencias de materiales.", t3[1], { alt: true }),
      ],
    }),
    new TableRow({
      children: [
        textCell("Sirve para electricidad, propulsión o potencia industrial.", t3[0]),
        textCell("El compresor consume una parte importante del trabajo.", t3[1]),
      ],
    }),
    new TableRow({
      children: [
        textCell("El escape puede aprovecharse en ciclo combinado.", t3[0], { alt: true }),
        textCell("La eficiencia disminuye fuera del punto de diseño.", t3[1], { alt: true }),
      ],
    }),
    new TableRow({
      children: [
        textCell("Puede estudiar fuentes de calor alternativas.", t3[0]),
        textCell("Con combustibles fósiles existen CO₂, NOₓ y otras emisiones.", t3[1]),
      ],
    }),
  ]),
  spacer(160)
);

children.push(
  h2("2.8 Relación con energías renovables"),
  body([
    run("El ciclo Brayton ", { }),
    run("no es renovable por sí mismo", { bold: true }),
    run(". Su clasificación depende del combustible o de la fuente de calor. Las turbinas tradicionales usan principalmente combustibles fósiles; el gas natural emite menos CO₂ por unidad de energía que el carbón, pero sigue generando emisiones y su cadena puede presentar fugas de metano (U.S. Energy Information Administration, 2024)."),
  ]),
  body("Se estudian alternativas con hidrógeno, biogás, combustibles sintéticos, calor solar y ciclos cerrados. Algunas mezclas tienen usos selectivos, pero el hidrógeno puro y varios ciclos avanzados siguen en desarrollo. En solar térmica comercial predomina Rankine; Brayton es una alternativa investigada (U.S. Department of Energy, s. f.-a, 2021). Por eso hay que diferenciar la turbina, que es una tecnología madura, de la fuente energética, que puede ser fósil o emergente."),
  body("Para la carrera de Electricidad y Energías Renovables este punto es clave: una cosa es el convertidor y otra es el origen de la energía. El mismo ciclo puede quemar gas natural o, en esquemas todavía menos masivos, aprovechar calor solar o combustibles de menor impacto. El modelo termodinámico no cambia de nombre por eso.")
);

children.push(
  h2("2.9 Apoyo para la disertación"),
  new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders,
            width: { size: CONTENT_W, type: WidthType.DXA },
            shading: { fill: PALE_ORANGE, type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children: [
              new Paragraph({
                spacing: { after: 80, line: 276 },
                children: [run("Analogía para recordar el orden", { bold: true, size: 22, color: NAVY })],
              }),
              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                spacing: { after: 0, line: 360 },
                children: [
                  run(
                    "Se puede imaginar una bomba de bicicleta, un calentador ideal y un molinete. La bomba representa la compresión; el calentamiento agrega energía; el aire expandido hace girar el molinete; y la descarga representa el escape. La comparación ayuda a recordar el orden, pero una turbina real trabaja con flujo continuo y condiciones mucho más exigentes.",
                    { size: 22 }
                  ),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  }),
  spacer(160),
  qaItem(
    "1",
    "¿Qué diferencia existe entre compresor y turbina?",
    "El compresor recibe trabajo para elevar la presión; la turbina recibe gases calientes y entrega trabajo durante la expansión."
  ),
  qaItem(
    "2",
    "¿Por qué sube la temperatura al comprimir aire?",
    "Porque el trabajo realizado sobre el aire aumenta su energía interna y su entalpía."
  ),
  qaItem(
    "3",
    "¿Qué significa isentrópico?",
    "Que la entropía permanece constante en el modelo ideal."
  ),
  qaItem(
    "4",
    "¿Dónde aparece el trabajo útil?",
    "En la diferencia entre el trabajo producido por la turbina y el consumido por el compresor."
  ),
  qaItem(
    "5",
    "¿Por qué el ciclo real rinde menos?",
    "Por fricción, turbulencia, caídas de presión, pérdidas térmicas y eficiencias imperfectas."
  ),
  qaItem(
    "6",
    "¿Qué aporta el ciclo combinado?",
    "Utiliza el escape Brayton para producir vapor y trabajo adicional mediante un ciclo Rankine."
  ),
  qaItem(
    "7",
    "¿El ciclo Brayton es renovable?",
    "No necesariamente; depende del combustible o de la fuente térmica utilizada."
  )
);

// ---------------------------------------------------------------------------
// 3. CONCLUSIÓN
// ---------------------------------------------------------------------------
children.push(
  h1("3. Conclusión"),
  body("Después de revisar el tema, el ciclo Brayton queda como una forma ordenada de entender la turbina a gas. Sus cuatro procesos son compresión isentrópica, adición de calor a presión constante, expansión isentrópica y rechazo de calor a presión constante. Los diagramas P-v y T-s ayudan a visualizar los cambios de presión, volumen, temperatura y entropía, y por eso conviene tenerlos a mano en la exposición."),
  body("El compresor eleva la presión del aire, pero necesita trabajo. La combustión agrega energía y la turbina transforma parte de ella en rotación. El trabajo neto es la diferencia entre lo que produce la turbina y lo que consume el compresor. La eficiencia expresa qué parte del calor agregado termina como trabajo útil. En el ejemplo de este informe esa fracción fue de 33,33 % en el modelo ideal."),
  body("En una instalación real aparecen pérdidas y los procesos dejan de ser perfectos. Por eso es importante usar el ciclo ideal como referencia, pero no confundirlo con el rendimiento verdadero de una máquina. La relación de presiones, las temperaturas, los materiales y la eficiencia de los componentes deben mirarse en conjunto."),
  body("Finalmente, el ciclo Brayton tiene una relación directa con la generación eléctrica y puede mejorar su aprovechamiento mediante un ciclo combinado. También puede vincularse con hidrógeno, biocombustibles o calor solar, aunque estas alternativas presentan distintos grados de madurez. La idea que me parece más importante para cerrar es esta: Brayton describe una forma de convertir energía, no una fuente renovable por sí sola.")
);

// ---------------------------------------------------------------------------
// 4. BIBLIOGRAFÍA
// ---------------------------------------------------------------------------
function biblio(parts) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { line: 360, lineRule: "auto", after: 200 },
    indent: { left: 720, hanging: 720 },
    children: parts,
  });
}

children.push(
  h1("4. Bibliografía"),
  biblio([
    run("Çengel, Y. A., Boles, M. A., & Kanoğlu, M. (2019). "),
    run("Thermodynamics: An engineering approach", { italics: true }),
    run(" (9th ed.). McGraw-Hill Education."),
  ]),
  biblio([
    run("Moran, M. J., Shapiro, H. N., Boettner, D. D., & Bailey, M. B. (2018). "),
    run("Fundamentals of engineering thermodynamics", { italics: true }),
    run(" (9th ed.). Wiley."),
  ]),
  biblio([
    run("National Aeronautics and Space Administration. (2021, 13 de mayo). "),
    run("Turbine engine thermodynamic cycle - Brayton cycle", { italics: true }),
    run(". NASA Glenn Research Center. "),
    hyperlink(
      "https://www.grc.nasa.gov/www/k-12/airplane/brayton.html",
      "https://www.grc.nasa.gov/www/k-12/airplane/brayton.html"
    ),
  ]),
  biblio([
    run("U.S. Department of Energy. (s. f.-a). "),
    run("Concentrating solar-thermal power (CSP) power cycles", { italics: true }),
    run(". "),
    hyperlink(
      "https://www.energy.gov/cmei/systems/concentrating-solar-thermal-power-csp-power-cycles",
      "https://www.energy.gov/cmei/systems/concentrating-solar-thermal-power-csp-power-cycles"
    ),
  ]),
  biblio([
    run("U.S. Department of Energy. (s. f.-b). "),
    run("How gas turbine power plants work", { italics: true }),
    run(". "),
    hyperlink(
      "https://www.energy.gov/hgeo/how-gas-turbine-power-plants-work",
      "https://www.energy.gov/hgeo/how-gas-turbine-power-plants-work"
    ),
  ]),
  biblio([
    run("U.S. Department of Energy. (2021, 12 de mayo). "),
    run(
      "Project selections: University Turbines Systems Research (UTSR) - Focus on hydrogen (H2) fuels",
      { italics: true }
    ),
    run(". "),
    hyperlink(
      "https://www.energy.gov/hgeo/articles/project-selections-university-turbines-systems-research-utsr-focus-hydrogen-h2-fuels",
      "https://www.energy.gov/hgeo/articles/project-selections-university-turbines-systems-research-utsr-focus-hydrogen-h2-fuels"
    ),
  ]),
  biblio([
    run("U.S. Energy Information Administration. (2022, 25 de abril). "),
    run(
      "Most combined-cycle power plants employ two combustion turbines with one steam turbine",
      { italics: true }
    ),
    run(". "),
    hyperlink(
      "https://www.eia.gov/todayinenergy/detail.php?id=52158",
      "https://www.eia.gov/todayinenergy/detail.php?id=52158"
    ),
  ]),
  biblio([
    run("U.S. Energy Information Administration. (2024, 16 de abril). "),
    run("Natural gas and the environment", { italics: true }),
    run(". "),
    hyperlink(
      "https://www.eia.gov/energyexplained/natural-gas/natural-gas-and-the-environment.php",
      "https://www.eia.gov/energyexplained/natural-gas/natural-gas-and-the-environment.php"
    ),
  ])
);

const doc = new Document({
  creator: STUDENT_NAME,
  title: "Informe Ciclo Brayton — Taller de Energía II",
  description: "Informe académico editable sobre el ciclo Brayton.",
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 22 },
      },
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: NAVY },
        paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 0 },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: BLUE },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 },
      },
      {
        id: "Normal",
        name: "Normal",
        run: { font: "Arial", size: 22, color: INK },
        paragraph: {
          alignment: AlignmentType.JUSTIFIED,
          spacing: { line: 360, lineRule: "auto" },
        },
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: A4_W, height: A4_H },
          margin: {
            top: MARGIN_TB,
            bottom: MARGIN_TB,
            left: MARGIN_LR,
            right: MARGIN_LR,
          },
        },
        titlePage: true,
      },
      headers: {
        first: new Header({
          children: [new Paragraph({ children: [run("")] })],
        }),
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              border: {
                bottom: { style: BorderStyle.SINGLE, size: 8, color: LINE, space: 6 },
              },
              spacing: { after: 80 },
              children: [
                run("Ciclo Brayton  ·  Taller de Energía II", { size: 16, color: MID }),
              ],
            }),
          ],
        }),
      },
      footers: {
        first: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [run("")],
            }),
          ],
        }),
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              border: {
                top: { style: BorderStyle.SINGLE, size: 8, color: LINE, space: 8 },
              },
              spacing: { before: 80 },
              children: [
                run("Página ", { size: 16, color: MID }),
                new TextRun({
                  children: [PageNumber.CURRENT],
                  font: "Arial",
                  size: 16,
                  color: MID,
                }),
              ],
            }),
          ],
        }),
      },
      children,
    },
  ],
});

fs.mkdirSync(path.dirname(OUTPUT_DOCX), { recursive: true });

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(OUTPUT_DOCX, buffer);
  console.log("DOCX escrito:", OUTPUT_DOCX);
  console.log("Bytes:", buffer.length);
});
