# Solucionador de Sopa de Letras

Aplicación web para resolver sopas de letras, detectando palabras en todas las direcciones (horizontal, vertical, diagonales) y resaltarlas en una matriz visual. Este proyecto forma parte de una prueba técnica de desarrollo.

## Tecnologías utilizadas

- HTML5
- CSS3 
- JavaScript

## Recursos especiales

- Búsqueda de palabras en matriz en 8 direcciones.
- Visualización interactiva de la matriz con las letras encontradas resaltadas.
- Interfaz adaptable para pantallas medianas.
- Separación clara de lógica (`script.js`), presentación (`style.css`) y estructura (`index.html`).

## Cómo desplegar / probar localmente

1. Clona este repositorio o descarga los archivos.
2. npm i y luego npm run dev
3. Ingresa la matriz (una línea por fila, letras separadas por comas).
4. Ingresa las palabras a buscar (una por línea).
5. Haz clic en **Buscar** para ver los resultados.

## Ejemplo para probar

Matriz (separada por comas):
N,D,E,K,I,C,A,N,G,U,R,O,G,E
S,X,R,Y,K,V,I,I,Q,G,W,Q,O,D
J,A,G,U,A,R,Z,W,B,N,K,O,U,A
M,L,E,L,E,F,A,N,T,E,H,O,G,W
L,O,B,O,N,U,T,R,I,A,O,U,S,U
W,W,O,S,O,G,A,T,O,V,R,T,M,O
H,L,Z,N,C,T,Y,Z,E,O,X,A,U,R
C,E,C,Y,T,I,B,U,R,O,N,S,R,O
C,O,N,E,J,O,Y,U,S,M,R,S,H,T
Y,N,I,F,E,F,P,T,E,Z,O,O,S,F
O,S,S,E,R,P,I,E,N,T,E,F,L,G
P,P,V,D,D,X,U,F,A,L,C,O,N,Y
M,O,N,O,C,U,Q,W,M,A,N,A,T,I
N,N,X,H,E,B,P,M,U,P,E,R,R,O

Palabras a buscar:
MANATI
LEON
PERRO
LORO
GATO
TORO
CONEJO
ORUGA
TIBURON
ELEFANTE
ALCON
SERPIENTE
JAGUAR
CANGURO
LOBO
MONO
NUTRIA

## Archivos principales

- `index.html` – estructura del sitio
- `style.css` – estilos
- `script.js` – lógica de búsqueda

## Autor

Desarrollado por Santiago como parte de una prueba técnica para la empresa **TEMPLE**.