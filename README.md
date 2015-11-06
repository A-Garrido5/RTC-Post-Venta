# RTC-Post-Venta

Manual de desarrollo proyecto RTC PostVenta.

1.-  Instalación Node.js\n
    a)	Ir al sitio https://nodejs.org/en/ en la sección Downloads, descargar e instalar.

2.- Instalación Phonegap
    a)	Ir a l botón de inicio buscar la consola de comandos de Node.js y abrirla.
    b)	Ejecutar el comando “npm install phonegap” y esperar que finalice la instalación.

3.- Descargar Android Studio para obtener herramientas.
    a)	Ir al sitio http://developer.android.com/intl/es/sdk/index.html  y descargar.
    b)	Una vez instalado se debe ejecutar para abrir la herramienta “SDK Manager”.
    c)	En la ventana que se abrirá podrá descargar las herramientas que se utilizaron en este proyecto.
    d)	Seleccionar la sección “Tools” y la sección “Extras”.
    e)	Seleccionar la sección “Android 4.1.2 (API 16), la sección “Android 5.1.1 (API 22) y darle click a instalar.

4.- Ejecutar la aplicación.
    a)	En la consola de comandos de Node.js cambiar de directorios con el comando “cd”+”nombreDirectorio” hasta llegar a la carpeta RTCPostVenta.
    b)	Una vez ubicados en la carpeta indicada se debe ejecutar el comando “phonegap run android” , si existe un dispositivo android conectado la aplicación se ejecutará en él, en el caso contrario se abrirá el emulador y se ejecutará en este.
    c)	Ya está en condiciones de comprobar el funcionamiento de la aplicación.
    d)	Como alternativa puede ejecutar el comando “phonegap build android” que generará el archivo .apk en el directorio “RTCPostVenta\platforms\android\build\outputs\apk” , de esta forma puede realizar la instalación de forma manual en caso de tener problemas con el método anterior.
