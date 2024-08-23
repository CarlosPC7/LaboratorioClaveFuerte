import { ValidacionClave } from './modelo';

// La clave debe de tener mayúsculas y minúsculas.
export const tieneMayusculasYMinusculas = (clave: string): ValidacionClave => {
  const tieneMayusculas = /[A-Z]/.test(clave);
  const tieneMinusculas = /[a-z]/.test(clave);
  if (!tieneMayusculas || !tieneMinusculas) {
    return { esValida: false, error: "La clave debe de tener mayúsculas y minúsculas" };
  }
  return { esValida: true };
};

// La clave debe de tener números.
export const tieneNumeros = (clave: string): ValidacionClave => {
  const tieneNumero = /\d/.test(clave);
  if (!tieneNumero) {
    return { esValida: false, error: "La clave debe de tener números" };
  }
  return { esValida: true };
};

// La clave debe de tener caracteres especiales (@,#,+, _, ...)
export const tieneCaracteresEspeciales = (clave: string): ValidacionClave => {
  const tieneEspeciales = /[@#_+.,!$%^&*()\-=[\]{};':"\\|,.<>/?]+/.test(clave);
  if (!tieneEspeciales) {
    return { esValida: false, error: "La clave debe de tener caracteres especiales" };
  }
  return { esValida: true };
};

// La clave debe de tener una longitud mínima de 8 caracteres.
export const tieneLongitudMinima = (clave: string): ValidacionClave => {
  if (clave.length < 8) {
    return { esValida: false, error: "La clave debe de tener una longitud mínima de 8 caracteres" };
  }
  return { esValida: true };
};

// La clave no debe tener el nombre del usuario.
export const tieneNombreUsuario = (nombreUsuario: string, clave: string): ValidacionClave => {
  if (clave.toLowerCase().includes(nombreUsuario.toLowerCase())) {
    return { esValida: false, error: "La clave no debe tener el nombre del usuario" };
  }
  return { esValida: true };
};

// La clave no debe de contener palabras comunes (le pasaremos un array de palabras comunes).
export const tienePalabrasComunes = (clave: string, commonPasswords: string[]): ValidacionClave => {
  const claveLower = clave.toLowerCase();
  const palabraComun = commonPasswords.find((password) => claveLower.includes(password.toLowerCase()));
  if (palabraComun) {
    return { esValida: false, error: "La clave no debe de contener palabras comunes" };
  }
  return { esValida: true };
};

// Función principal para validar la clave
export const validarClave = (
  nombreUsuario: string,
  clave: string,
  commonPasswords: string[]
): ValidacionClave => {
  const validadores = [
    tieneMayusculasYMinusculas(clave),
    tieneNumeros(clave),
    tieneCaracteresEspeciales(clave),
    tieneLongitudMinima(clave),
    tieneNombreUsuario(nombreUsuario, clave),
    tienePalabrasComunes(clave, commonPasswords),
  ];

  for (const validador of validadores) {
    if (!validador.esValida) {
      return validador;
    }
  }

  return { esValida: true };
};