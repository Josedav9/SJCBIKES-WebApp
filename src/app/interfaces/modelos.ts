export interface Usuario {
  id?:string,
  nombre:String,
  apellido:String,
  fNacimiento:String,
  lugarTrabajo?:String,
  cedula:String
}

export interface Bicicleta {
  id?:string,
  idBicicleta:String,
  prestada:boolean
}

export interface Parqueadero {
  id?:string,
  nombre:String,
  lat:number,
  lng:number,
  bicicletas:String[]
}

export interface Viaje {
  id?:string,
  horaPrestamo:Date,
  horaDevolucion:Date,
  parqueaderoOrigen:String,
  parqueaderoDestino:String,
  idBicicleta?:String

}
