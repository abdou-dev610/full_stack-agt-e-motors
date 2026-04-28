// API Constants and Configuration

const API_BASE_URL = process.env.API_URL || 'http://localhost:5000/api';

const PRODUCT_CATEGORIES = {
    ELECTRIC_VEHICLES: 'vehicules-electriques',
    CHARGING_STATIONS: 'bornes-recharge',
    PHOTOVOLTAIC: 'photovoltaique',
    ENERGY_EFFICIENCY: 'ee',
    ENERGY_MANAGEMENT: 'ems',
    BATTERY_STORAGE: 'bess',
    AGRIVOLTAISM: 'agrivoltaisme',
    RETROFIT: 'retrofit',
    THERMAL_INSULATION: 'isolation-thermique',
};

const ORDER_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
};

const PAYMENT_STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
};

const PAYMENT_METHODS = {
    CREDIT_CARD: 'credit-card',
    BANK_TRANSFER: 'bank-transfer',
    CHECK: 'check',
};

const CONTACT_CATEGORIES = {
    SUPPORT: 'support',
    SALES: 'sales',
    PARTNERSHIP: 'partnership',
    OTHER: 'other',
};

const CONTACT_STATUS = {
    NEW: 'new',
    READ: 'read',
    REPLIED: 'replied',
    CLOSED: 'closed',
};

module.exports = {
    API_BASE_URL,
    PRODUCT_CATEGORIES,
    ORDER_STATUS,
    PAYMENT_STATUS,
    PAYMENT_METHODS,
    CONTACT_CATEGORIES,
    CONTACT_STATUS,
};
