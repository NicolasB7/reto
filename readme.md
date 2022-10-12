# Reto rest api alumnos

para este reto vamos a crear una api en la que registramos una curricula escolar que está conformada por cuatro tablas:
 * carrera
 * materias
 * grupo
 * horario

El modelo de base de datos entidad relacional es el siguiente

<p style = 'text-align:center;'>
    <img src='BD_alumnos_er.jpg' style='text-align: center'>
</p>

El modelo relacional es el siguiente

<p style = 'text-align:center;'>
    <img src='BD_relacional.jpg' style='text-align: center'>
</p>

pueden obtener el código para generar la base de datos en el archivos bd.sql en este repositorio o en el siguiente fragmento de código

~~~sql
CREATE DATABASE Reto;

USE Reto;

CREATE TABLE Carrera(
    ID_Carrera int NOT NULL AUTO_INCREMENT,
    Nombre varchar(200),
    Duracion int,
    PRIMARY KEY(ID_Carrera)
);

CREATE TABLE Materia(
    ID_Materia int NOT NULL AUTO_INCREMENT,
    Nombre varchar(200),
    Grado int,
    ID_Carrera int,
    PRIMARY KEY(ID_Materia),
    FOREIGN KEY(ID_Carrera) REFERENCES Carrera(ID_Carrera)
);

CREATE TABLE Grupo(
    ID_Grupo int,
    Nombre varchar(200),
    Grado int,
    PRIMARY KEY(ID_Grupo)
);

CREATE TABLE Horario(
    ID_Horario int NOT NULL AUTO_INCREMENT,
    Hora int,
    Dia int,
    ID_Grupo int,
    ID_Materia int,
    PRIMARY KEY(ID_Horario),
    FOREIGN KEY(ID_Grupo) REFERENCES Grupo(ID_Grupo),
    FOREIGN KEY(ID_Materia) REFERENCES Materia(ID_Materia)
);
~~~

en el caso de importar el archivo sql hay que dirigirse al directorio en que está instalado mariadb y en la carpeta bin utilizando una terminal ejecutar el siguiente comando:

~~~
 $ mysql -u root -p reto > C:/directorio/bd.sql
~~~

De lo contrario solamente hay que copiar y pegar en la consola el código sql mientras estamos en el cliente de mariadb.
 
Para entrar al cliente de mariadb en la consola hay que igualmente dirigirse al directorio de instalación de mariadb entonces dirigirse a la carpeta bin y ejecutar el comando mysql -u root -p e ingresar la contraseña del usuario root, misma que se definió en la instalación de mariadb

~~~
C:\Program Files\MariaDB 10.9\bin> mysql -u root -p
Enter password:
~~~

en este repositorio se encuentra el ejemplo visto el día lunes de la api sencilla de express, puedes utilizar este proyecto como referencia o trabajar directamente sobre el código del ejemplo o si así los prefieres puedes usar tu propia api de express respetando los directorios routes, configy controller.

para clonar el repositorio utiliza el siguiente comando:

~~~
$ git clone https://github.com/Uriel099/Reto_horario.git
~~~

para clonar el repositorio es necesario contar con git instalado y configurado con github y una vez que el repositorio sea clonado con la consola de comandos ejecutar el comando npm install para instalar las dependencias.

~~~
$ npm install
~~~

<br>

en esta api contaremos con los siguientes endpoints:

~~~
POST: /carrera
POST: /materia
POST: /grupo
POST: /Horario
~~~

Estos endpoints son para recibir la información y registrarla en la bd. La información se recibe en formato json en el body, el siguiente es el ejemplo de cómo se recibirán los datos de la tabla materia:

~~~js
{
    "Nombre": "Programacion orientada a objetos",
    "Grado": 2,
    "ID_Carrera": 1
}
~~~

No es necesario enviar el ID de cada elemento ya que estos son incrementales y se generarán en cada registro.
 
Es necesario hacer validaciones para comprobar que al ingresar una llave foránea ésta exista antes de ingresar los datos en la bd para que esta no arroje excepciones.
 
Cuando se registre un dato de manera exitosa el endpoint deberá devolver al cliente una respuesta con formato json con un status 201:

~~~js
{
    "ok": true
}
~~~

para responder en caso algún error es libre, ustedes pueden hacer su propio formato para devolver errores utilizando json.
 
Y por último solo tendremos un endpoint para obtener información de la base de datos que es el siguiente:

~~~
GET /grupo
~~~

En este endpoint deberá hacerse una consulta combinando la tabla horario, grupo y materia para obtener el horario de un grupo definido por el cliente.
 
ejemplo de datos enviados por el cliente:


~~~js
{
    "Grado": 5,
    "Nombre": "B"
}
~~~

ejemplo de datos enviados al cliente
~~~js
[
    {
        "Nombre": "Programacion orientada a objetos", //nombre de la materia
        "Grado": 5,
        "Hora": 7,
        "Dia": 2,
    },
    { 
        "Nombre": "Calculo integral", //nombre de la materia
        "Grado": 5,
        "Hora": 13,
        "Dia": 4,
    }
]
~~~