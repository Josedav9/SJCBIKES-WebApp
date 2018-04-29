export interface Usuario {
  id?:string,
  nombre:String,
  apellido:String,
  fNacimiento:String,
  lugarTrabajo?:String,
  cedula:String,
  prestada:string
}

export interface Bicicleta {
  id?:string,
  idBicicleta:string,
  prestada:string
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
  horaDevolucion?:Date,
  parqueaderoOrigen:String,
  parqueaderoDestino?:String,
  idBicicleta?:string

}
