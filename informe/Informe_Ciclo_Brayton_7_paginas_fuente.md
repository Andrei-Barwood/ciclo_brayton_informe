# 1. Introducción

El ciclo Brayton es un ciclo termodinámico que se utiliza para explicar el funcionamiento de las turbinas a gas. Su idea central es sencilla: entra aire, el compresor aumenta su presión, la combustión eleva su temperatura y los gases calientes se expanden en una turbina para producir movimiento. Este principio se aplica en centrales eléctricas, turbinas industriales y motores aeronáuticos (National Aeronautics and Space Administration [NASA], 2021).

El tema es importante en Taller de Energía porque permite seguir una cadena completa de transformación: la energía química del combustible se convierte en energía térmica, después en energía mecánica y finalmente en energía eléctrica. También muestra que la turbina no entrega todo su trabajo al generador, ya que una parte considerable debe mover el compresor.

Esta versión sintetizada presenta los componentes, las cuatro etapas ideales, los diagramas principales, las ecuaciones de trabajo y eficiencia, un ejemplo numérico, las diferencias con el ciclo real y sus aplicaciones. El propósito es que sirva como guía de estudio para una disertación, sin reemplazar el desarrollo más amplio del informe original.

# 2. Desarrollo

## 2.1 Funcionamiento y componentes principales

El ciclo Brayton es un modelo que ordena una secuencia de procesos mediante los estados 1, 2, 3 y 4. Se considera un ciclo porque, en la representación ideal, el fluido vuelve a sus condiciones iniciales después de recibir calor y entregar trabajo. En una turbina abierta real no regresa la misma masa: entra aire nuevo por la admisión y los gases salen por el escape. El rechazo de calor 4 → 1 permite cerrar termodinámicamente el modelo (Çengel et al., 2019).

Los componentes se recorren de izquierda a derecha. La **admisión** filtra y conduce el aire. El **compresor** recibe trabajo del eje y aumenta la presión y la temperatura. La **cámara de combustión** mezcla aire comprimido con combustible y eleva mucho la temperatura, con una pequeña caída de presión en la máquina real. La **turbina** expande los gases, hace girar el eje y produce trabajo. Finalmente, el **escape** descarga los gases o dirige su calor hacia un sistema de recuperación. El eje conecta la turbina con el compresor y con la carga útil, por ejemplo un generador (U.S. Department of Energy, s. f.-b).

[[FIGURE:figura_1_esquema_turbina_gas.png|Figura 1. Esquema simplificado de una turbina a gas.|Nota. El aire avanza por admisión, compresor, combustión, turbina y escape. La línea gris representa el eje mecánico. Elaboración propia.]]

[[PAGEBREAK]]

## 2.2 Las cuatro etapas del ciclo ideal

**1 → 2: compresión isentrópica.** El compresor realiza trabajo sobre el aire. Aumentan la presión y la temperatura, mientras disminuye el volumen específico. La palabra *isentrópica* significa que la entropía permanece constante; para el modelo ideal se supone un proceso adiabático e internamente reversible.

**2 → 3: adición de calor a presión constante.** El aire comprimido entra a la cámara de combustión. La energía química del combustible eleva la temperatura y la entalpía del gas. En el modelo ideal se mantiene <i>P</i><sub>2</sub> = <i>P</i><sub>3</sub>, aunque en una cámara real existe una caída de presión.

**3 → 4: expansión isentrópica.** Los gases calientes se expanden a través de los álabes de la turbina. Disminuyen la presión y la temperatura, aumenta el volumen específico y el gas entrega trabajo al eje. Una parte de este trabajo mueve el compresor y el resto puede aprovecharse externamente.

**4 → 1: rechazo de calor a presión constante.** El modelo devuelve el fluido a la condición inicial. En una turbina abierta esta etapa representa la salida de los gases y su reemplazo por aire ambiente; no significa necesariamente que exista un enfriador físico. En un Brayton cerrado sí puede haber un intercambiador que enfríe y recircule el mismo fluido (Çengel et al., 2019; Moran et al., 2018).

## 2.3 Lectura de los diagramas P-v y T-s

En el diagrama **Presión-Volumen específico (P-v)**, la compresión 1 → 2 sube hacia la izquierda y la expansión 3 → 4 baja hacia la derecha. Los tramos 2 → 3 y 4 → 1 son horizontales porque ocurren a presión constante. En el diagrama **Temperatura-Entropía (T-s)**, las etapas isentrópicas aparecen verticales. La adición de calor aumenta temperatura y entropía; el rechazo de calor reduce ambas.

[[FIGURE:figura_resumen_pv_ts.png|Figura 2. Diagramas P-v y T-s del ciclo Brayton ideal.|Nota. Los estados 1, 2, 3 y 4 son iguales en ambos gráficos. Los valores de los ejes tienen finalidad pedagógica. Elaboración propia.]]

Las variables más utilizadas son: **temperatura**, que indica el nivel térmico; **presión**, fuerza por unidad de área; **volumen específico**, volumen por kilogramo; **entropía**, útil para reconocer irreversibilidades; **entalpía**, propiedad empleada para calcular cambios de energía; y **calor** y **trabajo**, que son formas de transferencia de energía. Las unidades habituales son K, kPa, m³/kg, kJ/(kg·K) y kJ/kg.

[[PAGEBREAK]]

## 2.4 Trabajo, relación de presiones y eficiencia

Con aire ideal y un calor específico a presión constante aproximadamente uniforme, el trabajo específico del compresor y de la turbina puede calcularse a partir de las temperaturas:

[[EQUATION:<i>w</i><sub>c</sub> = <i>c</i><sub>p</sub>(<i>T</i><sub>2</sub> - <i>T</i><sub>1</sub>)]]

[[EQUATION:<i>w</i><sub>t</sub> = <i>c</i><sub>p</sub>(<i>T</i><sub>3</sub> - <i>T</i><sub>4</sub>)]]

El compresor consume trabajo y la turbina lo produce. Por eso, el trabajo que queda disponible antes de las pérdidas mecánicas y eléctricas es:

[[EQUATION:<i>w</i><sub>neto</sub> = <i>w</i><sub>t</sub> - <i>w</i><sub>c</sub>]]

La relación de presiones compara la presión absoluta de salida y entrada del compresor, <i>r</i><sub>p</sub> = <i>P</i><sub>2</sub>/<i>P</i><sub>1</sub>. Si aumenta, normalmente también suben la temperatura después de la compresión y el trabajo requerido por el compresor. En el modelo ideal, con gas ideal, calores específicos constantes y procesos isentrópicos, la eficiencia térmica se expresa como:

[[EQUATION:η<sub>ideal</sub> = 1 - 1 / <i>r</i><sub>p</sub><super>((γ - 1)/γ)</super>]]

Esta ecuación indica que una relación de presiones mayor puede elevar la eficiencia ideal. No debe confundirse con una garantía para la máquina real, porque también influyen la temperatura máxima, las pérdidas, la eficiencia de los componentes y las condiciones ambientales (Moran et al., 2018).

## 2.5 Ejemplo numérico resumido

Se utilizan <i>T</i><sub>1</sub> = 300 K, <i>T</i><sub>2</sub> = 450 K, <i>T</i><sub>3</sub> = 1.200 K, <i>T</i><sub>4</sub> = 800 K y <i>c</i><sub>p</sub> = 1,005 kJ/(kg·K). Los valores son coherentes con un mismo ciclo Brayton ideal.

[[TABLECAPTION:Tabla 1. Resultados del ejemplo numérico]]
| Cálculo | Procedimiento | Resultado |
|---|---|---|
| Compresor | 1,005(450 - 300) | <i>w</i><sub>c</sub> = 150,75 kJ/kg |
| Turbina | 1,005(1.200 - 800) | <i>w</i><sub>t</sub> = 402,00 kJ/kg |
| Trabajo neto | 402,00 - 150,75 | <i>w</i><sub>neto</sub> = 251,25 kJ/kg |
| Calor agregado | 1,005(1.200 - 450) | <i>q</i><sub>in</sub> = 753,75 kJ/kg |
| Eficiencia | 251,25 / 753,75 | η = 33,33 % |

El resultado significa que la turbina produce 402,00 kJ por kilogramo, pero 150,75 kJ/kg vuelven al compresor. Por eso solo quedan 251,25 kJ/kg como trabajo neto ideal.

## 2.6 Diferencias entre el ciclo ideal y el real

[[TABLECAPTION:Tabla 2. Comparación entre el modelo ideal y una turbina real]]
| Aspecto | Ciclo ideal | Ciclo real |
|---|---|---|
| Compresor | Isentrópico; mínimo trabajo teórico. | Fricción y turbulencia; necesita más trabajo. |
| Combustión | Calor agregado a presión constante. | Hay caída de presión y composición variable. |
| Turbina | Expansión isentrópica; máximo trabajo teórico. | Produce menos trabajo y aumenta la entropía. |
| Conjunto | Sin pérdidas mecánicas ni térmicas. | Presenta fricción, fugas, calor perdido y auxiliares. |

## 2.7 Generación eléctrica, aplicaciones y ciclo combinado

En una central, la expansión hace girar el eje de la turbina. Ese eje mueve el rotor de un generador dentro de un campo magnético y produce energía eléctrica por inducción. La cadena principal es: energía química → energía térmica → energía mecánica → energía eléctrica. En cada conversión existen pérdidas, por lo que la electricidad obtenida es menor que la energía inicial del combustible.

[[FIGURE:figura_4_conversion_energetica.png|Figura 3. Conversión de energía en una turbina a gas con generador.|Nota. Parte de la energía se pierde como calor, fricción y pérdidas eléctricas. Elaboración propia.]]

Las aplicaciones más conocidas son las turbinas estacionarias, centrales de ciclo simple, equipos de respaldo, turbinas industriales y motores aeronáuticos. La alta relación potencia/peso es especialmente útil en aviación. Algunas unidades de generación pueden responder con rapidez, dependiendo de la instalación.

Una central de **ciclo combinado Brayton-Rankine** aprovecha los gases calientes del escape en una caldera de recuperación. El calor produce vapor, el vapor mueve otra turbina y se genera electricidad adicional. Así se aprovecha mejor el combustible que en un ciclo simple. En promedios operacionales analizados por la U.S. Energy Information Administration (2022), las unidades combinadas necesitaron menos energía de combustible por kWh que las unidades de ciclo simple.

[[TABLECAPTION:Tabla 3. Ventajas y limitaciones principales]]
| Ventajas | Desventajas |
|---|---|
| Flujo continuo y buena relación potencia/peso. | Altas temperaturas y exigencias de materiales. |
| Sirve para electricidad, propulsión o potencia industrial. | El compresor consume una parte importante del trabajo. |
| El escape puede aprovecharse en ciclo combinado. | La eficiencia disminuye fuera del punto de diseño. |
| Puede estudiar fuentes de calor alternativas. | Con combustibles fósiles existen CO₂, NOₓ y otras emisiones. |

## 2.8 Relación con energías renovables

El ciclo Brayton **no es renovable por sí mismo**. Su clasificación depende del combustible o de la fuente de calor. Las turbinas tradicionales usan principalmente combustibles fósiles; el gas natural emite menos CO₂ por unidad de energía que el carbón, pero sigue generando emisiones y su cadena puede presentar fugas de metano (U.S. Energy Information Administration, 2024).

Se estudian alternativas con hidrógeno, biogás, combustibles sintéticos, calor solar y ciclos cerrados. Algunas mezclas tienen usos selectivos, pero el hidrógeno puro y varios ciclos avanzados siguen en desarrollo. En solar térmica comercial predomina Rankine; Brayton es una alternativa investigada (U.S. Department of Energy, s. f.-a, 2021). Por eso debe diferenciarse la turbina madura de la fuente energética emergente.

[[PAGEBREAK]]

## 2.9 Apoyo para la disertación

> **Analogía.** Puede imaginarse una bomba de bicicleta, un calentador ideal y un molinete. La bomba representa la compresión; el calentamiento agrega energía; el aire expandido hace girar el molinete; y la descarga representa el escape. La comparación ayuda a recordar el orden, pero una turbina real trabaja con flujo continuo y condiciones mucho más exigentes.

1. **¿Qué diferencia existe entre compresor y turbina?** El compresor recibe trabajo para elevar la presión; la turbina recibe gases calientes y entrega trabajo durante la expansión.
2. **¿Por qué sube la temperatura al comprimir aire?** Porque el trabajo realizado sobre el aire aumenta su energía interna y su entalpía.
3. **¿Qué significa isentrópico?** Que la entropía permanece constante en el modelo ideal.
4. **¿Dónde aparece el trabajo útil?** En la diferencia entre el trabajo producido por la turbina y el consumido por el compresor.
5. **¿Por qué el ciclo real rinde menos?** Por fricción, turbulencia, caídas de presión, pérdidas térmicas y eficiencias imperfectas.
6. **¿Qué aporta el ciclo combinado?** Utiliza el escape Brayton para producir vapor y trabajo adicional mediante un ciclo Rankine.
7. **¿El ciclo Brayton es renovable?** No necesariamente; depende del combustible o de la fuente térmica utilizada.

# 3. Conclusión

El ciclo Brayton permite comprender de forma ordenada cómo funciona una turbina a gas. Sus cuatro procesos son compresión isentrópica, adición de calor a presión constante, expansión isentrópica y rechazo de calor a presión constante. Los diagramas P-v y T-s ayudan a visualizar los cambios de presión, volumen, temperatura y entropía.

El compresor eleva la presión del aire, pero necesita trabajo. La combustión agrega energía y la turbina transforma parte de ella en rotación. El trabajo neto es la diferencia entre lo producido por la turbina y lo consumido por el compresor. La eficiencia expresa qué parte del calor agregado termina como trabajo útil.

En una instalación real aparecen pérdidas y los procesos dejan de ser perfectos. Por eso es importante usar el ciclo ideal como referencia, pero no confundirlo con el rendimiento verdadero de una máquina. La relación de presiones, las temperaturas, los materiales y la eficiencia de los componentes deben analizarse en conjunto.

Finalmente, el ciclo Brayton tiene una relación directa con la generación eléctrica y puede mejorar su aprovechamiento mediante un ciclo combinado. También puede vincularse con hidrógeno, biocombustibles o calor solar, aunque estas alternativas presentan distintos grados de madurez. Después de estudiar el tema, se puede reconocer que Brayton describe una forma de convertir energía y no una fuente renovable por sí sola.

[[PAGEBREAK]]

# 4. Bibliografía

Çengel, Y. A., Boles, M. A., & Kanoğlu, M. (2019). *Thermodynamics: An engineering approach* (9th ed.). McGraw-Hill Education.

Moran, M. J., Shapiro, H. N., Boettner, D. D., & Bailey, M. B. (2018). *Fundamentals of engineering thermodynamics* (9th ed.). Wiley.

National Aeronautics and Space Administration. (2021, 13 de mayo). *Turbine engine thermodynamic cycle - Brayton cycle*. NASA Glenn Research Center. [https://www.grc.nasa.gov/www/k-12/airplane/brayton.html](https://www.grc.nasa.gov/www/k-12/airplane/brayton.html)

U.S. Department of Energy. (s. f.-a). *Concentrating solar-thermal power (CSP) power cycles*. [https://www.energy.gov/cmei/systems/concentrating-solar-thermal-power-csp-power-cycles](https://www.energy.gov/cmei/systems/concentrating-solar-thermal-power-csp-power-cycles)

U.S. Department of Energy. (s. f.-b). *How gas turbine power plants work*. [https://www.energy.gov/hgeo/how-gas-turbine-power-plants-work](https://www.energy.gov/hgeo/how-gas-turbine-power-plants-work)

U.S. Department of Energy. (2021, 12 de mayo). *Project selections: University Turbines Systems Research (UTSR) - Focus on hydrogen (H2) fuels*. [https://www.energy.gov/hgeo/articles/project-selections-university-turbines-systems-research-utsr-focus-hydrogen-h2-fuels](https://www.energy.gov/hgeo/articles/project-selections-university-turbines-systems-research-utsr-focus-hydrogen-h2-fuels)

U.S. Energy Information Administration. (2022, 25 de abril). *Most combined-cycle power plants employ two combustion turbines with one steam turbine*. [https://www.eia.gov/todayinenergy/detail.php?id=52158](https://www.eia.gov/todayinenergy/detail.php?id=52158)

U.S. Energy Information Administration. (2024, 16 de abril). *Natural gas and the environment*. [https://www.eia.gov/energyexplained/natural-gas/natural-gas-and-the-environment.php](https://www.eia.gov/energyexplained/natural-gas/natural-gas-and-the-environment.php)
