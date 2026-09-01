# 1. Introducción

El ciclo Brayton es un ciclo termodinámico que se utiliza principalmente para explicar el funcionamiento de las turbinas a gas. En estas máquinas entra aire, se comprime, se agrega energía mediante la combustión y luego los gases calientes se expanden a través de una turbina. Esa expansión permite obtener trabajo mecánico. El mismo principio general aparece tanto en equipos de generación eléctrica como en motores aeronáuticos (National Aeronautics and Space Administration [NASA], 2021).

Su estudio es importante dentro del área de energía porque muestra de manera ordenada cómo una fuente de calor puede transformarse en movimiento y, posteriormente, en electricidad. También permite reconocer que la turbina no entrega todo su trabajo como potencia útil: una parte debe regresar al compresor para mantener el flujo de aire. Comprender este balance ayuda a relacionar la termodinámica con máquinas eléctricas, centrales de generación y uso eficiente de combustibles.

En aplicaciones reales, el ciclo se encuentra en turbinas industriales, centrales termoeléctricas de ciclo simple, centrales de ciclo combinado, equipos de respaldo y motores de aviación. Aunque el modelo ideal es más sencillo que una máquina verdadera, sirve como una base clara para estudiar presiones, temperaturas, transferencia de calor, trabajo y eficiencia. Después se pueden agregar las pérdidas que existen en la práctica y comprender por qué el resultado real siempre se aleja del máximo teórico (Çengel et al., 2019; Moran et al., 2018).

En este informe se revisan el origen y el funcionamiento del ciclo Brayton, sus componentes, sus cuatro procesos ideales y sus diagramas Presión-Volumen y Temperatura-Entropía. Luego se explican el trabajo del compresor y de la turbina, el trabajo neto, la eficiencia térmica, la relación de presiones y las diferencias entre el ciclo ideal y el real. Finalmente, se estudian sus aplicaciones eléctricas, el ciclo combinado Brayton-Rankine, un ejemplo numérico, sus ventajas y limitaciones, y su posible relación con tecnologías renovables.

[[PAGEBREAK]]

# 2. Desarrollo

## 2.1 ¿Qué es el ciclo Brayton?

El ciclo Brayton es un modelo formado por una secuencia de procesos termodinámicos. Su finalidad es representar de manera simplificada la conversión de calor en trabajo cuando el fluido de trabajo es un gas. También recibe el nombre de ciclo Joule-Brayton. En el análisis más básico se considera que el aire se comporta como un gas ideal y que pasa por dos procesos isentrópicos y dos procesos a presión constante (Çengel et al., 2019).

El nombre se relaciona con George B. Brayton, quien patentó en 1872 un motor de combustión a presión aproximadamente constante. Ese equipo tenía pistones y no era una turbina a gas moderna, pero aplicaba una idea que después se volvió fundamental para estas máquinas. El registro del modelo histórico y de la patente estadounidense N.º 125166 se conserva en el Smithsonian Institution (s. f.).

Se habla de un ciclo termodinámico porque el modelo ideal hace pasar al fluido por varios estados y finalmente lo devuelve a las condiciones iniciales. Cada estado se identifica mediante propiedades como presión, temperatura, volumen específico y entropía. Cuando el fluido completa la secuencia 1-2-3-4-1, el cambio total de sus propiedades de estado es cero, aunque durante el recorrido hayan entrado calor y salido trabajo.

En una turbina a gas abierta real no vuelve la misma masa de aire al punto de inicio. Entra aire fresco por la admisión y salen gases por el escape. Para poder analizarla como un ciclo, el modelo de aire estándar reemplaza la combustión por una adición externa de calor y representa el escape más la admisión mediante un rechazo de calor. En un ciclo Brayton cerrado, en cambio, el mismo fluido sí recircula y recibe o entrega calor a través de intercambiadores.

Las máquinas que utilizan este principio son, entre otras, las turbinas a gas estacionarias, los turborreactores, los turbofanes, los turbohélices, las microturbinas y algunas unidades que accionan compresores o bombas industriales. La forma del equipo cambia según la aplicación, pero el núcleo formado por compresión, calentamiento y expansión se mantiene (NASA, 2021).

> **Idea clave.** El ciclo Brayton no es una máquina física por sí solo. Es un modelo que ayuda a ordenar y calcular lo que sucede dentro de una turbina a gas.

## 2.2 Componentes principales de una turbina a gas

Una turbina a gas trabaja con flujo continuo. Esto significa que el aire no espera a que termine un ciclo para volver a entrar, sino que atraviesa el equipo mientras otras porciones de aire se encuentran en etapas diferentes. El recorrido general es admisión, compresor, cámara de combustión, turbina y escape. Los tres elementos centrales son el compresor, el sistema de combustión y la turbina (U.S. Department of Energy, s. f.-b).

**Sistema de admisión.** Su función es conducir aire del ambiente hacia el compresor. Normalmente incluye filtros para evitar la entrada de polvo y partículas, además de ductos diseñados para reducir pérdidas. En una central estacionaria interesa entregar aire limpio y con un flujo lo más uniforme posible. La temperatura ambiente también importa: un aire más caliente es menos denso y puede disminuir la masa de aire que ingresa, reduciendo la potencia disponible.

**Compresor.** Recibe aire a baja presión y utiliza trabajo mecánico para aumentar su presión. Puede ser axial, centrífugo o una combinación de ambos. Durante la compresión también aumenta la temperatura. El compresor está unido al eje de la turbina, de modo que consume una parte de la potencia que la propia turbina produce.

**Cámara de combustión.** Recibe el aire comprimido, mezcla una parte de este aire con combustible y mantiene una combustión continua. El propósito principal es elevar mucho la temperatura de la corriente gaseosa. En el ciclo ideal se supone que esta adición de energía ocurre a presión constante; en la realidad existe una pequeña caída de presión debido al flujo, la mezcla y la fricción.

**Turbina.** Está formada por etapas de álabes fijos y móviles. Los gases calientes y presurizados se expanden entre estos álabes y hacen girar el rotor. Así, la energía del gas se transforma en energía mecánica de rotación. Una parte del trabajo mueve el compresor y la parte restante puede accionar un generador, una hélice, un ventilador, una bomba u otra carga.

**Sistema de escape.** Conduce los gases que salen de la turbina. En un ciclo simple estacionario, los gases se descargan a la atmósfera mediante un ducto y un silenciador. En un motor aeronáutico, una tobera puede aprovechar la energía restante para producir empuje. En una central de ciclo combinado, el escape pasa primero por una caldera de recuperación para aprovechar su calor.

El flujo puede seguirse de izquierda a derecha en la Figura 1. El aire se filtra, se comprime y se calienta por combustión. Luego se expande en la turbina. El eje transmite potencia en dos direcciones: hacia el compresor, para mantenerlo funcionando, y hacia la carga útil, que en este informe se representa mediante un generador eléctrico.

[[FIGURE:figura_1_esquema_turbina_gas.png|Figura 1. Esquema simplificado de una turbina a gas.|Nota. Las flechas azules representan aire, las naranjas gases calientes y la línea gris el eje mecánico. Elaboración propia.]]

[[PAGEBREAK]]

## 2.3 Etapas del ciclo Brayton ideal

Para estudiar el ciclo ideal se numeran cuatro estados. El estado 1 corresponde a la entrada del compresor; el estado 2, a su salida; el estado 3, a la salida de la cámara de combustión o entrada de la turbina; y el estado 4, a la salida de la turbina. Las siguientes explicaciones usan el modelo de aire estándar con calores específicos constantes, sin fricción ni caídas de presión (Çengel et al., 2019; Moran et al., 2018).

### 2.3.1 Etapa 1 → 2: compresión isentrópica

En esta etapa el compresor realiza trabajo sobre el aire. La presión aumenta desde <i>P</i><sub>1</sub> hasta <i>P</i><sub>2</sub> y, al mismo tiempo, la temperatura sube desde <i>T</i><sub>1</sub> hasta <i>T</i><sub>2</sub>. El volumen específico disminuye porque la misma masa ocupa menos volumen a mayor presión. Es parecido a la sensación de calentamiento que puede notarse al comprimir aire con una bomba manual, aunque el proceso real de la bomba no sea ideal.

La palabra **isentrópico** significa que la entropía permanece constante. Para que eso ocurra, el proceso ideal debe ser adiabático, es decir, sin transferencia de calor, y además internamente reversible. No basta con decir solamente que es adiabático. En un compresor real hay fricción y turbulencia, por lo que la entropía aumenta y se necesita más trabajo que en el caso ideal.

El trabajo del compresor es una entrada de energía. Por este motivo no debe confundirse con trabajo útil producido. Cuanto mayor sea el aumento de temperatura entre 1 y 2, mayor será el trabajo específico requerido, si se mantiene aproximadamente constante el calor específico del aire.

### 2.3.2 Etapa 2 → 3: adición de calor a presión constante

Después de la compresión, el aire entra a la cámara de combustión. Se inyecta combustible, se mezcla y se quema de forma continua. La energía química del combustible se transforma en energía térmica y eleva con fuerza la temperatura del gas. En el modelo ideal, la presión se mantiene constante, de modo que <i>P</i><sub>2</sub> = <i>P</i><sub>3</sub>.

Aunque la presión no aumenta en el modelo, sí aumentan la temperatura, la entalpía, la entropía y el volumen específico. El gas se vuelve capaz de entregar más trabajo durante la expansión posterior. En la máquina real, la combustión no es una simple transferencia de calor externa: cambia la composición de la corriente y se forman gases de combustión. La idealización permite seguir usando aire como fluido de trabajo para que el análisis sea más sencillo.

### 2.3.3 Etapa 3 → 4: expansión isentrópica

El gas caliente entra a la turbina en el estado 3 y se expande hasta una presión menor. Durante la expansión, la presión y la temperatura disminuyen, mientras que el volumen específico aumenta. La corriente empuja los álabes y entrega trabajo al eje. En el modelo ideal, la entropía permanece constante.

La turbina produce trabajo bruto, pero no todo queda disponible para el exterior. Como la turbina y el compresor están conectados al mismo eje, una parte de esa producción se utiliza de inmediato para sostener la compresión. Solo la diferencia entre el trabajo de la turbina y el consumo del compresor constituye el trabajo neto.

En el equipo real, la expansión tiene irreversibilidades. Esto hace que el estado de salida tenga mayor entropía y mayor temperatura que el estado de salida isentrópico calculado para la misma presión. Por lo tanto, la caída real de entalpía es menor y la turbina entrega menos trabajo.

### 2.3.4 Etapa 4 → 1: rechazo de calor a presión constante

Para cerrar el ciclo ideal, el fluido rechaza calor a presión constante y vuelve a la temperatura inicial. Durante esta etapa disminuyen la temperatura, la entalpía, la entropía y el volumen específico, mientras <i>P</i><sub>4</sub> = <i>P</i><sub>1</sub>.

Es importante interpretar bien este proceso. En una turbina a gas abierta normalmente no hay un enfriador que tome exactamente los gases del estado 4 y los devuelva al estado 1. Los gases salen por el escape y son reemplazados por aire nuevo del ambiente. El rechazo de calor 4 → 1 es la representación termodinámica usada para cerrar el modelo. En un ciclo Brayton cerrado sí puede existir un enfriador físico antes de que el fluido vuelva al compresor.

> **Resumen de los cambios.** Compresión: suben presión y temperatura. Combustión ideal: se agrega calor a presión constante. Expansión: bajan presión y temperatura mientras se produce trabajo. Rechazo: el modelo vuelve al estado inicial.

## 2.4 Diagrama Presión-Volumen (P-v)

El diagrama Presión-Volumen muestra cómo cambia la presión del fluido en relación con su volumen. En equipos de flujo continuo conviene utilizar el **volumen específico**, representado por <i>v</i>, que es el volumen ocupado por unidad de masa y se expresa en m³/kg. El eje vertical representa la presión <i>P</i> y el eje horizontal representa <i>v</i>.

En la Figura 2, el tramo 1 → 2 avanza hacia arriba y hacia la izquierda: la presión aumenta y el volumen específico disminuye durante la compresión isentrópica. El tramo 2 → 3 es horizontal hacia la derecha porque se agrega calor a presión alta constante y el gas aumenta su volumen específico. El tramo 3 → 4 baja y se desplaza hacia la derecha durante la expansión isentrópica. Finalmente, 4 → 1 es horizontal hacia la izquierda, a presión baja constante, mientras se rechaza calor.

[[FIGURE:figura_2_diagrama_pv.png|Figura 2. Diagrama Presión-Volumen específico del ciclo Brayton ideal.|Nota. Las curvas isentrópicas se trazaron con la relación <i>Pv</i><super>γ</super> = constante para un gas ideal. Los valores de los ejes son relativos y buscan facilitar la interpretación. Elaboración propia.]]

El sentido del ciclo es horario. El área encerrada se relaciona con el trabajo neto del ciclo ideal. Sin embargo, para calcular el trabajo de máquinas de flujo continuo resulta más directo usar los cambios de entalpía y temperatura. El gráfico sirve sobre todo para visualizar que la compresión exige reducir el volumen específico y que la expansión permite que el gas entregue energía.

## 2.5 Diagrama Temperatura-Entropía (T-s)

El diagrama Temperatura-Entropía representa la temperatura <i>T</i> en el eje vertical y la entropía específica <i>s</i> en el eje horizontal. La temperatura expresa el nivel térmico del fluido. La entropía ayuda a describir cómo se distribuye la energía y permite reconocer irreversibilidades. Sus unidades específicas habituales son kJ/(kg·K).

Los procesos isentrópicos 1 → 2 y 3 → 4 aparecen como líneas verticales porque la entropía no cambia. Durante 2 → 3, la adición de calor aumenta la temperatura y la entropía, por lo que la curva sube hacia la derecha. Durante 4 → 1 ocurre lo contrario: el rechazo de calor reduce ambas propiedades y la curva baja hacia la izquierda.

[[FIGURE:figura_3_diagrama_ts.png|Figura 3. Diagrama Temperatura-Entropía del ciclo Brayton ideal.|Nota. Los estados se basan en el ejemplo ideal coherente del apartado 2.14. En un compresor o una turbina real, las trayectorias se desplazan hacia la derecha porque la entropía aumenta. Elaboración propia.]]

La NASA (2021) muestra que, en una compresión real, la línea deja de ser vertical y se inclina hacia la derecha debido al aumento de entropía. Esta diferencia visual ayuda a comprender por qué un proceso real necesita más trabajo en el compresor y entrega menos trabajo en la turbina que el proceso ideal.

## 2.6 Variables termodinámicas importantes

Para interpretar el ciclo Brayton no basta con memorizar cuatro etapas. También es necesario comprender qué indican las variables usadas en los gráficos y ecuaciones. Las definiciones siguientes se relacionan directamente con el aire y los gases que atraviesan la turbina (Çengel et al., 2019).

[[TABLECAPTION:Tabla 1. Variables termodinámicas utilizadas en el ciclo Brayton]]
| Variable | Significado sencillo | Relación con el ciclo | Unidad habitual |
|---|---|---|---|
| Temperatura, <i>T</i> | Indica el nivel térmico del fluido. | Aumenta en la compresión y la combustión; disminuye en la expansión y el rechazo de calor. | kelvin (K) |
| Presión, <i>P</i> | Es la fuerza ejercida por unidad de área. | El compresor la eleva y la turbina permite que disminuya durante la expansión. | pascal (Pa), kilopascal (kPa) o bar absoluto |
| Volumen, <i>V</i>, y volumen específico, <i>v</i> | <i>V</i> es el espacio total ocupado; <i>v</i> es volumen por unidad de masa. | <i>v</i> disminuye al comprimir y aumenta al calentar o expandir el gas. | m³ y m³/kg |
| Entropía, <i>s</i> | Propiedad que permite seguir la dispersión de energía y las irreversibilidades. | Permanece constante solo en los procesos isentrópicos ideales; aumenta en componentes reales. | kJ/(kg·K) |
| Entalpía, <i>h</i> | Propiedad energética conveniente para equipos donde el fluido entra y sale. | Sus diferencias permiten calcular trabajo y calor en compresor, combustor y turbina. | kJ/kg |
| Calor, <i>q</i> | Energía transferida por una diferencia de temperatura. | Entra entre 2 y 3 y se rechaza entre 4 y 1 en el modelo ideal. | kJ/kg; como tasa, kW |
| Trabajo, <i>w</i> | Energía transferida mediante una acción mecánica. | Entra al compresor, sale de la turbina y su diferencia es el trabajo neto. | kJ/kg; como potencia, kW |

La entalpía se define como <i>h</i> = <i>u</i> + <i>Pv</i>, donde <i>u</i> es la energía interna específica. Para un gas ideal, el cambio de entalpía depende principalmente del cambio de temperatura. Por eso, con un calor específico <i>c</i><sub>p</sub> aproximadamente constante, puede escribirse Δ<i>h</i> = <i>c</i><sub>p</sub>Δ<i>T</i>.

Calor y trabajo no son sustancias almacenadas dentro del gas. Son formas de transferencia de energía a través de los límites del sistema. Esta distinción evita expresiones incorrectas como “el aire contiene trabajo”. El aire posee propiedades como temperatura y entalpía; el trabajo aparece cuando la energía cruza hacia o desde el eje.

## 2.7 Trabajo del compresor, trabajo de la turbina y trabajo neto

Las ecuaciones siguientes entregan **trabajo específico**, es decir, energía por unidad de masa. Por esa razón se utiliza la letra minúscula <i>w</i>. Si <i>c</i><sub>p</sub> se expresa en kJ/(kg·K) y la diferencia de temperaturas en K, el resultado queda en kJ/kg. Las diferencias de temperatura en kelvin y en grados Celsius tienen el mismo valor numérico, pero las relaciones termodinámicas absolutas deben usar kelvin.

### 2.7.1 Trabajo del compresor

[[EQUATION:<i>w</i><sub>c</sub> = <i>c</i><sub>p</sub>(<i>T</i><sub>2</sub> - <i>T</i><sub>1</sub>)]]

En esta expresión, <i>w</i><sub>c</sub> es la magnitud del trabajo específico que debe recibir el compresor; <i>c</i><sub>p</sub> es el calor específico a presión constante; <i>T</i><sub>1</sub> es la temperatura de entrada y <i>T</i><sub>2</sub> es la temperatura después de la compresión. Como <i>T</i><sub>2</sub> es mayor que <i>T</i><sub>1</sub>, el resultado es positivo cuando se expresa como consumo de trabajo.

Físicamente, este resultado indica cuánta energía mecánica debe entregarse para comprimir un kilogramo de aire. En una turbina real el compresor consume una fracción importante del trabajo bruto producido por la turbina. Mejorar su eficiencia reduce ese consumo y deja una mayor parte de la producción como trabajo útil.

### 2.7.2 Trabajo de la turbina

[[EQUATION:<i>w</i><sub>t</sub> = <i>c</i><sub>p</sub>(<i>T</i><sub>3</sub> - <i>T</i><sub>4</sub>)]]

Aquí, <i>w</i><sub>t</sub> es el trabajo específico producido por la turbina; <i>T</i><sub>3</sub> es la temperatura de entrada a la turbina y <i>T</i><sub>4</sub> es la temperatura a su salida. La disminución de temperatura acompaña la entrega de energía del gas hacia los álabes y el eje.

La energía mecánica aparece como rotación. En una central eléctrica, esa rotación se transmite al rotor de un generador. En una aeronave puede utilizarse para mover un ventilador o una hélice, y también puede quedar energía en el chorro de escape para producir empuje.

### 2.7.3 Trabajo neto

[[EQUATION:<i>w</i><sub>neto</sub> = <i>w</i><sub>t</sub> - <i>w</i><sub>c</sub>]]

Esta ecuación expresa el balance principal del ciclo. Si la turbina produce 400 kJ/kg y el compresor necesita 150 kJ/kg, solo quedan 250 kJ/kg como trabajo neto antes de considerar pérdidas mecánicas y del generador. El resultado debe ser positivo para que el conjunto pueda entregar potencia útil.

Si se conoce el caudal másico <i>ṁ</i> en kg/s, la potencia neta ideal se obtiene mediante <i>Ẇ</i><sub>neto</sub> = <i>ṁw</i><sub>neto</sub>. Como 1 kJ/s equivale a 1 kW, un caudal de 10 kg/s y un trabajo específico neto de 250 kJ/kg corresponderían a 2.500 kW de potencia mecánica ideal.

## 2.8 Eficiencia térmica

La eficiencia térmica indica qué fracción del calor agregado se transforma en trabajo neto. No representa la cantidad total de energía que entra, sino la proporción que termina como salida útil del ciclo. Puede expresarse como:

[[EQUATION:η<sub>térmica</sub> = <i>w</i><sub>neto</sub> / <i>q</i><sub>in</sub> = 1 - <i>q</i><sub>out</sub> / <i>q</i><sub>in</sub>]]

Para el ciclo Brayton ideal de aire estándar, con gas ideal, calores específicos constantes, compresor y turbina isentrópicos, sin caídas de presión y con la misma relación de presiones durante compresión y expansión, se obtiene:

[[EQUATION:η<sub>ideal</sub> = 1 - 1 / <i>r</i><sub>p</sub><super>((γ - 1)/γ)</super>]]

En la ecuación, η es la eficiencia térmica; <i>r</i><sub>p</sub> es la relación de presiones del compresor; y γ es la relación entre los calores específicos, γ = <i>c</i><sub>p</sub>/<i>c</i><sub>v</sub>. Para el aire cerca de condiciones ambientales suele utilizarse γ ≈ 1,4 como aproximación, aunque su valor cambia con la temperatura.

El significado físico es que una mayor relación de presiones puede elevar la eficiencia del ciclo ideal. Sin embargo, la fórmula no debe aplicarse directamente a una turbina real porque los componentes no son perfectamente isentrópicos, existen pérdidas de presión, las propiedades cambian y la temperatura máxima está limitada por los materiales. La eficiencia real de toda una central también incluye pérdidas mecánicas, eléctricas y auxiliares (Moran et al., 2018).

Como ejemplo corto, si <i>r</i><sub>p</sub> = 8 y γ = 1,4, la eficiencia ideal resulta aproximadamente 44,8 %. Este valor no significa que cualquier turbina con esa relación de presiones alcanzará esa eficiencia. Solo muestra el resultado del modelo bajo las hipótesis indicadas.

## 2.9 Relación de presiones

La relación de presiones del compresor compara la presión absoluta de salida con la presión absoluta de entrada:

[[EQUATION:<i>r</i><sub>p</sub> = <i>P</i><sub>2</sub> / <i>P</i><sub>1</sub>]]

Por ejemplo, si el aire entra a 100 kPa absolutos y sale a 800 kPa absolutos, la relación de presiones es 8. En el ciclo ideal sin pérdidas de presión también se cumple <i>P</i><sub>3</sub>/<i>P</i><sub>4</sub> = <i>r</i><sub>p</sub>.

Al aumentar <i>r</i><sub>p</sub>, la compresión isentrópica eleva más la temperatura <i>T</i><sub>2</sub>. Esto aumenta el trabajo que consume el compresor. Si se mantiene fija la temperatura máxima <i>T</i><sub>3</sub>, una expansión con mayor relación de presiones reduce <i>T</i><sub>4</sub> y aumenta el trabajo bruto de la turbina. Por lo tanto, ambos trabajos cambian al mismo tiempo.

El trabajo neto no aumenta indefinidamente. Para temperaturas de entrada al compresor y a la turbina fijas, existe una relación de presiones que maximiza el trabajo neto. Más allá de ese punto, el aumento del consumo del compresor domina. En cambio, la ecuación simplificada de eficiencia ideal aumenta con <i>r</i><sub>p</sub>. Esto muestra que maximizar trabajo neto y maximizar eficiencia no son exactamente el mismo objetivo (Greitzer et al., s. f.).

En una máquina real también influyen las eficiencias del compresor y la turbina, la refrigeración de álabes, las caídas de presión, la temperatura ambiente y las restricciones de diseño. Por eso la relación de presiones se selecciona junto con muchos otros parámetros y no como una cifra aislada.

## 2.10 Ciclo Brayton ideal y ciclo real

El ciclo ideal funciona como una referencia. Permite calcular un límite teórico usando procesos sencillos. La máquina real se aleja de ese límite porque el aire encuentra fricción, turbulencia, fugas, pérdidas térmicas y componentes con eficiencias menores que 100 %. La comparación de la Tabla 2 ayuda a identificar dónde aparecen las diferencias (NASA, 2021; Çengel et al., 2019).

[[TABLECAPTION:Tabla 2. Comparación entre el ciclo Brayton ideal y el ciclo real]]
| Aspecto | Ciclo ideal | Ciclo real |
|---|---|---|
| Compresor | Compresión isentrópica; entropía constante. | La entropía aumenta y se requiere más trabajo para alcanzar la misma presión. |
| Cámara de combustión | Adición de calor a presión constante. | Existe caída de presión y la combustión no es perfectamente uniforme. |
| Turbina | Expansión isentrópica; máxima caída útil de entalpía. | La entropía aumenta y se produce menos trabajo para la misma presión de salida. |
| Mecánica | Sin fricción ni pérdidas en el eje. | Hay fricción en rodamientos, sellos, transmisión y equipos auxiliares. |
| Transferencia térmica | Solo ocurre en las etapas definidas. | Puede existir pérdida de calor no deseada hacia el ambiente. |
| Propiedades del fluido | Aire ideal con <i>c</i><sub>p</sub> y γ constantes. | Las propiedades varían con temperatura y composición de los gases. |
| Resultado | Mayor trabajo neto y eficiencia teórica. | Trabajo neto y eficiencia menores que los ideales. |

La eficiencia isentrópica del compresor compara el trabajo ideal con el trabajo real. La de la turbina compara el trabajo real obtenido con el que produciría una expansión isentrópica. Estas eficiencias permiten corregir el modelo sin tener que representar todos los detalles internos del equipo.

Las temperaturas reales de salida también cambian. Para la misma presión final, un compresor real termina a una temperatura mayor que el ideal porque consumió más energía. Una turbina real termina a una temperatura mayor que la ideal porque extrajo menos energía del gas. Estas diferencias pueden verse en un diagrama T-s como desplazamientos hacia la derecha.

## 2.11 Aplicaciones del ciclo Brayton

Las turbinas a gas se utilizan cuando se necesita producir potencia a partir de un flujo continuo de gases. Su alta relación potencia/peso es especialmente valiosa en aviación, mientras que su capacidad de funcionar de forma continua es útil en generación eléctrica e industria. La aplicación concreta depende del tamaño, el diseño y la manera en que se aprovecha la energía del eje o del escape.

- **Turbinas a gas estacionarias:** convierten la expansión de gases en potencia de eje para producir electricidad o mover equipos.
- **Centrales termoeléctricas de ciclo simple:** una turbina a gas acciona un generador y los gases se descargan sin producir vapor adicional. Suelen ser útiles para atender puntas de demanda o necesidades de respuesta rápida, dependiendo de la instalación.
- **Centrales de ciclo combinado:** recuperan el calor del escape para alimentar un ciclo de vapor y generar más electricidad con el mismo combustible.
- **Motores aeronáuticos:** turborreactores, turbofanes y turbohélices utilizan el núcleo Brayton. La energía restante se aprovecha como empuje o para mover un ventilador o una hélice (NASA, 2021).
- **Turbinas industriales:** pueden accionar bombas, compresores de gas y otros equipos rotativos, además de participar en cogeneración.
- **Generación distribuida y respaldo:** algunas microturbinas y unidades aeroderivadas se instalan cerca de las cargas o como apoyo. La velocidad de arranque depende del modelo y no debe generalizarse a todas las turbinas.

Las turbinas de estructura pesada suelen orientarse a potencias altas y servicio estacionario. Las aeroderivadas provienen de diseños relacionados con la aviación y destacan por ser compactas. El U.S. Department of Energy (s. f.-b) señala que las configuraciones y relaciones de presiones difieren según el tipo de máquina.

## 2.12 Ciclo Brayton y generación eléctrica

En una central eléctrica, el eje de la turbina se conecta a un generador. El rotor del generador gira dentro de un campo magnético y produce una tensión eléctrica por inducción electromagnética. Después, sistemas de excitación, control, protección y transformación permiten entregar esa energía a una red o a cargas locales.

La cadena de conversión principal se resume en la Figura 4. Primero, el combustible aporta energía química. La combustión la convierte en energía térmica de los gases. La turbina transforma parte de esa energía en movimiento mecánico. Finalmente, el generador transforma el giro del eje en energía eléctrica. En cada paso existen pérdidas, de modo que la electricidad obtenida siempre es menor que la energía inicial del combustible.

[[FIGURE:figura_4_conversion_energetica.png|Figura 4. Cadena de conversión energética en una turbina a gas con generador.|Nota. El diagrama muestra la ruta principal y algunas pérdidas inevitables. Elaboración propia.]]

Parte del trabajo de la turbina se utiliza internamente para mover el compresor. El generador recibe el trabajo neto disponible después de este consumo y de las pérdidas mecánicas. Luego su propia eficiencia determina cuánta potencia eléctrica aparece en los terminales. El U.S. Department of Energy (s. f.-b) describe esta doble función del rotor de la turbina: sostener el compresor y mover el generador.

Esta aplicación se relaciona directamente con una carrera de Electricidad y Energías Renovables. Permite unir contenidos de máquinas eléctricas, potencia, eficiencia, protecciones y sistemas de generación con la fuente mecánica que hace girar el generador. También ayuda a comparar una central térmica con fuentes renovables: en todas se necesita una cadena de conversión, pero cambia la fuente primaria de energía.

## 2.13 Ciclo combinado Brayton-Rankine

Una turbina a gas de ciclo simple todavía expulsa gases calientes. En una central de ciclo combinado, ese calor se aprovecha en vez de rechazarse directamente. El ciclo Brayton funciona como ciclo superior y el ciclo Rankine, basado en agua y vapor, funciona como ciclo inferior.

Los gases de escape pasan por una **caldera de recuperación de calor**, conocida por la sigla HRSG. Allí transfieren energía al agua para producir vapor a presión. El vapor se expande en una turbina de vapor y produce trabajo adicional. Después se condensa y una bomba devuelve el agua hacia la caldera. No es necesario mezclar los gases de combustión con el agua: la transferencia ocurre a través de superficies metálicas.

[[FIGURE:figura_5_ciclo_combinado.png|Figura 5. Esquema básico de una central de ciclo combinado Brayton-Rankine.|Nota. El calor del escape Brayton alimenta la caldera de recuperación del ciclo Rankine. Elaboración propia.]]

La ventaja principal es obtener más electricidad a partir de una cantidad de combustible similar. La U.S. Energy Information Administration (2022) informó que, en promedios operacionales de 2020, las unidades combinadas necesitaron menos energía de combustible por kWh que las unidades de ciclo simple. Una menor tasa térmica significa mejor aprovechamiento del combustible.

El ciclo combinado no elimina las pérdidas ni las emisiones asociadas al combustible fósil. Tampoco debe confundirse con cogeneración. El ciclo combinado usa el calor para producir electricidad adicional mediante vapor; la cogeneración utiliza parte del calor en un proceso externo, por ejemplo calefacción o secado. Algunas plantas pueden integrar ambas ideas, pero no son sinónimos.

El ciclo Rankine solo se introduce aquí para entender la recuperación del calor. Su estudio detallado incluye bomba, caldera, turbina de vapor y condensador, y corresponde a un análisis diferente. Lo más importante para este informe es reconocer que el escape Brayton puede convertirse en la entrada térmica de otro ciclo y aumentar la eficiencia global.

## 2.14 Ejemplo numérico

Se resolverá un ejercicio de ciclo ideal con temperaturas elegidas para que la compresión y la expansión sean coherentes con una misma relación de presiones. Se considera aire con calores específicos constantes:

- <i>T</i><sub>1</sub> = 300 K
- <i>T</i><sub>2</sub> = 450 K
- <i>T</i><sub>3</sub> = 1.200 K
- <i>T</i><sub>4</sub> = 800 K
- <i>c</i><sub>p</sub> = 1,005 kJ/(kg·K)
- γ = 1,4

### Paso 1. Trabajo específico del compresor

[[EQUATION:<i>w</i><sub>c</sub> = 1,005(450 - 300) = 150,75 kJ/kg]]

El compresor necesita 150,75 kJ para comprimir cada kilogramo de aire. Este valor representa una entrada de trabajo y no una producción.

### Paso 2. Trabajo específico producido por la turbina

[[EQUATION:<i>w</i><sub>t</sub> = 1,005(1.200 - 800) = 402,00 kJ/kg]]

La turbina produce 402,00 kJ por cada kilogramo de fluido que atraviesa el ciclo ideal. Esta es la producción bruta antes de descontar el consumo del compresor.

### Paso 3. Trabajo específico neto

[[EQUATION:<i>w</i><sub>neto</sub> = 402,00 - 150,75 = 251,25 kJ/kg]]

El resultado indica que quedan 251,25 kJ/kg como trabajo neto ideal. El compresor utiliza 150,75/402,00 = 37,5 % del trabajo bruto producido por la turbina.

### Paso 4. Comprobación mediante calor y eficiencia

El calor agregado es:

[[EQUATION:<i>q</i><sub>in</sub> = 1,005(1.200 - 450) = 753,75 kJ/kg]]

Por lo tanto:

[[EQUATION:η = 251,25 / 753,75 = 0,3333 = 33,33 %]]

También puede verificarse la relación de presiones. Como <i>T</i><sub>2</sub>/<i>T</i><sub>1</sub> = <i>T</i><sub>3</sub>/<i>T</i><sub>4</sub> = 1,5, se obtiene <i>r</i><sub>p</sub> = 1,5<super>3,5</super> ≈ 4,13. Al reemplazar este valor en la ecuación ideal de eficiencia se obtiene nuevamente 33,33 %. La coincidencia confirma que los cuatro estados son consistentes con las hipótesis utilizadas.

> **Interpretación.** De cada 753,75 kJ/kg agregados como calor, el ciclo ideal entrega 251,25 kJ/kg como trabajo neto. El resto se rechaza en la etapa 4 → 1. Una máquina real entregaría menos debido a las pérdidas.

## 2.15 Analogía para una disertación

Puede imaginarse un sistema formado por una bomba de bicicleta, un calentador ideal y un pequeño molinete. Primero se usa la bomba para comprimir aire: hay que realizar esfuerzo y el aire aumenta su presión y temperatura. Después, en una situación solamente imaginaria y segura, ese aire comprimido recibe calor sin que la presión cambie demasiado. Luego se libera a través del molinete; al expandirse, el aire lo hace girar y entrega trabajo. Finalmente, el aire sale al ambiente y el sistema toma aire nuevo para repetir el proceso.

La correspondencia es directa: la bomba representa el compresor, el calentamiento representa la cámara de combustión, el molinete representa la turbina y la salida representa el escape. La analogía permite recordar las cuatro ideas: comprimir, calentar, expandir y descargar.

Esta comparación tiene límites. Una turbina real opera con flujo continuo, velocidades muy altas, combustión controlada y varias etapas de álabes. Además, no se debe calentar un recipiente presurizado como experimento doméstico. La analogía sirve para explicar el orden de los procesos, pero no sustituye el análisis técnico.

## 2.16 Ventajas y desventajas

Las ventajas y desventajas dependen del tipo de turbina y de su forma de operación. No todas las unidades responden igual: una aeroderivada de ciclo simple puede ser liviana y rápida, mientras una gran central de ciclo combinado tiene más equipos y una respuesta diferente. La Tabla 3 presenta afirmaciones generales con su alcance (Darrow et al., 2017; U.S. Department of Energy, s. f.-b).

[[TABLECAPTION:Tabla 3. Ventajas y desventajas de las turbinas que operan según el ciclo Brayton]]
| Ventajas | Desventajas |
|---|---|
| Alta relación potencia/peso, especialmente en diseños aeroderivados y aeronáuticos. | Las temperaturas elevadas exigen materiales resistentes, refrigeración de álabes y mantenimiento especializado. |
| Flujo y funcionamiento continuos, adecuados para generación e industria según el diseño. | Una parte importante del trabajo de la turbina es consumida por el compresor. |
| Posibilidad de respuesta relativamente rápida en unidades de ciclo simple; el tiempo depende de la instalación. | El ciclo simple desaprovecha gran parte del calor del escape y consume más combustible por kWh que un ciclo combinado. |
| Diversidad de usos: electricidad, propulsión, bombas, compresores y cogeneración. | La eficiencia disminuye fuera de las condiciones de diseño y puede verse afectada por una alta temperatura ambiente. |
| El escape puede aprovecharse en recuperadores o ciclos combinados. | Con combustibles fósiles se producen CO₂ y contaminantes como NOₓ; las emisiones no son nulas. |

El gas natural produce menos CO₂ por unidad de energía que el carbón o el petróleo, pero sigue siendo un combustible fósil. Además, la cadena de suministro puede presentar fugas de metano. Por eso no es correcto describir una turbina a gas natural como una tecnología “sin emisiones” (U.S. Energy Information Administration, 2024).

La eficiencia a carga parcial puede ser menor porque las temperaturas, los caudales y las relaciones de operación se alejan de los valores de diseño. En cambio, el aprovechamiento del escape y una buena estrategia de operación pueden mejorar el uso del combustible. Estas características deben evaluarse para cada proyecto y no solo a partir del ciclo ideal.

## 2.17 Relación con energías renovables

El ciclo Brayton **no es necesariamente renovable**. Es una forma de convertir calor en trabajo, y su clasificación ambiental depende del origen del calor o del combustible. La mayoría de las turbinas a gas instaladas tradicionalmente utilizan combustibles fósiles. Sin embargo, existen aplicaciones y líneas de investigación que buscan conectarlas con recursos renovables o con sistemas de menor emisión.

[[TABLECAPTION:Tabla 4. Grado de madurez de algunas relaciones entre Brayton y energías renovables]]
| Alternativa | Situación general | Precaución al explicarla |
|---|---|---|
| Biogás, biometano y algunos biocombustibles | Hay aplicaciones comerciales en equipos compatibles y combustibles aprobados. | El combustible puede necesitar limpieza, acondicionamiento y autorización del fabricante; no todo biocombustible sirve directamente. |
| Combustibles sostenibles de aviación y sintéticos | Existen rutas aprobadas y producción comercial limitada; continúa el escalamiento. | El beneficio depende de la materia prima, la electricidad y el ciclo de vida; “sintético” no significa automáticamente renovable. |
| Mezclas de hidrógeno | Algunos equipos admiten mezclas y existen demostraciones. | La fracción permitida depende del diseño; deben controlarse estabilidad de llama y NOₓ. |
| Hidrógeno al 100 % en grandes turbinas | Se mantiene como área de demostración y desarrollo para una adopción amplia. | No produce CO₂ en la combustión, pero el impacto total depende de cómo se produzca el hidrógeno y puede haber NOₓ. |
| Solar térmica de concentración con Brayton | Se investiga con aire o CO₂ supercrítico y almacenamiento térmico. | Las plantas solares térmicas comerciales consolidadas usan principalmente vapor y Rankine; Brayton avanzado aún no es la opción predominante. |
| Ciclos Brayton cerrados con CO₂ supercrítico | Existen plantas piloto y programas de investigación para distintas fuentes de calor. | El CO₂ es fluido de trabajo, no combustible, y su uso no significa capturar las emisiones de otra planta. |

**Hidrógeno.** Puede producirse mediante electrólisis utilizando electricidad renovable. Algunos fabricantes y programas de investigación estudian mezclas o combustión con altas fracciones de hidrógeno. Como su llama tiene propiedades diferentes y puede favorecer la formación de NOₓ, se necesitan combustores adaptados y controles específicos. El U.S. Department of Energy (2021) financia estudios sobre ignición, retroceso de llama, estabilidad y emisiones en condiciones de turbinas comerciales. Por esto, conviene diferenciar aplicaciones selectivas actuales de la meta todavía emergente de utilizar hidrógeno puro de forma amplia.

**Combustibles sintéticos y biocombustibles.** Un combustible de origen renovable puede alimentar una máquina Brayton si cumple las especificaciones del equipo. En aviación, los combustibles sostenibles incluyen hidrocarburos sintetizados a partir de biomasa, residuos o carbono gaseoso. Su producción y uso están creciendo, pero todavía requieren desarrollo de cadenas de suministro y verificación de compatibilidad (U.S. Department of Energy, s. f.-d). No debe suponerse que cualquier aceite, biogás o combustible sintético puede ingresar sin tratamiento a una turbina.

**Solar térmica y almacenamiento.** Una planta solar de concentración utiliza espejos para producir calor. Ese calor puede almacenarse y después entregarse a un ciclo de potencia. Los ciclos con CO₂ supercrítico se investigan para trabajar a alta temperatura y lograr equipos compactos. El U.S. Department of Energy (s. f.-a) presenta esta opción como investigación para la próxima generación de plantas solares, no como la configuración comercial dominante.

**Ciclos cerrados.** En un Brayton cerrado, el fluido recircula y puede calentarse desde una fuente externa. Esto abre la posibilidad de usar calor solar, geotérmico, nuclear, residual o almacenado. Los ciclos cerrados con CO₂ supercrítico se encuentran en escalamiento y pilotaje para distintas fuentes térmicas (U.S. Department of Energy, s. f.-c). Su valor está en la conversión eficiente del calor, no en que el CO₂ actúe como combustible.

La conclusión crítica es que una turbina madura puede combinarse con un combustible o una fuente de calor emergente. Por eso deben analizarse por separado la madurez de la máquina, la disponibilidad del combustible, las emisiones en el punto de uso y las emisiones del ciclo de vida.

## 2.18 Preguntas que podrían realizar durante la disertación

1. **¿Qué diferencia existe entre una turbina y un compresor?** El compresor recibe trabajo para aumentar la presión del aire; la turbina recibe gases calientes y entrega trabajo al eje mientras estos se expanden.
2. **¿Por qué aumenta la temperatura cuando se comprime el aire?** Porque el trabajo realizado sobre el aire eleva su energía interna y su entalpía. En una compresión rápida se transfiere poco calor al ambiente.
3. **¿Qué significa que un proceso sea isentrópico?** Significa que la entropía permanece constante. En el modelo ideal requiere un proceso adiabático e internamente reversible.
4. **¿Dónde se produce el trabajo útil?** Se origina en la expansión a través de la turbina. El trabajo útil es lo que queda después de mover el compresor y cubrir las pérdidas.
5. **¿Por qué el ciclo real tiene menor eficiencia que el ideal?** Porque existen fricción, turbulencia, caídas de presión, pérdidas térmicas y eficiencias imperfectas en compresor y turbina.
6. **¿Qué representa la etapa 4 → 1 en una turbina abierta?** Representa el escape de los gases y su reemplazo por aire ambiente. No implica necesariamente que exista un enfriador físico.
7. **¿Qué efecto tiene aumentar la relación de presiones?** En el modelo ideal aumenta la eficiencia, pero también eleva el trabajo del compresor. Para temperaturas límites fijas existe un valor que maximiza el trabajo neto.
8. **¿Por qué la turbina no entrega todo su trabajo al generador?** Porque el mismo eje debe mover el compresor y otros equipos auxiliares.
9. **¿Qué relación tiene Brayton con una central de ciclo combinado?** Brayton produce potencia con la turbina a gas y su escape caliente genera vapor para un ciclo Rankine, obteniendo trabajo adicional.
10. **¿El ciclo Brayton es una energía renovable?** No por sí mismo. Puede usar gas fósil o conectarse con calor solar, biocombustibles o hidrógeno; la clasificación depende de la fuente y de su ciclo de vida.

[[PAGEBREAK]]

# 3. Conclusión

Después de investigar el ciclo Brayton, se puede entender como una herramienta sencilla para ordenar el funcionamiento de una turbina a gas. El modelo muestra cómo un gas pasa por compresión, adición de calor, expansión y rechazo de calor. También deja claro que se trata de un ciclo termodinámico porque, en la representación ideal, el fluido vuelve al mismo estado inicial después de completar los cuatro procesos.

El compresor cumple una función indispensable, ya que eleva la presión del aire antes de la combustión, pero para hacerlo necesita trabajo. En la cámara de combustión se transforma la energía química del combustible en energía térmica y aumenta la temperatura del gas. Luego la turbina permite que ese gas se expanda y entregue energía mecánica al eje. La diferencia entre lo que produce la turbina y lo que consume el compresor es el trabajo neto disponible.

Los diagramas P-v y T-s ayudan a observar estos cambios desde dos puntos de vista. El primero permite seguir presión y volumen específico; el segundo muestra temperatura y entropía. En especial, el diagrama T-s facilita reconocer que los procesos isentrópicos ideales son verticales y que los procesos reales aumentan la entropía debido a las irreversibilidades.

La eficiencia térmica permite evaluar qué parte del calor agregado se convierte en trabajo neto. La relación de presiones influye en esa eficiencia, en la temperatura después de la compresión y en los trabajos del compresor y la turbina. Sin embargo, un aumento de presión no resuelve todo por sí solo, porque la temperatura máxima, las pérdidas y la eficiencia de los componentes también limitan el funcionamiento real.

En generación eléctrica, el ciclo Brayton conecta la energía del combustible con la rotación de un generador. Además, el calor del escape puede utilizarse en un ciclo combinado Brayton-Rankine para producir más electricidad. Esta aplicación muestra por qué el tema es relevante para la formación en Electricidad y Energías Renovables: permite comprender tanto la máquina térmica que entrega movimiento como el equipo eléctrico que convierte ese movimiento en electricidad.

Finalmente, distinguir el ciclo ideal del real fue uno de los aprendizajes más importantes. El modelo ideal sirve para calcular, comparar y explicar, pero una turbina verdadera presenta fricción, caídas de presión, pérdidas de calor y límites de materiales. También es necesario evitar llamar renovable al ciclo por sí mismo. Su impacto depende del combustible o la fuente de calor, y varias alternativas como hidrógeno, combustibles sintéticos y ciclos cerrados con CO₂ supercrítico todavía combinan aplicaciones selectivas con investigación y demostración.

[[PAGEBREAK]]

# 4. Bibliografía

Çengel, Y. A., Boles, M. A., & Kanoğlu, M. (2019). *Thermodynamics: An engineering approach* (9th ed.). McGraw-Hill Education.

Darrow, K., Tidball, R., Wang, J., & Hampson, A. (2017, septiembre). *Catalog of CHP technologies*. U.S. Environmental Protection Agency, Combined Heat and Power Partnership. [https://www.epa.gov/sites/default/files/2015-07/documents/catalog_of_chp_technologies.pdf](https://www.epa.gov/sites/default/files/2015-07/documents/catalog_of_chp_technologies.pdf)

Greitzer, E. M., Spakovszky, Z. S., & Waitz, I. A. (s. f.). *16.Unified: Thermodynamics and propulsion*. Massachusetts Institute of Technology. [https://web.mit.edu/course/16/16.unified/www/FALL/thermodynamics/notes/notes.html](https://web.mit.edu/course/16/16.unified/www/FALL/thermodynamics/notes/notes.html)

Moran, M. J., Shapiro, H. N., Boettner, D. D., & Bailey, M. B. (2018). *Fundamentals of engineering thermodynamics* (9th ed.). Wiley.

National Aeronautics and Space Administration. (2021, 13 de mayo). *Turbine engine thermodynamic cycle - Brayton cycle*. NASA Glenn Research Center. [https://www.grc.nasa.gov/www/k-12/airplane/brayton.html](https://www.grc.nasa.gov/www/k-12/airplane/brayton.html)

Smithsonian Institution. (s. f.). *Model of G. B. Brayton gas engine, U.S. Patent No. 125166*. [https://www.si.edu/object/nmah_846185](https://www.si.edu/object/nmah_846185)

U.S. Department of Energy. (s. f.-a). *Concentrating solar-thermal power (CSP) power cycles*. [https://www.energy.gov/cmei/systems/concentrating-solar-thermal-power-csp-power-cycles](https://www.energy.gov/cmei/systems/concentrating-solar-thermal-power-csp-power-cycles)

U.S. Department of Energy. (s. f.-b). *How gas turbine power plants work*. [https://www.energy.gov/hgeo/how-gas-turbine-power-plants-work](https://www.energy.gov/hgeo/how-gas-turbine-power-plants-work)

U.S. Department of Energy. (s. f.-c). *Supercritical CO2 tech team*. [https://www.energy.gov/supercritical-co2-tech-team](https://www.energy.gov/supercritical-co2-tech-team)

U.S. Department of Energy. (s. f.-d). *Sustainable aviation fuel initiative*. [https://www.energy.gov/cmei/fuels/sustainable-aviation-fuel-initiative](https://www.energy.gov/cmei/fuels/sustainable-aviation-fuel-initiative)

U.S. Department of Energy. (2021, 12 de mayo). *Project selections: University Turbines Systems Research (UTSR) - Focus on hydrogen (H2) fuels*. [https://www.energy.gov/hgeo/articles/project-selections-university-turbines-systems-research-utsr-focus-hydrogen-h2-fuels](https://www.energy.gov/hgeo/articles/project-selections-university-turbines-systems-research-utsr-focus-hydrogen-h2-fuels)

U.S. Energy Information Administration. (2022, 25 de abril). *Most combined-cycle power plants employ two combustion turbines with one steam turbine*. [https://www.eia.gov/todayinenergy/detail.php?id=52158](https://www.eia.gov/todayinenergy/detail.php?id=52158)

U.S. Energy Information Administration. (2024, 16 de abril). *Natural gas and the environment*. [https://www.eia.gov/energyexplained/natural-gas/natural-gas-and-the-environment.php](https://www.eia.gov/energyexplained/natural-gas/natural-gas-and-the-environment.php)
