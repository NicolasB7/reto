/**
 * funcion para obtener el unix timestamp actual
 * @returns int, segundos que han pasado desde el 1° de enero de 1970
 */
 const unixTimestamp = () => {  
    return Math.floor(
        Date.now() / 1000
    )
}

module.exports = unixTimestamp