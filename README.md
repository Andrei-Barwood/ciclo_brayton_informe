# Informe académico: Ciclo Brayton

Este proyecto genera un informe A4 en PDF para la asignatura **Taller de Energía**. El contenido se conserva en Markdown y el diseño se construye con Python para que sea reproducible.

## Organización

- `informe/Informe_Ciclo_Brayton_fuente.md`: texto editable del informe.
- `informe/Informe_Ciclo_Brayton_7_paginas_fuente.md`: versión sintetizada editable.
- `scripts/generate_report.py`: configuración de portada, creación de figuras, verificación de cálculos y generación del PDF.
- `scripts/generate_report_7_pages.py`: genera la copia sintetizada de exactamente siete páginas.
- `figures/`: diagramas originales generados por el script.
- `sources/fuentes_verificadas.md`: registro breve de las fuentes consultadas y controles realizados.
- `output/Informe_Ciclo_Brayton.pdf`: entrega principal.
- `output/Informe_Ciclo_Brayton_7_paginas.pdf`: copia sintetizada de siete páginas.
- `tmp/`: archivos temporales utilizados en la revisión visual.

## Datos de portada

Edite al comienzo de `scripts/generate_report.py` las variables:

```python
STUDENT_NAME = "[COMPLETAR NOMBRE DEL ESTUDIANTE]"
TEACHER_NAME = "[COMPLETAR NOMBRE DEL DOCENTE]"
COURSE = "Taller de Energía"
CAREER = "[COMPLETAR NOMBRE OFICIAL DE LA CARRERA]"
INSTITUTION = "[COMPLETAR INSTITUCIÓN]"
DELIVERY_DATE = "[COMPLETAR FECHA]"
```

## Cómo regenerar el PDF

Desde la carpeta `ciclo_brayton_informe` ejecute:

```bash
python3 scripts/generate_report.py
```

Dependencias: Python 3, ReportLab, Matplotlib, NumPy y Pillow. El script utiliza los archivos Arial incluidos en macOS en `/System/Library/Fonts/Supplemental/`. Si se ejecuta en otro sistema operativo, se deben ajustar las cuatro rutas de fuente declaradas en el script.

El generador comprueba automáticamente el ejemplo numérico antes de escribir el PDF y vuelve a crear las figuras en alta resolución en cada ejecución.

Para regenerar solamente la copia de siete páginas, ejecute:

```bash
python3 scripts/generate_report_7_pages.py
```

La versión breve reutiliza las mismas variables de portada declaradas en `scripts/generate_report.py`, por lo que un solo cambio actualiza ambas versiones.
