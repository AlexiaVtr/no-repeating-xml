const fs = require('fs'); // Importa el módulo 'fs' para poder leer y escribir archivos

  // Lee el contenido del archivo ".txt"
fs.readFile('./xml.txt', 'utf8', function(err, data) {
  if (err) throw err; 

  // Objeto RegExpAll para buscar los componentes globales y elementos
    const regexAll = /(<xsd:complexType|<xsd:element|<xsd:simpleType) name="(.+?)"/g;

   // Objeto RegExp para buscar solo los nombrbes de los componentes globales
    const regex = /(<xsd:complexType name=")(.+?)(">)/g;
    const modifiedName = [];

  // Función para obtener el nombre y agregar un número al final
  function getNextNumber(name) {
    if (data.includes(name)) {
        return 3
    } else {
        return ''
    }
  }

  // Result obtiene los nombres y verifica si hay repetidos
  let result = data.replace(regex, (match, type, name) => {

  // De haberlo, almacena el match en un array;
  // Si encuentra el repetido nuevamente reemplaza el nombre afectando solo uno

    if (modifiedName.includes(name)) {
        const nextNumber = getNextNumber(name);
        return `${type} name="${name}${nextNumber}"`;
        
    }else{
        modifiedName.push(name)
        return match
  }
});

  // Escribe el resultado en un nuevo archivo ".txt"
  fs.writeFile('./nuevoarchivo.txt', result, 'utf8', function(err) {
    if (err) throw err;

    console.log('El archivo ha sido modificado con éxito');
  });
});