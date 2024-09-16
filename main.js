// Selecciona el elemento del formulario JSON
const jsonForm=document.querySelector("#jsonForm")
//Selecciona el elemento del formulario CSV
const csvForm=document.querySelector("#csvForm")
// Selecciona el botón de convertir
const bConvert=document.querySelector("#bConvert")

// Añade un evento de clic al botón de convertir
bConvert.addEventListener("click",e=>{
    let json;               //Variable para almacenar el objeto JSON parseado
    let keys=[]           // Array para almacenar las claves de los objetos JSON
    let values=[]         // Array para almacenar los valores de cada objeto JSON

   

// Intenta parsear el valor del formulario JSON
// Si hay un error en el parseo, se muestra un mensaje en la consola
   try{
    json=JSON.parse(jsonForm.value)
   }
   catch(error){
    console.log(" formato incorrecto ",error)
   }

 // Verifica si el JSON parseado es un arreglo
  // Itera sobre cada elemento del arreglo JSON
  // Obtiene las claves del objeto actual   
  // Si 'keys' está vacío, inicialízalo con las claves del primer objeto
  //Si no esta vacio  Verifica si la longitud de las claves del objeto actual es diferente
  // y  Lanza un error si la longitud es diferente
  // Muestra las claves del objeto actual si son correctas
   if(Array.isArray(json)){
        json.forEach(item=>{
          const nkeys=Object.keys(item)

          if(keys.length===0){
            keys=[...nkeys]
           }
           else{
            if(keys.length!==nkeys.length){
                throw new Error("numero de claves distinto")
            }
            else{
            console.log("ok ",keys)
            }
           }
         // Crea una fila de valores utilizando las claves definidas
         // Mapea cada clave al valor correspondiente en el objeto
         const row=keys.map(k=>{
            return item[k]
         })
       // Añade la fila de valores al array de valores
       values.push(row)
       // Añade la fila de claves al inicio del array de valores
       values.unshift(keys)
      })
       // Convierte el array de valores a formato CSV
       // mapeando value y a cada valor que va a devolver lo separamos por comas
       //y esto se almacena en una constante text que se va a separar los elementos por 
       //un salto de linea para luego lo muestre el div del CSV
       const text=values.map(value=>{
        return value.join(",")
       }).join("\n")
       csvForm.value=text
    }
    // Muestra un mensaje si el JSON no es un arreglo
        else{
            alert("no es un array")}
})
