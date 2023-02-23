export function invalidRequest() {
    return {
      name: "ConflictError",
      message: "Você tentou acessar uma credencial vazia e/ou que não é sua",
    };
  }
  