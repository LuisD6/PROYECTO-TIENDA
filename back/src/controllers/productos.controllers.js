import {pool} from '../db.js'

export const getProductos = async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM productos')
    res.json(rows)
};

export const getProducto = async (req, res) => {
    const {id} = req.params
    const {rows} = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);

    if (rows.length === 0){
        return res.status(404).json({messaje: "Producto no encontrado"});
    }

    res.json(rows[0])
}

export const createProducto = async (req, res) => {
    console.log(req.body)
    try {
        const { nombre, descripcion, precio, stock, categoria } = req.body;

        // Si existe un archivo, usa el prefijo 'img/' y el nombre del archivo.
        const imagen = req.file ? `img/${req.file.filename}` : null;

        // Insertamos los datos en la base de datos
        const { rows } = await pool.query(
            "INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagen) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [nombre, descripcion, precio, stock, categoria, imagen]
        );

        return res.json(rows[0]);
    } catch (error) {
        console.error(error);

        if (error?.code === "23505") {
            return res.status(409).json({ mensaje: "Este producto ya existe" });
        }

        return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};


export const deleteProducto = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);

    if (rowCount === 0) {
        return res.status(404).json({ mensaje: "Producto no eliminado" });
    }

    // Responder con un mensaje de éxito
    return res.json({ mensaje: "Producto eliminado con éxito" });
}

export const updateProducto = async (req, res) => {
    console.log(req.body)
    const { id } = req.params;
    console.log(req.body)
    const data = req.body;

    // Si existe un archivo, usa el prefijo 'img/' y el nombre del archivo
    if (req.file) {
        data.imagen = `img/${req.file.filename}`;
    }

    const fields = ['nombre', 'descripcion', 'precio', 'stock', 'categoria', 'imagen'];
    const updates = [];
    const values = [];

    fields.forEach(field => {
        if (data[field] !== undefined) {
            updates.push(`${field} = $${updates.length + 1}`);
            values.push(data[field]);
        }
    });

    if (updates.length === 0) {
        return res.status(400).send('No se proporcionaron campos para actualizar');
    }

    // Agregar el ID del producto al final de los valores
    values.push(id);

    const query = `UPDATE productos SET ${updates.join(', ')} WHERE id = $${values.length} RETURNING *`;

    try {
        const { rows } = await pool.query(query, values);
        
        if (rows.length === 0) {
            return res.status(404).send('Producto no encontrado');
        }

        return res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el producto');
    }
};
