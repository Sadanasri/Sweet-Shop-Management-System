const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const purchaseSweet = async (req, res) => {
    const { id } = req.params;
    const sweet = await prisma.sweet.findUnique({ where: { id: parseInt(id) } });
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });
    if (sweet.quantity <= 0) return res.status(400).json({ message: 'Out of stock' });

    const updatedSweet = await prisma.sweet.update({
        where: { id: parseInt(id) },
        data: { quantity: sweet.quantity - 1 },
    });

    res.json(updatedSweet);
};

const restockSweet = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const sweet = await prisma.sweet.findUnique({ where: { id: parseInt(id) } });
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });

    const updatedSweet = await prisma.sweet.update({
        where: { id: parseInt(id) },
        data: { quantity: sweet.quantity + parseInt(quantity) },
    });

    res.json(updatedSweet);
};

module.exports = { purchaseSweet, restockSweet };
