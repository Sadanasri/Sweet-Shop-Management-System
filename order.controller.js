const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
    // FIX: Use req.user.id instead of req.user.userId
    const userId = req.user.id;
    const { items } = req.body; // items: [{ id, quantity, price }]

    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'No items in order' });
    }

    try {
        // Calculate total and verify stock
        let total = 0;

        // Use transaction to ensure data integrity
        const result = await prisma.$transaction(async (tx) => {
            for (const item of items) {
                const sweet = await tx.sweet.findUnique({ where: { id: item.id } });
                if (!sweet) throw new Error(`Sweet ${item.name} not found`);
                if (sweet.quantity < item.quantity) throw new Error(`${sweet.name} is out of stock`);

                total += sweet.price * item.quantity;

                // Decrement stock
                await tx.sweet.update({
                    where: { id: item.id },
                    data: { quantity: sweet.quantity - item.quantity }
                });
            }

            // Create Order
            const order = await tx.order.create({
                data: {
                    userId,
                    total,
                    items: {
                        create: items.map(item => ({
                            sweetId: item.id,
                            quantity: item.quantity,
                            price: item.price
                        }))
                    }
                },
                include: { items: true }
            });
            return order;
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

const getUserOrders = async (req, res) => {
    // FIX: Use req.user.id instead of req.user.userId
    const userId = req.user.id;
    try {
        const orders = await prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: { sweet: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllOrders = async (req, res) => {
    // Check for Admin role
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    try {
        const orders = await prisma.order.findMany({
            include: {
                user: {
                    select: { id: true, name: true, email: true }
                },
                items: {
                    include: { sweet: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createOrder, getUserOrders, getAllOrders };
