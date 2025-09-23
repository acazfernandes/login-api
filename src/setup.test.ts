describe('Suite de Teste Inicial', () => {
  it('deve garantir que o ambiente de teste está funcionando', () => {
    // Arrange (Organizar)
    const num1 = 1;
    const num2 = 2;

    // Act (Agir)
    const result = num1 + num2;

    // Assert (Verificar)
    expect(result).toBe(3);
  });
});
