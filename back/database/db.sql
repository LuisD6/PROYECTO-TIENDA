CREATE DATABASE tienda;

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    categoria VARCHAR(100),
    imagen VARCHAR(255)
);


-- Insertar 10 productos en la tabla productos

INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagen) 
VALUES
('Silla Ergonómica', 'Silla ergonómica para oficina con soporte lumbar ajustable.', 7000, 15, 'Muebles', 'img/silla-ergonomica.jpeg'),
('Tablet 10"', 'Tablet de 10 pulgadas con 64 GB de almacenamiento y batería de larga duración.', 5000, 18, 'Electrónica', 'img/tablet-10.jpeg'),
('Laptop Gamer', 'Laptop de alto rendimiento para videojuegos con procesador Intel Core i7.', 25000, 10, 'Electrónica', 'img/laptop-gamer.jpeg'),
('Monitor UltraWide 29"', 'Monitor UltraWide de 29 pulgadas con resolución Full HD.', 8000, 20, 'Electrónica', 'img/monitor-ultrawide-29.jpeg'),
('Bocinas Bluetooth', 'Bocinas portátiles bluetooth con sonido envolvente 360°.', 1300, 22, 'Audio', 'img/bocinas-bluetooth.jpeg'),
('Smartphone Android', 'Smartphone con pantalla AMOLED de 6.5 pulgadas y cámara de 108 MP.', 12000, 25, 'Electrónica', 'img/smartphone-android.jpeg'),
('Auriculares Inalámbricos', 'Auriculares bluetooth con cancelación de ruido y calidad de sonido HD.', 1500, 50, 'Audio', 'img/auriculares-inalambricos.jpeg'),
('Ratón Gaming', 'Ratón ergonómico para videojuegos con hasta 16000 DPI y luces RGB.', 800, 40, 'Periféricos', 'img/raton-gaming.jpeg'),
('Disco Duro Externo 1TB', 'Disco duro externo de 1TB de capacidad, compatible con USB 3.0.', 1200, 35, 'Almacenamiento', 'img/disco-duro-externo-1tb.jpeg'),
('Teclado Mecánico RGB', 'Teclado mecánico con retroiluminación RGB y switches Cherry MX Red.', 1200, 30, 'Periféricos', 'img/teclado-mecanico-rgb.jpeg');


-- Consulta todo los productos
SELECT * FROM productos;

-- Agrega una restricción de unicidad al campo nombre
ALTER TABLE productos
ADD CONSTRAINT nombre_unico UNIQUE (nombre);
