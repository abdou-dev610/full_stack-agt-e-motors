const Order = require('../models/Order');
const Product = require('../models/Product');

// Create order
exports.createOrder = async (req, res) => {
    try {
        const { customer, items, totalAmount, paymentMethod, notes } = req.body;

        // Validate items and check stock
        for (let item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Produit ${item.productId} non trouvé`,
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Stock insuffisant pour ${product.name}`,
                });
            }
        }

        const order = new Order({
            customer,
            items,
            totalAmount,
            paymentMethod,
            notes,
        });

        await order.save();

        // Update product stock
        for (let item of items) {
            await Product.findByIdAndUpdate(
                item.productId,
                { $inc: { stock: -item.quantity } }
            );
        }

        res.status(201).json({
            success: true,
            message: 'Commande créée avec succès',
            data: order,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;

        let query = {};
        if (status) {
            query.status = status;
        }

        const orders = await Order.find(query)
            .populate('items.productId')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Order.countDocuments(query);

        res.json({
            success: true,
            data: orders,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                currentPage: page,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get single order
exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id).populate('items.productId');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Commande non trouvée',
            });
        }

        res.json({
            success: true,
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, paymentStatus } = req.body;

        const order = await Order.findByIdAndUpdate(
            id,
            { status, paymentStatus },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Commande non trouvée',
            });
        }

        res.json({
            success: true,
            message: 'Statut de la commande mise à jour',
            data: order,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get orders by customer email
exports.getOrdersByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        const orders = await Order.find({ 'customer.email': email })
            .populate('items.productId')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete order
exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Commande non trouvée',
            });
        }

        res.json({
            success: true,
            message: 'Commande supprimée',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
