#!/usr/bin/env python3
"""Genera una versión sintetizada de siete páginas del informe Brayton."""

from __future__ import annotations

from pathlib import Path
import hashlib

from PIL import Image, ImageOps
from pypdf import PdfReader

import generate_report as report


SOURCE_7 = report.ROOT / "informe" / "Informe_Ciclo_Brayton_7_paginas_fuente.md"
OUTPUT_7 = report.OUTPUT_DIR / "Informe_Ciclo_Brayton_7_paginas.pdf"
COMPOSITE_FIGURE = report.FIGURES_DIR / "figura_resumen_pv_ts.png"


def generate_composite_figure() -> None:
    """Combina los diagramas P-v y T-s originales en una figura horizontal."""
    source_paths = [
        report.FIGURES_DIR / "figura_2_diagrama_pv.png",
        report.FIGURES_DIR / "figura_3_diagrama_ts.png",
    ]
    images = [Image.open(path).convert("RGB") for path in source_paths]
    try:
        target_height = 1180
        resized = []
        for image in images:
            width = round(image.width * target_height / image.height)
            resized.append(image.resize((width, target_height), Image.Resampling.LANCZOS))

        gap = 48
        margin = 36
        canvas_width = sum(image.width for image in resized) + gap + 2 * margin
        canvas_height = target_height + 2 * margin
        canvas = Image.new("RGB", (canvas_width, canvas_height), "white")
        x = margin
        for image in resized:
            framed = ImageOps.expand(image, border=1, fill="#D6DDE2")
            canvas.paste(framed, (x, margin))
            x += framed.width + gap
        canvas.save(COMPOSITE_FIGURE, dpi=(320, 320), optimize=True)
    finally:
        for image in images:
            image.close()


def main() -> None:
    original_pdf = report.OUTPUT_DIR / "Informe_Ciclo_Brayton.pdf"
    original_hash = hashlib.sha256(original_pdf.read_bytes()).hexdigest()
    if original_pdf.resolve() == OUTPUT_7.resolve():
        raise RuntimeError("La salida breve no puede coincidir con el informe original.")

    report.SOURCE_MD = SOURCE_7
    report.OUTPUT_PDF = OUTPUT_7
    report.ensure_dependencies()
    report.FIGURES_DIR.mkdir(parents=True, exist_ok=True)
    report.OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    report.TMP_DIR.mkdir(parents=True, exist_ok=True)
    report.register_fonts()
    report.verify_calculations()
    report.generate_figures()
    generate_composite_figure()
    report.generate_pdf()

    pages = len(PdfReader(str(OUTPUT_7)).pages)
    if pages != 7:
        raise RuntimeError(f"La versión sintetizada debe tener 7 páginas y generó {pages}.")
    if hashlib.sha256(original_pdf.read_bytes()).hexdigest() != original_hash:
        raise RuntimeError("El PDF original cambió durante la generación de la copia breve.")

    print(f"PDF sintetizado generado: {OUTPUT_7}")
    print("Paginación verificada: 7 páginas exactas")


if __name__ == "__main__":
    main()
