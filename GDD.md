# Sawa's Song

## Ficha Técnica 

### Título 
+ Sawa’s Song
### Género
+ Roguelike
+ Bullet Hell
+ Disparos
+ Ritmo
### Target Audience
+ Core Gamers
### Calificación por edades
+ PEGI 7
### Plataforma
+ Navegador PC

## Mecánicas
### Zona de Juego
La zona de juego está compuesta por un tablero de 7 x 5 casillas.
Hay 3 zonas delimitadas por columnas (de izquierda a derecha) en el tablero:
+ Zona del Jugador → Columnas 1-3
+ Zona Neutral → Columnas 4-6
+ Zona del rival → Columnas 7

Los jugadores y el enemigo solo pueden hallarse de forma natural sobre su propia zona, en una casilla o concreta (o varias si el rival es más grande de 1 casilla).

Las notas musicales en cambio viajarán en línea recta por las filas independientemente de las zonas, pudiendo encontrarse entre 2 casillas a la vez.

### Acciones del jugador
El jugador puede realizar 2 acciones manualmente:
+ Moverse:
El jugador podrá moverse a otra casilla adyacente a la actual dentro de su zona.
+ Tocar un instrumento:
El jugador podrá tocar un instrumento. Esta es la principal manera de colocar notas musicales en el tablero.

### Sistema de Autoestima (PV)
El jugador y el enemigo tienen un contador de autoestima cada uno que empieza cada combate a 0 puntos. Cuando una nota del contrario toca a uno de los 2 la autoestima de quien haya lanzado la nota aumenta. El que tenga más autoestima al final del combate gana. Ganar con gran margen mejora las recompensas recibidas al final del combate. 

La representación de la autoestima es un medidor compartido que empieza al 50% y se mueve en la dirección a quien va perdiendo.  

Hay marcas cuando la ventaja es del 30, 60 %. Y al acabar un combate se consiguen mejores recompensas por cada marca. 

El jugador y el rival tienen una cantidad concreta de puntos de autoestima visibles en todo momento. Cuando una nota del rival impacte contra el jugador su autoestima se reducirá en función de la nota que le impacte y viceversa. 

Cuando el jugador es golpeado este recibe unos instantes de invulnerabilidad. Esto no ocurre al golpear al enemigo.


### Ritmo
Cada enemigo tiene un ritmo. Esto es el latido constante de la música que suena al enfrentarte a él, a partir de ahora beat. 

El ritmo estará representado de manera visual en la parte izquierda de la pantalla

Ejecutar acciones al ritmo de la música (pulsando la tecla en el momento del beat, con un margen de error) puede potenciar la acción tomada por el jugador, dependiendo de los instrumentos y artefactos que tenga el jugador en su poder.

Nótese que no es obligatorio realizar las acciones al ritmo y es solo un efecto adicional, es una recompensa por seguir el ritmo, no un castigo por no hacerlo.

El ritmo coincide con el tiempo que tardan las notas en avanzar una casilla completa.


## Notas Musicales
Las notas musicales son los proyectiles que surcan el tablero. Avanzan a velocidad constante (salvo efectos especiales) en dirección al contrario a quien las produjo. De forma normal está velocidad es una casilla por beat.
### Tipos
+ Redondas (Opcional) → aumenta la autoestima en 8
+ Blancas → aumenta la autoestima en 4
+ Negras → aumenta la autoestima en 2
+ Corcheas → aumenta la autoestima en 1
### Keywords
+ Adagio → avanzan a x0.5 de velocidad. Aplicar adagio a una nota allegro elimina ambas keywords.
+ Allegro → avanzan a x2 de velocidad. Aplicar allegro a una nota adagio, elimina ambas keywords.
+ Forte → Pueden destruir notas enemigas al tocarlas. Al destruir una nota, su categoría de nota baja en 1. Es decir con cada golpe se convertirían en la siguiente a la derecha (blanca → negra → corchea →desaparecer). Opcional: (Solo pueden destruir una nota por beat)
+ Piano → las notas piano no pueden dañar al rival (ni colisionar con otras notas con forte). Algunos instrumentos permiten aplicar esta palabra a notas enemigas o quitarselo a las tuyas. Hay instrumentos que generan estas notas por defecto.
+ Earworm →stackable. las notas con earworm aplican cargas de earworm al impactar. Un personaje con earworm en cada beat genera motivación para el enemigo igual a sus acumulaciones de earworm, después se reducen a la mitad (redondeado hacia abajo) las acumulaciones de earworm.
+ Acompañamiento → cuando otra nota del mismo jugador toca una nota con acompañamiento, la otra nota recibe los efectos de acompañamiento.
+ Silencio → bloquea el movimiento de esta nota durante X beats. Sinergias con acompañamiento o comprar tiempo.

Una nota puede tener forte y piano a la vez. Si esto es así no se chocará con otras notas hasta que se elimine piano.

## Instrumentos
El jugador podrá llevar 3 instrumentos como máximo en todo momento encima. Cada instrumento es único con sus propias estadísticas y forma de generar notas.
### Estadísticas
+ Género: Cada instrumento tendrá un género musical asignado con su propio arquetipo. Al tener equipados varios instrumentos del mismo género se aplicarán efectos pasivos dependiendo del género acumulado.
+ Cooldown: Beats que tienen que pasar hasta que pueda volver a ser usado.
+ Tipo de nota: El tipo de nota que produce el instrumento, puede ser blanca, negra o corchea.
+ Número de notas: Número de notas del tipo dicho anteriormente que produce el instrumento en la misma columna de casillas.
+ Posición de puesta de notas: Generalmente es justo delante del jugador, pero puede ser en carriles adyacentes o con efectos más especiales.
+ Efectos: Si es que los tienen, pueden ser desde efectos pasivos hasta otros que ocurran al usarlos. 
### Efectos de los instrumentos
Los siguientes son efectos que contienen multitud de instrumentos. No obstante, los instrumentos pueden tener efectos más complejos.
+ Vibrato: Genera un proyectil que recorre una línea entera, al tocar una nota la cambiará de forma aleatoria al carril de arriba o de abajo.
+ Sostenuto: Se coloca en la casilla delante del jugador (a menos que se especifique lo contrario). Cada beat generará una nota. Dura 5 beats por defecto. El jugador puede empujarlo como si fuese un bloque de sokoban. Al empujarlo contra la casilla de arriba del todo(de forma que el jugador tendría que acabar su movimiento en esta) el jugador y el sostenuto intercambiarán su posición.
+ Tempo: El efecto a continuación de Tempo se gana al usar un instrumento al ritmo. 
+ Syncopate: Cuando el jugador se mueve al ritmo, este efecto se aplica inmediatamente. 
+ X arriba/abajo: Mueven al jugador X casillas en la dirección indicada.
+ Combo X: un instrumento con combo, aplica su efecto cuando tus últimas x acciones fueron al ritmo. Un instrumento puede tener varios efectos de combo con distintas X 
+ Grand Finale: un instrumento aplica el efecto a continuación de grand finale si el combate está en sus últimos 20/30 segundos.
+ Advance X: te mueve X casillas hacia delante y te ancla en la posición 1-2 beats. Después te devuelve a tu posición original. Generalmente te permitirá usar otros instrumentos en el proceso (sinergiza mejor con instrumentos que lancen todas las notas en el instante inicial pq si las lanza secuencialmente se lanzan mientras vuelves.).
+ Idle: tras tocar el instrumento este efecto se aplica hasta que te muevas.
+ Ancla: no te permite moverte hasta que finalice su efecto.
+ Generador de notas: genera algún tipo de unidad o proyectil que genera notas. Un ejemplo sería un cascabel que lo lanzas y genera notas al caer en una casilla. U otro ejemplo es un lanzador de mininutrias, que deja nutrias en el tablero que producen notas a la vez que se mueven.

## Artefactos
Equipamiento que puede obtener Sawa con efectos pasivos muy poderosos. El jugador puede tener artefactos ilimitados, pero lo normal es que no consiga más de 3 o 4 durante una run.

## Generación de personaje
2 opciones
+ El jugador podrá elegir varias clases antes de comenzar la partida. La clase que escoja determinará su Autoestima Inicial, los instrumentos con los que empieza (ya sean 1 o varios) y sus artefactos iniciales. Pese a empezar con un instrumento el jugador siempre tiene espacio para 3 instrumentos.
+ Consigues un artefacto al azar entre una selección de artefactos iniciales y eliges un arma común.


## Mejoras
Las mejoras son complementos que se pueden poner a los instrumentos, cada instrumento puede tener una mejora. Las mejoras pueden modificar los 3 siguientes parámetros de un instrumento:
+ Tipo de nota: +1 / +2 (si poderosa)
+ Número de notas +1 / +2 (si poderosa)
+ Cooldown -1 / -2 (si poderosa)
+ aplicar una keyword a las notas producidas
+ otros efectos

Una mejora puede mejorar sutilmente el instrumento, o hacerlo mucho más poderoso pero con algún drawback. Las mejoras se generan de manera aleatoria. Si son simples, tendrán el efecto de la izquierda, pero si son poderosas tendrán el efecto positivo de la derecha, pero el inverso de la izquierda de otra categoría.

### Ejemplos:
+ Mejora Simple: Mejora de nota +1 (si son corcheas, pasa a lanzar negras)
+ Mejora poderosa: Cooldown -2, -1 número de notas(si lanzaba 2 ahora lanza 1)

## Recompensas
Tras cada combate el jugador ganará conchas proporcionalmente la autoestima respecto la del rival, una recompensa al azar y además podrá elegir 1 de 2 fans que le darán cada uno una selección de recompensas igual a las marcas de autoestima que se hayan superado en el combate. Cada tipo de recompensa solo aparecerá una vez tras cada combate, es decir no puede haber tipos de recompensa duplicados en una misma pantallas de recompensas.
### Tipos de recompensas
+ Conchas: Una cantidad generosa de conchas, te permiten comprar cosas
+ Elección de instrumento: Un nuevo instrumento a elegir entre 3
+ Elección de instrumento por género: Sólo aparecerá antes del combate contra el boss si tienes varios instrumentos del mismo género.
+ Mejoras: Una mejora que podrás aplicar a uno de tus instrumentos
+ Artefactos: Un objeto con un efecto pasivo muy poderoso
+ Compra de Instrumentos: Tendrá disponibles 3 instrumentos de entre todos los disponibles al azar, puedes adquirir uno o varios. Puedes vender los instrumentos que ya no te hagan falta por una cantidad mínima de conchas
+ Compra de mejoras: Tiene 3 mejoras generadas automáticamente al azar, puedes adquirir una o varias y aplicarla a uno de tus instrumentos
+ Compra de artefactos: Tiene 3 artefactos de entre todos los disponibles (que no tengas ya) al azar, puedes adquirir uno o varios. Esta tienda es más cara que las 2 anteriores.


## Menús
Menú principal
+ Jugar
  + Pulsar ESC
    + Menú de Pausa 
      + Música (subir o bajar el volumen)
      + Silenciar (apaga la música por completo)
      + Asignar Botones (permite configurar con que botones se pueden hacer las cosas)
      + Volver a empezar (reinicia la partida, hace lo mismo que el botón jugar del menú principal)
      + Salir al menú principal
      + Atrás
+ Opciones
  + Música (subir o bajar el volumen)
  + Silenciar
  + Asignar Botones
  + Atrás
+ Salir

## Estética
### Historia
Sawa es una nutría que tras escuchar del SEA (Symphonic Entertainment Arena) abandona su río para competir y ser reconocida como la mejor música del océano.

La historia no se cuenta de manera explícita en ningún momento. Simplemente el juego es de una nutria intentando ganar un campeonato de música.

### Estilo Gráfico
El estilo de dibujo es adorable, cute, kawai. De colores pastel y esponjoso. Por ejemplo:


## Referencias
### One step from Eden (Thomas Moon Kang, 2020)→ Inspirado el sistema de cuadrícula, bullet hell y varios efectos
### Crypt of the Necrodancer (Brace Yourself Games, 2015) → Sistema de ritmo 
### Slay the spire (Mega Crit, 2019) → Artefactos
### Monster train (Shiny Show, 2020) → Sistema de recompensas
### Guitar hero (Activison-Neversoft, 2005)→ Notas musicales por carriles
### Zenless Zone Zero (miHOYO, 2024) → Sostenuto con comportamiento similar a bloque de Sokoban
