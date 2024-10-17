export const getVehicleType = plate => {
  // Comprobamos si la placa termina en una letra (A-Z)
  return /^[A-Z]+$/.test(plate.slice(-1)) ? 'moto' : 'carro'
}
