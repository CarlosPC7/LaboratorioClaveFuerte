import {commonPasswords, validarClave, tieneMayusculasYMinusculas, tieneNumeros, tieneCaracteresEspeciales, tieneLongitudMinima, tieneNombreUsuario, tienePalabrasComunes } from './main';


describe('Validaciones de la clave', () => {

  describe('tieneMayusculasYMinusculas', () => {
    it('debería retornar error si no hay mayúsculas y minúsculas', () => {
      // Arrange
      const clave = "password";

      // Act
      const resultado = tieneMayusculasYMinusculas(clave);

      // Assert
      expect(resultado.esValida).toBe(false);
      expect(resultado.error).toBe("La clave debe de tener mayúsculas y minúsculas");
    });
  });

  describe('tieneNumeros', () => {
    it('debería retornar error si no hay números', () => {
      // Arrange
      const clave = "Password!";

      // Act
      const resultado = tieneNumeros(clave);

      // Assert
      expect(resultado.esValida).toBe(false);
      expect(resultado.error).toBe("La clave debe de tener números");
    });
  });

  describe('tieneCaracteresEspeciales', () => {
    it('debería retornar error si no hay caracteres especiales', () => {
      // Arrange
      const clave = "Password123";

      // Act
      const resultado = tieneCaracteresEspeciales(clave);

      // Assert
      expect(resultado.esValida).toBe(false);
      expect(resultado.error).toBe("La clave debe de tener caracteres especiales");
    });
  });

  describe('tieneLongitudMinima', () => {
    it('debería retornar error si la longitud es menor a 8 caracteres', () => {
      // Arrange
      const clave = "Pass1!";

      // Act
      const resultado = tieneLongitudMinima(clave);

      // Assert
      expect(resultado.esValida).toBe(false);
      expect(resultado.error).toBe("La clave debe de tener una longitud mínima de 8 caracteres");
    });
  });

  describe('tieneNombreUsuario', () => {
    it('debería retornar error si la clave contiene el nombre del usuario', () => {
      // Arrange
      const nombreUsuario = "john";
      const clave = "johnPassword123!";

      // Act
      const resultado = tieneNombreUsuario(nombreUsuario, clave);

      // Assert
      expect(resultado.esValida).toBe(false);
      expect(resultado.error).toBe("La clave no debe tener el nombre del usuario");
    });
  });

  describe('tienePalabrasComunes', () => {
    it('debería retornar error si la clave contiene palabras comunes', () => {
      // Arrange
      const clave = "password123!";

      // Act
      const resultado = tienePalabrasComunes(clave, commonPasswords);

      // Assert
      expect(resultado.esValida).toBe(false);
      expect(resultado.error).toBe("La clave no debe de contener palabras comunes");
    });
  });

  describe('validarClave', () => {
    it('debería retornar error si la clave no es válida', () => {
      // Arrange
      const nombreUsuario = "john";
      const clave = "Password123!";

      // Act
      const resultado = validarClave(nombreUsuario, clave, commonPasswords);

      // Assert
      expect(resultado.esValida).toBe(false);
      expect(resultado.error).toBe("La clave no debe de contener palabras comunes");
    });

    it('debería retornar éxito si la clave es válida', () => {
      // Arrange
      const nombreUsuario = "john";
      const clave = "StrongP@ssw0rd!";

      // Act
      const resultado = validarClave(nombreUsuario, clave, commonPasswords);

      // Assert
      expect(resultado.esValida).toBe(true);
      expect(resultado.error).toBeUndefined();
    });
  });

});