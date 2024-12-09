CREATE TRIGGER trg_Auditoria_Clientes
AFTER INSERT, UPDATE, DELETE
ON Clientes
FOR EACH ROW
BEGIN
    DECLARE v_tipo_operacion VARCHAR(10);
    DECLARE v_usuario VARCHAR(50);
    
    IF (NEW.Codigo_Cliente IS NOT NULL AND OLD.Codigo_Cliente IS NULL) THEN
        SET v_tipo_operacion = 'INSERT';
        SET v_usuario = USER();
        
        -- Insertar en la tabla de auditoría
        INSERT INTO Auditoria_Clientes (
            Codigo_Cliente,
            Nombre_Cliente_Anterior,
            Nombre_Cliente_Nuevo,
            Direccion_Anterior,
            Direccion_Nueva,
            Fecha,
            Tipo_Operacion,
            Usuario
        ) VALUES (
            NEW.Codigo_Cliente,
            NULL, 
            NEW.Nombre_Cliente,
            NULL,  
            NEW.Direccion,
            NOW(), 
            v_tipo_operacion,
            v_usuario
        );
    ELSIF (NEW.Codigo_Cliente IS NOT NULL AND OLD.Codigo_Cliente IS NOT NULL) THEN
      
        SET v_tipo_operacion = 'UPDATE';
        SET v_usuario = USER(); 
        
        -- Insertar en la tabla de auditoría
        INSERT INTO Auditoria_Clientes (
            Codigo_Cliente,
            Nombre_Cliente_Anterior,
            Nombre_Cliente_Nuevo,
            Direccion_Anterior,
            Direccion_Nueva,
            Fecha,
            Tipo_Operacion,
            Usuario
        ) VALUES (
            NEW.Codigo_Cliente,
            OLD.Nombre_Cliente,
            NEW.Nombre_Cliente,
            OLD.Direccion,
            NEW.Direccion,
            NOW(),  -- Fecha y hora actuales
            v_tipo_operacion,
            v_usuario
        );
    ELSIF (NEW.Codigo_Cliente IS NULL AND OLD.Codigo_Cliente IS NOT NULL) THEN
        SET v_tipo_operacion = 'DELETE';
        SET v_usuario = USER(); -
        
        INSERT INTO Auditoria_Clientes (
            Codigo_Cliente,
            Nombre_Cliente_Anterior,
            Nombre_Cliente_Nuevo,
            Direccion_Anterior,
            Direccion_Nueva,
            Fecha,
            Tipo_Operacion,
            Usuario
        ) VALUES (
            OLD.Codigo_Cliente,
            OLD.Nombre_Cliente,
            NULL, 
            OLD.Direccion,
            NULL, 
            NOW(),  -- Fecha y hora actuales
            v_tipo_operacion,
            v_usuario
        );
    END IF;
END;
