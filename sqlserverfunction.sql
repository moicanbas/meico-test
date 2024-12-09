CREATE FUNCTION dbo.fn_quitar_espacios
(
    @cadena NVARCHAR(MAX)  -- Parámetro de entrada de tipo cadena
)
RETURNS NVARCHAR(MAX)
AS
BEGIN
    -- Declara una variable para almacenar la cadena resultante
    DECLARE @resultado NVARCHAR(MAX);

    -- Elimina los espacios en blanco de la cadena utilizando REPLACE
    SET @resultado = REPLACE(@cadena, ' ', '');

    -- Retorna la cadena sin espacios
    RETURN @resultado;
END;

SELECT dbo.fn_quitar_espacios('Este es un ejemplo de cadena con espacios');

