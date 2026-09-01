#!/usr/bin/env python3
"""Genera el informe académico editable y el PDF final sobre el ciclo Brayton."""

from __future__ import annotations

import math
import os
import re
from pathlib import Path


# -----------------------------------------------------------------------------
# DATOS EDITABLES DE PORTADA
# Modifique solamente estas variables para personalizar el informe.
# -----------------------------------------------------------------------------
STUDENT_NAME = "[COMPLETAR NOMBRE DEL ESTUDIANTE]"
TEACHER_NAME = "[COMPLETAR NOMBRE DEL DOCENTE]"
COURSE = "Taller de Energía"
CAREER = "[COMPLETAR NOMBRE OFICIAL DE LA CARRERA]"
INSTITUTION = "[COMPLETAR INSTITUCIÓN]"
DELIVERY_DATE = "[COMPLETAR FECHA]"


ROOT = Path(__file__).resolve().parents[1]
SOURCE_MD = ROOT / "informe" / "Informe_Ciclo_Brayton_fuente.md"
FIGURES_DIR = ROOT / "figures"
OUTPUT_DIR = ROOT / "output"
OUTPUT_PDF = OUTPUT_DIR / "Informe_Ciclo_Brayton.pdf"
TMP_DIR = ROOT / "tmp"

os.environ.setdefault("MPLCONFIGDIR", str(TMP_DIR / "mplconfig"))

import matplotlib  # noqa: E402

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
import numpy as np  # noqa: E402
from matplotlib import font_manager  # noqa: E402
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch, Polygon  # noqa: E402
from PIL import Image as PILImage  # noqa: E402
from reportlab.lib import colors  # noqa: E402
from reportlab.lib.colors import HexColor  # noqa: E402
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT  # noqa: E402
from reportlab.lib.pagesizes import A4  # noqa: E402
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet  # noqa: E402
from reportlab.lib.units import cm  # noqa: E402
from reportlab.pdfbase import pdfmetrics  # noqa: E402
from reportlab.pdfbase.ttfonts import TTFont  # noqa: E402
from reportlab.platypus import (  # noqa: E402
    HRFlowable,
    Image,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


# Paleta sobria para informe académico.
NAVY = HexColor("#18324B")
BLUE = HexColor("#2B5D7D")
TEAL = HexColor("#377F87")
ORANGE = HexColor("#D77732")
INK = HexColor("#1F252B")
MID_GRAY = HexColor("#66717A")
LIGHT_GRAY = HexColor("#E9EEF2")
PALE_BLUE = HexColor("#F2F6F9")
PALE_ORANGE = HexColor("#FFF4EA")
GRID = HexColor("#AAB6BF")


ARIAL_REGULAR = Path("/System/Library/Fonts/Supplemental/Arial.ttf")
ARIAL_BOLD = Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf")
ARIAL_ITALIC = Path("/System/Library/Fonts/Supplemental/Arial Italic.ttf")
ARIAL_BOLD_ITALIC = Path("/System/Library/Fonts/Supplemental/Arial Bold Italic.ttf")


def ensure_dependencies() -> None:
    """Comprueba recursos imprescindibles antes de crear el artefacto."""
    missing = [
        str(path)
        for path in (ARIAL_REGULAR, ARIAL_BOLD, ARIAL_ITALIC, ARIAL_BOLD_ITALIC)
        if not path.exists()
    ]
    if missing:
        raise FileNotFoundError(f"No se encontraron las fuentes Arial: {missing}")
    if not SOURCE_MD.exists():
        raise FileNotFoundError(f"No se encontró el fuente Markdown: {SOURCE_MD}")


def register_fonts() -> None:
    pdfmetrics.registerFont(TTFont("Arial", str(ARIAL_REGULAR)))
    pdfmetrics.registerFont(TTFont("Arial-Bold", str(ARIAL_BOLD)))
    pdfmetrics.registerFont(TTFont("Arial-Italic", str(ARIAL_ITALIC)))
    pdfmetrics.registerFont(TTFont("Arial-BoldItalic", str(ARIAL_BOLD_ITALIC)))
    pdfmetrics.registerFontFamily(
        "Arial",
        normal="Arial",
        bold="Arial-Bold",
        italic="Arial-Italic",
        boldItalic="Arial-BoldItalic",
    )


def configure_matplotlib_fonts() -> None:
    for path in (ARIAL_REGULAR, ARIAL_BOLD, ARIAL_ITALIC, ARIAL_BOLD_ITALIC):
        font_manager.fontManager.addfont(str(path))
    plt.rcParams.update(
        {
            "font.family": "Arial",
            "font.size": 10,
            "axes.titlesize": 12,
            "axes.labelsize": 10,
            "xtick.labelsize": 9,
            "ytick.labelsize": 9,
            "figure.facecolor": "white",
            "savefig.facecolor": "white",
        }
    )


def add_line_arrow(ax, x, y, position=0.55, color="#18324B") -> None:
    """Agrega una flecha corta sobre una curva para mostrar su sentido."""
    idx = max(0, min(len(x) - 2, int((len(x) - 1) * position)))
    ax.annotate(
        "",
        xy=(x[idx + 1], y[idx + 1]),
        xytext=(x[idx], y[idx]),
        arrowprops=dict(arrowstyle="->", color=color, lw=1.8),
    )


def generate_figure_1() -> None:
    fig, ax = plt.subplots(figsize=(11.2, 4.3))
    ax.set_xlim(0, 11.2)
    ax.set_ylim(0, 4.3)
    ax.axis("off")

    boxes = [
        (0.35, 1.55, 1.45, 1.05, "Admisión\ny filtro", "#DCEAF2"),
        (2.15, 1.35, 1.65, 1.45, "Compresor", "#D7E8F2"),
        (4.25, 1.25, 1.85, 1.65, "Cámara de\ncombustión", "#FBE2CB"),
        (6.55, 1.35, 1.65, 1.45, "Turbina", "#F7D7C1"),
        (8.65, 1.55, 1.35, 1.05, "Escape", "#E8ECEF"),
        (9.15, 3.1, 1.65, 0.72, "Generador", "#DDECE7"),
    ]
    for x, y, w, h, label, fill in boxes:
        patch = FancyBboxPatch(
            (x, y),
            w,
            h,
            boxstyle="round,pad=0.04,rounding_size=0.08",
            linewidth=1.3,
            edgecolor="#36505F",
            facecolor=fill,
        )
        ax.add_patch(patch)
        ax.text(x + w / 2, y + h / 2, label, ha="center", va="center", fontsize=14, weight="bold")

    connectors = [
        ((1.8, 2.08), (2.15, 2.08), "#2B6F97"),
        ((3.8, 2.08), (4.25, 2.08), "#2B6F97"),
        ((6.1, 2.08), (6.55, 2.08), "#D77732"),
        ((8.2, 2.08), (8.65, 2.08), "#D77732"),
    ]
    for start, end, color in connectors:
        ax.add_patch(FancyArrowPatch(start, end, arrowstyle="-|>", mutation_scale=14, lw=2.2, color=color))

    ax.text(0.45, 2.85, "Aire ambiente", color="#2B6F97", fontsize=12)
    ax.text(7.85, 2.85, "Gases calientes", color="#B85E20", fontsize=12)

    ax.add_patch(FancyArrowPatch((5.18, 3.72), (5.18, 2.94), arrowstyle="-|>", mutation_scale=14, lw=1.8, color="#B85E20"))
    ax.text(5.18, 3.93, "Combustible", ha="center", fontsize=12, color="#8A471B")

    ax.plot([2.98, 7.38], [0.88, 0.88], color="#5D6368", lw=4, solid_capstyle="round")
    ax.plot([2.98, 2.98], [0.88, 1.34], color="#5D6368", lw=3)
    ax.plot([7.38, 7.38], [0.88, 1.34], color="#5D6368", lw=3)
    ax.text(5.18, 0.48, "Eje común: la turbina mueve el compresor", ha="center", color="#50575D", fontsize=12)

    ax.add_patch(FancyArrowPatch((7.38, 0.88), (9.98, 3.08), arrowstyle="-|>", mutation_scale=14, lw=2.2, color="#5D6368"))
    ax.text(8.65, 1.05, "Trabajo útil", rotation=38, fontsize=12, color="#50575D")
    ax.text(9.98, 4.03, "Energía eléctrica", ha="center", fontsize=11.5, color="#2D675F")

    fig.tight_layout()
    fig.savefig(FIGURES_DIR / "figura_1_esquema_turbina_gas.png", dpi=320, bbox_inches="tight")
    plt.close(fig)


def generate_figure_2() -> None:
    gamma = 1.4
    p_low, p_high = 1.0, 5.0
    v1 = 1.0
    v2 = v1 * (p_low / p_high) ** (1 / gamma)
    v3 = 0.78
    v4 = v3 * (p_high / p_low) ** (1 / gamma)

    v12 = np.linspace(v1, v2, 120)
    p12 = p_low * (v1 / v12) ** gamma
    v23 = np.linspace(v2, v3, 80)
    p23 = np.full_like(v23, p_high)
    v34 = np.linspace(v3, v4, 150)
    p34 = p_high * (v3 / v34) ** gamma
    v41 = np.linspace(v4, v1, 100)
    p41 = np.full_like(v41, p_low)

    fig, ax = plt.subplots(figsize=(8.8, 5.6))
    ax.fill(
        np.r_[v12, v23, v34, v41],
        np.r_[p12, p23, p34, p41],
        color="#DDEAF1",
        alpha=0.65,
        zorder=0,
    )
    for x, y, color in (
        (v12, p12, "#285B7A"),
        (v23, p23, "#D77732"),
        (v34, p34, "#285B7A"),
        (v41, p41, "#D77732"),
    ):
        ax.plot(x, y, lw=2.4, color=color)
        add_line_arrow(ax, x, y, color=color)

    states = {"1": (v1, p_low), "2": (v2, p_high), "3": (v3, p_high), "4": (v4, p_low)}
    offsets = {"1": (-0.08, -0.35), "2": (-0.12, 0.22), "3": (0.08, 0.22), "4": (0.08, -0.35)}
    for label, (x, y) in states.items():
        ax.scatter([x], [y], s=45, color="#18324B", zorder=4)
        dx, dy = offsets[label]
        ax.text(x + dx, y + dy, label, fontsize=15, weight="bold", color="#18324B")

    ax.text(0.205, 3.25, "1 → 2\nCompresión\nisentrópica", fontsize=12.5, color="#285B7A", ha="left")
    ax.text((v2 + v3) / 2, p_high + 0.52, "2 → 3  Adición de calor a presión constante", ha="center", fontsize=12.5, color="#A4531E")
    ax.text(1.55, 3.0, "3 → 4\nExpansión\nisentrópica", fontsize=12.5, color="#285B7A")
    ax.text((v1 + v4) / 2, p_low - 0.62, "4 → 1  Rechazo de calor a presión constante", ha="center", fontsize=12.5, color="#A4531E")

    ax.set_xlabel("Volumen específico, v (m³/kg)")
    ax.set_ylabel("Presión, P (valor relativo)")
    ax.xaxis.label.set_size(13)
    ax.yaxis.label.set_size(13)
    ax.tick_params(labelsize=11)
    ax.set_xlim(0.18, v4 + 0.28)
    ax.set_ylim(0.15, 6.05)
    ax.grid(True, color="#D6DDE2", linewidth=0.7, alpha=0.8)
    ax.spines[["top", "right"]].set_visible(False)
    fig.tight_layout()
    fig.savefig(FIGURES_DIR / "figura_2_diagrama_pv.png", dpi=320, bbox_inches="tight")
    plt.close(fig)


def generate_figure_3() -> None:
    t1, t2, t3, t4 = 300.0, 450.0, 1200.0, 800.0
    cp = 1.005
    ds = cp * math.log(t3 / t2)
    s1, s2, s3, s4 = 0.0, 0.0, ds, ds

    t23 = np.linspace(t2, t3, 140)
    s23 = cp * np.log(t23 / t2)
    t41 = np.linspace(t4, t1, 120)
    s41 = ds + cp * np.log(t41 / t4)

    fig, ax = plt.subplots(figsize=(8.8, 5.6))
    x_poly = np.r_[np.full(70, s1), s23, np.full(70, s3), s41]
    y_poly = np.r_[np.linspace(t1, t2, 70), t23, np.linspace(t3, t4, 70), t41]
    ax.fill(x_poly, y_poly, color="#F4E7D8", alpha=0.72, zorder=0)

    s12 = np.full(70, s1)
    t12 = np.linspace(t1, t2, 70)
    s34 = np.full(70, s3)
    t34 = np.linspace(t3, t4, 70)
    for x, y, color in (
        (s12, t12, "#285B7A"),
        (s23, t23, "#D77732"),
        (s34, t34, "#285B7A"),
        (s41, t41, "#D77732"),
    ):
        ax.plot(x, y, lw=2.4, color=color)
        add_line_arrow(ax, x, y, color=color)

    states = {"1": (s1, t1), "2": (s2, t2), "3": (s3, t3), "4": (s4, t4)}
    offsets = {"1": (-0.055, -60), "2": (-0.055, 35), "3": (0.035, 20), "4": (0.035, -35)}
    for label, (x, y) in states.items():
        ax.scatter([x], [y], s=45, color="#18324B", zorder=4)
        dx, dy = offsets[label]
        ax.text(x + dx, y + dy, label, fontsize=15, weight="bold", color="#18324B")

    ax.text(-0.17, 405, "1 → 2\ns = constante", ha="left", fontsize=12.5, color="#285B7A")
    ax.text(ds * 0.47, 910, "2 → 3\nAdición de calor", ha="center", fontsize=12.5, color="#A4531E")
    ax.text(ds + 0.06, 1000, "3 → 4\ns = constante", fontsize=12.5, color="#285B7A")
    ax.text(ds * 0.52, 505, "4 → 1\nRechazo de calor", ha="center", fontsize=12.5, color="#A4531E")

    ax.set_xlabel("Entropía específica, s (kJ/(kg·K))")
    ax.set_ylabel("Temperatura, T (K)")
    ax.xaxis.label.set_size(13)
    ax.yaxis.label.set_size(13)
    ax.tick_params(labelsize=11)
    ax.set_xlim(-0.2, ds + 0.25)
    ax.set_ylim(180, 1300)
    ax.grid(True, color="#D6DDE2", linewidth=0.7, alpha=0.8)
    ax.spines[["top", "right"]].set_visible(False)
    fig.tight_layout()
    fig.savefig(FIGURES_DIR / "figura_3_diagrama_ts.png", dpi=320, bbox_inches="tight")
    plt.close(fig)


def generate_figure_4() -> None:
    fig, ax = plt.subplots(figsize=(11.2, 3.5))
    ax.set_xlim(0, 11.2)
    ax.set_ylim(0, 3.5)
    ax.axis("off")

    items = [
        (0.25, "Energía química", "Combustible", "#E9E4D5"),
        (3.0, "Energía térmica", "Gases calientes", "#F7DDC7"),
        (5.75, "Energía mecánica", "Eje de la turbina", "#DCE8F0"),
        (8.5, "Energía eléctrica", "Generador", "#DDECE7"),
    ]
    for x, title, subtitle, fill in items:
        box = FancyBboxPatch(
            (x, 1.25),
            2.15,
            1.1,
            boxstyle="round,pad=0.04,rounding_size=0.08",
            edgecolor="#435966",
            facecolor=fill,
            linewidth=1.2,
        )
        ax.add_patch(box)
        ax.text(x + 1.075, 1.92, title, ha="center", va="center", fontsize=14, weight="bold")
        ax.text(x + 1.075, 1.55, subtitle, ha="center", va="center", fontsize=12, color="#505A61")

    for x in (2.4, 5.15, 7.9):
        ax.add_patch(FancyArrowPatch((x, 1.8), (x + 0.47, 1.8), arrowstyle="-|>", mutation_scale=15, lw=2, color="#375E78"))

    ax.text(3.98, 0.55, "Pérdidas térmicas", ha="center", fontsize=11.5, color="#8A5B3B")
    ax.text(6.72, 0.55, "Fricción y auxiliares", ha="center", fontsize=11.5, color="#6A6260")
    ax.text(9.58, 0.55, "Pérdidas eléctricas", ha="center", fontsize=11.5, color="#4D6D67")
    for x in (3.98, 6.72, 9.58):
        ax.add_patch(FancyArrowPatch((x, 1.22), (x, 0.82), arrowstyle="-|>", mutation_scale=12, lw=1.4, color="#8B9297"))

    fig.tight_layout()
    fig.savefig(FIGURES_DIR / "figura_4_conversion_energetica.png", dpi=320, bbox_inches="tight")
    plt.close(fig)


def generate_figure_5() -> None:
    fig, ax = plt.subplots(figsize=(11.2, 4.7))
    ax.set_xlim(0, 11.2)
    ax.set_ylim(0, 4.7)
    ax.axis("off")

    ax.text(2.25, 4.36, "Ciclo Brayton", ha="center", fontsize=14, weight="bold", color="#214E69")
    ax.text(8.45, 4.36, "Ciclo Rankine", ha="center", fontsize=14, weight="bold", color="#7B4B27")

    components = [
        (0.3, 2.35, 1.35, 0.78, "Compresor", "#D7E8F2"),
        (1.95, 2.35, 1.45, 0.78, "Combustión", "#FBE2CB"),
        (3.72, 2.35, 1.25, 0.78, "Turbina\na gas", "#F7D7C1"),
        (5.45, 2.2, 1.55, 1.08, "HRSG\nCaldera de\nrecuperación", "#F5E9D8"),
        (7.55, 2.35, 1.45, 0.78, "Turbina\nde vapor", "#E6E1ED"),
        (9.43, 2.35, 1.4, 0.78, "Generador", "#DDECE7"),
        (7.7, 0.7, 1.25, 0.65, "Condensador", "#DDEAF2"),
        (5.7, 0.7, 1.05, 0.65, "Bomba", "#DDEAF2"),
    ]
    for x, y, w, h, label, fill in components:
        box = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.03,rounding_size=0.06", edgecolor="#44545E", facecolor=fill, linewidth=1.1)
        ax.add_patch(box)
        ax.text(x + w / 2, y + h / 2, label, ha="center", va="center", fontsize=12.5, weight="bold")

    for start, end, color in (
        ((1.65, 2.74), (1.95, 2.74), "#2B6F97"),
        ((3.4, 2.74), (3.72, 2.74), "#D77732"),
        ((4.97, 2.74), (5.45, 2.74), "#D77732"),
        ((7.0, 2.74), (7.55, 2.74), "#A96833"),
        ((9.0, 2.74), (9.43, 2.74), "#5C5269"),
        ((8.28, 2.34), (8.28, 1.37), "#5C78A0"),
        ((7.7, 1.02), (6.75, 1.02), "#5C78A0"),
        ((6.22, 1.35), (6.22, 2.18), "#5C78A0"),
    ):
        ax.add_patch(FancyArrowPatch(start, end, arrowstyle="-|>", mutation_scale=12, lw=1.8, color=color))

    ax.text(5.23, 3.22, "Escape caliente", ha="center", fontsize=11.5, color="#A4531E")
    ax.text(6.22, 1.58, "Agua", ha="left", fontsize=11, color="#365F80")
    ax.text(7.12, 3.2, "Vapor", ha="center", fontsize=11, color="#74554A")
    ax.text(10.14, 1.9, "Electricidad", ha="center", fontsize=11.5, color="#2D675F")
    ax.add_patch(FancyArrowPatch((10.14, 2.34), (10.14, 1.65), arrowstyle="-|>", mutation_scale=12, lw=1.5, color="#2D675F"))

    fig.tight_layout()
    fig.savefig(FIGURES_DIR / "figura_5_ciclo_combinado.png", dpi=320, bbox_inches="tight")
    plt.close(fig)


def generate_figures() -> None:
    FIGURES_DIR.mkdir(parents=True, exist_ok=True)
    configure_matplotlib_fonts()
    generate_figure_1()
    generate_figure_2()
    generate_figure_3()
    generate_figure_4()
    generate_figure_5()


def verify_calculations() -> None:
    """Verificación reproducible del ejercicio y de los puntos de los gráficos."""
    t1, t2, t3, t4 = 300.0, 450.0, 1200.0, 800.0
    cp, gamma = 1.005, 1.4
    wc = cp * (t2 - t1)
    wt = cp * (t3 - t4)
    wnet = wt - wc
    qin = cp * (t3 - t2)
    eta_balance = wnet / qin
    rp = (t2 / t1) ** (gamma / (gamma - 1))
    eta_rp = 1 - 1 / (rp ** ((gamma - 1) / gamma))

    assert math.isclose(wc, 150.75, abs_tol=1e-9)
    assert math.isclose(wt, 402.00, abs_tol=1e-9)
    assert math.isclose(wnet, 251.25, abs_tol=1e-9)
    assert math.isclose(qin, 753.75, abs_tol=1e-9)
    assert math.isclose(eta_balance, 1 / 3, abs_tol=1e-12)
    assert math.isclose(eta_balance, eta_rp, abs_tol=1e-12)
    assert math.isclose(t2 / t1, t3 / t4, abs_tol=1e-12)


def build_styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "Body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Arial",
            fontSize=11,
            leading=13.6,
            textColor=INK,
            alignment=TA_JUSTIFY,
            firstLineIndent=0.72 * cm,
            spaceAfter=4.0,
            splitLongWords=True,
            allowWidows=0,
            allowOrphans=0,
        ),
        "BodyNoIndent": ParagraphStyle(
            "BodyNoIndent",
            parent=base["BodyText"],
            fontName="Arial",
            fontSize=11,
            leading=13.6,
            textColor=INK,
            alignment=TA_JUSTIFY,
            firstLineIndent=0,
            spaceAfter=4.0,
            splitLongWords=True,
        ),
        "H1": ParagraphStyle(
            "H1",
            parent=base["Heading1"],
            fontName="Arial-Bold",
            fontSize=16,
            leading=19,
            textColor=NAVY,
            spaceBefore=5,
            spaceAfter=8,
            keepWithNext=True,
        ),
        "H2": ParagraphStyle(
            "H2",
            parent=base["Heading2"],
            fontName="Arial-Bold",
            fontSize=13,
            leading=16,
            textColor=BLUE,
            spaceBefore=9,
            spaceAfter=5.5,
            keepWithNext=True,
        ),
        "H3": ParagraphStyle(
            "H3",
            parent=base["Heading3"],
            fontName="Arial-Bold",
            fontSize=11.5,
            leading=14.0,
            textColor=NAVY,
            spaceBefore=6,
            spaceAfter=3,
            keepWithNext=True,
        ),
        "List": ParagraphStyle(
            "List",
            parent=base["BodyText"],
            fontName="Arial",
            fontSize=11,
            leading=13.0,
            textColor=INK,
            alignment=TA_LEFT,
            spaceAfter=1.0,
            splitLongWords=True,
        ),
        "Equation": ParagraphStyle(
            "Equation",
            parent=base["BodyText"],
            fontName="Arial",
            fontSize=11.5,
            leading=16,
            alignment=TA_CENTER,
            textColor=NAVY,
            spaceBefore=3,
            spaceAfter=5,
            keepWithNext=True,
        ),
        "FigureCaption": ParagraphStyle(
            "FigureCaption",
            parent=base["BodyText"],
            fontName="Arial-Bold",
            fontSize=9.5,
            leading=12,
            alignment=TA_LEFT,
            textColor=INK,
            spaceBefore=4,
            spaceAfter=2,
        ),
        "FigureNote": ParagraphStyle(
            "FigureNote",
            parent=base["BodyText"],
            fontName="Arial-Italic",
            fontSize=8.6,
            leading=10.8,
            alignment=TA_LEFT,
            textColor=MID_GRAY,
            spaceAfter=7,
        ),
        "TableCaption": ParagraphStyle(
            "TableCaption",
            parent=base["BodyText"],
            fontName="Arial-Bold",
            fontSize=9.5,
            leading=12,
            alignment=TA_LEFT,
            textColor=INK,
            spaceBefore=6,
            spaceAfter=4,
            keepWithNext=True,
        ),
        "TableCell": ParagraphStyle(
            "TableCell",
            parent=base["BodyText"],
            fontName="Arial",
            fontSize=8.5,
            leading=10.3,
            alignment=TA_LEFT,
            textColor=INK,
            spaceAfter=0,
            splitLongWords=True,
        ),
        "TableHead": ParagraphStyle(
            "TableHead",
            parent=base["BodyText"],
            fontName="Arial-Bold",
            fontSize=8.5,
            leading=10.2,
            alignment=TA_CENTER,
            textColor=NAVY,
            spaceAfter=0,
            splitLongWords=True,
        ),
        "Callout": ParagraphStyle(
            "Callout",
            parent=base["BodyText"],
            fontName="Arial",
            fontSize=10.2,
            leading=13.2,
            textColor=NAVY,
            alignment=TA_LEFT,
            spaceAfter=0,
            splitLongWords=True,
        ),
        "Reference": ParagraphStyle(
            "Reference",
            parent=base["BodyText"],
            fontName="Arial",
            fontSize=11,
            leading=14.3,
            textColor=INK,
            alignment=TA_LEFT,
            leftIndent=1.27 * cm,
            firstLineIndent=-1.27 * cm,
            spaceAfter=8,
            splitLongWords=True,
            wordWrap="LTR",
        ),
        "CoverKicker": ParagraphStyle(
            "CoverKicker",
            parent=base["BodyText"],
            fontName="Arial-Bold",
            fontSize=11.5,
            leading=14,
            textColor=TEAL,
            alignment=TA_CENTER,
            spaceAfter=12,
        ),
        "CoverTitle": ParagraphStyle(
            "CoverTitle",
            parent=base["Title"],
            fontName="Arial-Bold",
            fontSize=28,
            leading=32,
            textColor=NAVY,
            alignment=TA_CENTER,
            spaceAfter=8,
        ),
        "CoverSubtitle": ParagraphStyle(
            "CoverSubtitle",
            parent=base["BodyText"],
            fontName="Arial",
            fontSize=13,
            leading=17,
            textColor=MID_GRAY,
            alignment=TA_CENTER,
            spaceAfter=18,
        ),
        "CoverLabel": ParagraphStyle(
            "CoverLabel",
            parent=base["BodyText"],
            fontName="Arial-Bold",
            fontSize=10.5,
            leading=13,
            textColor=NAVY,
            alignment=TA_LEFT,
        ),
        "CoverValue": ParagraphStyle(
            "CoverValue",
            parent=base["BodyText"],
            fontName="Arial",
            fontSize=10.5,
            leading=13,
            textColor=INK,
            alignment=TA_LEFT,
        ),
    }


def inline_markup(text: str) -> str:
    """Convierte el subconjunto de Markdown usado por el fuente a XML de Paragraph."""
    # La fuente Arial de macOS no expone U+2082 de forma utilizable para
    # ReportLab. El subíndice XML conserva la notación química sin glifos vacíos.
    text = text.replace("CO₂", "CO<sub>2</sub>")
    text = text.replace(" & ", " &amp; ")
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<link href="\2" color="#245B78">\1</link>', text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<i>\1</i>", text)
    return text


def make_table(rows: list[list[str]], styles: dict[str, ParagraphStyle]) -> Table:
    col_count = len(rows[0])
    total_width = 15.75 * cm
    if col_count == 4:
        widths = [2.7 * cm, 4.75 * cm, 5.25 * cm, 3.05 * cm]
    elif col_count == 3:
        widths = [3.35 * cm, 4.65 * cm, 7.75 * cm]
    elif col_count == 2:
        widths = [7.875 * cm, 7.875 * cm]
    else:
        widths = [total_width / col_count] * col_count

    data = []
    for row_index, row in enumerate(rows):
        style = styles["TableHead"] if row_index == 0 else styles["TableCell"]
        data.append([Paragraph(inline_markup(cell), style) for cell in row])

    table = Table(data, colWidths=widths, repeatRows=1, hAlign="LEFT")
    commands = [
        ("BACKGROUND", (0, 0), (-1, 0), LIGHT_GRAY),
        ("TEXTCOLOR", (0, 0), (-1, 0), NAVY),
        ("GRID", (0, 0), (-1, -1), 0.55, GRID),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, HexColor("#FAFBFC")]),
    ]
    table.setStyle(TableStyle(commands))
    return table


def figure_flowables(filename: str, caption: str, note: str, styles: dict[str, ParagraphStyle]):
    path = FIGURES_DIR / filename
    if not path.exists():
        raise FileNotFoundError(path)
    with PILImage.open(path) as image:
        width_px, height_px = image.size
    max_width = 15.2 * cm
    max_height = 6.8 * cm
    scale = min(max_width / width_px, max_height / height_px)
    width = width_px * scale
    height = height_px * scale
    return KeepTogether(
        [
            Spacer(1, 4),
            Image(str(path), width=width, height=height, hAlign="CENTER"),
            Paragraph(inline_markup(caption), styles["FigureCaption"]),
            Paragraph(inline_markup(note), styles["FigureNote"]),
        ]
    )


def parse_markdown(source: str, styles: dict[str, ParagraphStyle]):
    lines = source.splitlines()
    story = []
    index = 0
    in_bibliography = False
    pending_table_caption = None

    while index < len(lines):
        raw = lines[index].rstrip()
        stripped = raw.strip()

        if not stripped or stripped.startswith("<!--"):
            index += 1
            continue

        if stripped == "[[PAGEBREAK]]":
            story.append(PageBreak())
            index += 1
            continue

        figure_match = re.fullmatch(r"\[\[FIGURE:([^|]+)\|([^|]+)\|(.+)\]\]", stripped)
        if figure_match:
            story.append(figure_flowables(*figure_match.groups(), styles))
            index += 1
            continue

        equation_match = re.fullmatch(r"\[\[EQUATION:(.+)\]\]", stripped)
        if equation_match:
            story.append(Paragraph(inline_markup(equation_match.group(1)), styles["Equation"]))
            index += 1
            continue

        table_caption_match = re.fullmatch(r"\[\[TABLECAPTION:(.+)\]\]", stripped)
        if table_caption_match:
            pending_table_caption = Paragraph(inline_markup(table_caption_match.group(1)), styles["TableCaption"])
            index += 1
            continue

        if stripped.startswith("# "):
            heading = stripped[2:].strip()
            in_bibliography = heading.startswith("4. Bibliografía")
            story.append(Paragraph(inline_markup(heading), styles["H1"]))
            index += 1
            continue
        if stripped.startswith("## "):
            story.append(Paragraph(inline_markup(stripped[3:].strip()), styles["H2"]))
            index += 1
            continue
        if stripped.startswith("### "):
            story.append(Paragraph(inline_markup(stripped[4:].strip()), styles["H3"]))
            index += 1
            continue

        if stripped.startswith("> "):
            callout_lines = []
            while index < len(lines) and lines[index].strip().startswith("> "):
                callout_lines.append(lines[index].strip()[2:])
                index += 1
            callout = Table(
                [[Paragraph(inline_markup(" ".join(callout_lines)), styles["Callout"])]],
                colWidths=[15.55 * cm],
                hAlign="LEFT",
            )
            callout.setStyle(
                TableStyle(
                    [
                        ("BACKGROUND", (0, 0), (-1, -1), PALE_BLUE),
                        ("BOX", (0, 0), (-1, -1), 0.8, TEAL),
                        ("LEFTPADDING", (0, 0), (-1, -1), 9),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                        ("TOPPADDING", (0, 0), (-1, -1), 7),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                    ]
                )
            )
            story.extend([Spacer(1, 3), callout, Spacer(1, 7)])
            continue

        if stripped.startswith("|" ):
            table_lines = []
            while index < len(lines) and lines[index].strip().startswith("|"):
                table_lines.append(lines[index].strip())
                index += 1
            rows = []
            for line_number, line in enumerate(table_lines):
                cells = [cell.strip() for cell in line.strip("|").split("|")]
                if line_number == 1 and all(re.fullmatch(r":?-{3,}:?", cell) for cell in cells):
                    continue
                rows.append(cells)
            table = make_table(rows, styles)
            if pending_table_caption is not None:
                story.append(pending_table_caption)
                pending_table_caption = None
            # La tabla puede dividirse por filas y repite su encabezado. Esto evita
            # grandes vacíos al final de página sin separar el título de la tabla.
            story.extend([table, Spacer(1, 8)])
            continue

        if re.match(r"^- ", stripped):
            items = []
            while index < len(lines) and re.match(r"^- ", lines[index].strip()):
                item_text = lines[index].strip()[2:].strip()
                items.append(ListItem(Paragraph(inline_markup(item_text), styles["List"]), leftIndent=12))
                index += 1
            story.append(
                ListFlowable(
                    items,
                    bulletType="bullet",
                    start="circle",
                    leftIndent=22,
                    bulletFontName="Arial",
                    bulletFontSize=8,
                    bulletColor=BLUE,
                    spaceAfter=6,
                )
            )
            continue

        if re.match(r"^\d+\. ", stripped):
            items = []
            start_number = int(stripped.split(".", 1)[0])
            while index < len(lines) and re.match(r"^\d+\. ", lines[index].strip()):
                item_text = re.sub(r"^\d+\.\s+", "", lines[index].strip())
                items.append(ListItem(Paragraph(inline_markup(item_text), styles["List"]), leftIndent=15))
                index += 1
            story.append(
                ListFlowable(
                    items,
                    bulletType="1",
                    start=start_number,
                    leftIndent=27,
                    bulletFontName="Arial-Bold",
                    bulletFontSize=10,
                    bulletColor=NAVY,
                    spaceAfter=7,
                )
            )
            continue

        paragraph_lines = [stripped]
        index += 1
        while index < len(lines):
            candidate = lines[index].strip()
            if not candidate:
                break
            if (
                candidate.startswith("#")
                or candidate.startswith("[[")
                or candidate.startswith("> ")
                or candidate.startswith("|")
                or re.match(r"^- ", candidate)
                or re.match(r"^\d+\. ", candidate)
            ):
                break
            paragraph_lines.append(candidate)
            index += 1

        paragraph_text = " ".join(paragraph_lines)
        paragraph_style = styles["Reference"] if in_bibliography else styles["Body"]
        story.append(Paragraph(inline_markup(paragraph_text), paragraph_style))

    return story


def cover_story(styles: dict[str, ParagraphStyle]):
    data = [
        ("Asignatura / módulo", COURSE),
        ("Nombre del docente", TEACHER_NAME),
        ("Nombre del estudiante", STUDENT_NAME),
        ("Carrera", CAREER),
        ("Institución", INSTITUTION),
        ("Fecha de entrega", DELIVERY_DATE),
    ]
    rows = [
        [Paragraph(label, styles["CoverLabel"]), Paragraph(value, styles["CoverValue"])]
        for label, value in data
    ]
    metadata = Table(rows, colWidths=[4.4 * cm, 10.2 * cm], hAlign="CENTER")
    metadata.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LINEBELOW", (0, 0), (-1, -1), 0.45, HexColor("#C4CDD4")),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("BACKGROUND", (0, 0), (0, -1), PALE_BLUE),
            ]
        )
    )
    return [
        Spacer(1, 2.2 * cm),
        Paragraph("INFORME ACADÉMICO", styles["CoverKicker"]),
        Paragraph("Ciclo Brayton", styles["CoverTitle"]),
        Paragraph("Taller de Energía", styles["CoverSubtitle"]),
        HRFlowable(width="70%", thickness=1.2, color=TEAL, spaceBefore=4, spaceAfter=26, hAlign="CENTER"),
        metadata,
        Spacer(1, 2.5 * cm),
        Paragraph(
            "Documento preparado como material de estudio para una disertación en educación superior técnica.",
            ParagraphStyle(
                "CoverNote",
                parent=styles["CoverSubtitle"],
                fontSize=9.5,
                leading=12.5,
                textColor=MID_GRAY,
                spaceAfter=0,
            ),
        ),
        PageBreak(),
    ]


def draw_first_page(canvas, doc):
    canvas.saveState()
    canvas.setTitle("Informe Ciclo Brayton")
    canvas.setSubject("Informe académico para la asignatura Taller de Energía")
    canvas.setAuthor(STUDENT_NAME)
    canvas.setCreator("Script reproducible con ReportLab")
    canvas.setFont("Arial", 8.5)
    canvas.setFillColor(MID_GRAY)
    canvas.drawCentredString(A4[0] / 2, 1.25 * cm, "1")
    canvas.restoreState()


def draw_later_pages(canvas, doc):
    canvas.saveState()
    page_width, page_height = A4
    canvas.setStrokeColor(HexColor("#C9D3DA"))
    canvas.setLineWidth(0.5)
    canvas.line(2.5 * cm, page_height - 1.55 * cm, page_width - 2.5 * cm, page_height - 1.55 * cm)
    canvas.setFillColor(MID_GRAY)
    canvas.setFont("Arial", 8.2)
    canvas.drawString(2.5 * cm, page_height - 1.28 * cm, "Ciclo Brayton")
    canvas.drawRightString(page_width - 2.5 * cm, page_height - 1.28 * cm, COURSE)
    canvas.setFont("Arial", 8.5)
    canvas.drawCentredString(page_width / 2, 1.25 * cm, str(canvas.getPageNumber()))
    canvas.restoreState()


def generate_pdf() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    styles = build_styles()
    source = SOURCE_MD.read_text(encoding="utf-8")
    story = cover_story(styles)
    story.extend(parse_markdown(source, styles))

    document = SimpleDocTemplate(
        str(OUTPUT_PDF),
        pagesize=A4,
        rightMargin=2.4 * cm,
        leftMargin=2.4 * cm,
        topMargin=1.95 * cm,
        bottomMargin=1.8 * cm,
        title="Ciclo Brayton",
        author=STUDENT_NAME,
        subject="Taller de Energía",
        creator="ReportLab",
        displayDocTitle=True,
        pageCompression=1,
    )
    document.build(story, onFirstPage=draw_first_page, onLaterPages=draw_later_pages)


def main() -> None:
    ensure_dependencies()
    FIGURES_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    register_fonts()
    verify_calculations()
    generate_figures()
    generate_pdf()
    print(f"PDF generado: {OUTPUT_PDF}")
    print("Cálculos verificados: wc=150,75; wt=402,00; wnet=251,25 kJ/kg; eta=33,33 %")


if __name__ == "__main__":
    main()
