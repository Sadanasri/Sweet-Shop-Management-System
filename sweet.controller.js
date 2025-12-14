const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addSweet = async (req, res) => {
    try {
        const { name, category, price, quantity } = req.body;
        // Handle file upload or text URL
        let imageUrl = req.body.imageUrl;
        if (req.file) {
            imageUrl = `http://127.0.0.1:5001/uploads/${req.file.filename}`;
        }

        const sweet = await prisma.sweet.create({
            data: {
                name,
                category,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                imageUrl
            }
        });
        res.status(201).json(sweet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAllSweets = async (req, res) => {
    const sweets = await prisma.sweet.findMany();
    res.json(sweets);
};

const searchSweets = async (req, res) => {
    const { name, category, minPrice, maxPrice } = req.query;
    const sweets = await prisma.sweet.findMany({
        where: {
            name: name ? { contains: name } : undefined,
            category: category || undefined,
            price: {
                gte: minPrice ? parseFloat(minPrice) : 0,
                lte: maxPrice ? parseFloat(maxPrice) : undefined,
            },
        },
    });
    res.json(sweets);
};

const updateSweet = async (req, res) => {
    const { id } = req.params;
    const { name, category, price, quantity, imageUrl: bodyImageUrl } = req.body;

    let imageUrl = bodyImageUrl;
    if (req.file) {
        imageUrl = `http://127.0.0.1:5001/uploads/${req.file.filename}`;
    }

    const data = {
        name,
        category,
        price: price ? parseFloat(price) : undefined,
        quantity: quantity ? parseInt(quantity) : undefined,
        imageUrl
    };

    // Remove undefined keys
    Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);

    const sweet = await prisma.sweet.update({ where: { id: parseInt(id) }, data });
    res.json(sweet);
};

const deleteSweet = async (req, res) => {
    const { id } = req.params;
    await prisma.sweet.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Sweet deleted' });
};

const purchaseSweet = async (req, res) => {
    const { id } = req.params;
    try {
        const sweet = await prisma.sweet.findUnique({ where: { id: parseInt(id) } });
        if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
        if (sweet.quantity < 1) return res.status(400).json({ message: 'Out of stock' });

        const updatedSweet = await prisma.sweet.update({
            where: { id: parseInt(id) },
            data: { quantity: sweet.quantity - 1 }
        });
        res.json(updatedSweet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addSweet, getAllSweets, searchSweets, updateSweet, deleteSweet, purchaseSweet };

