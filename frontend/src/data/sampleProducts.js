export const categories = [
    { id: '1', name: 'Smartphones', icon: '📱' },
    { id: '2', name: 'Laptops', icon: '💻' },
    { id: '3', name: 'Tablets', icon: '📟' },
    { id: '4', name: 'Smart Watches', icon: '⌚' },
    { id: '5', name: 'Headphones', icon: '🎧' },
    { id: '6', name: 'Cameras', icon: '📷' },
    { id: '7', name: 'Gaming', icon: '🎮' },
    { id: '8', name: 'Home Appliances', icon: '🏠' },
    { id: '9', name: 'Audio Systems', icon: '🔊' },
    { id: '10', name: 'Accessories', icon: '🔌' }
];

export const products = [
    // Smartphones (4 items) 
    {
        id: '1',
        name: 'iPhone 15 Pro',
        price: 999,
        category: '1',
        images: ['https://picsum.photos/300/300?random=1'],
        description: 'Latest iPhone with A17 Pro chip',
        brand: 'Apple',
        rating: 4.8,
        stock: 15,
        tags: ['premium', 'new'],
    },
    {
        id: '2',
        name: 'Samsung Galaxy S24',
        price: 849,
        category: '1',
        images: ['https://picsum.photos/300/300?random=2'],
        description: 'AI-powered Android flagship',
        brand: 'Samsung',
        rating: 4.6,
        stock: 20,
        tags: ['ai', 'premium'],
    },
    {
        id: '3', name: 'Google Pixel 8', price: 699, category: '1',
        images: ['https://picsum.photos/300/300?random=3'],
        description: 'Best camera phone with Google AI', brand: 'Google',
        rating: 4.5, stock: 25, tags: ['camera', 'ai'],
        specifications: { storage: '128GB', color: 'White', screen: '6.0"' }
    },
    {
        id: '4', name: 'OnePlus 12', price: 799, category: '1',
        images: ['https://picsum.photos/300/300?random=4'],
        description: 'Fast charging flagship killer', brand: 'OnePlus',
        rating: 4.4, stock: 18, tags: ['fast-charging', 'performance'],
        specifications: { storage: '256GB', color: 'Green', screen: '6.7"' }
    },
    // Laptops (4 items) 
    {
        id: '5',
        name: 'MacBook Pro 16"',
        price: 2399,
        category: '2',
        images: ['https://picsum.photos/300/300?random=5'],
        description: 'Professional laptop with M3 Max',
        brand: 'Apple',
        rating: 4.9,
        stock: 8,
        tags: ['premium', 'professional'],
    },
    {
        id: '6',
        name: 'Dell XPS 13',
        price: 1299,
        category: '2',
        images: ['https://picsum.photos/300/300?random=6'],
        description: 'Ultra-thin business laptop',
        brand: 'Dell',
        rating: 4.5,
        stock: 12,
        tags: ['business', 'portable'],
    },
    {
        id: '7', name: 'HP Spectre x360', price: 1499, category: '2',
        images: ['https://picsum.photos/300/300?random=7'],
        description: '2-in-1 convertible laptop', brand: 'HP',
        rating: 4.4, stock: 10, tags: ['convertible', 'touchscreen'],
        specifications: { storage: '1TB', ram: '16GB', screen: '14"' }
    },
    {
        id: '8', name: 'Lenovo ThinkPad X1', price: 1699, category: '2',
        images: ['https://picsum.photos/300/300?random=8'],
        description: 'Enterprise-grade business laptop', brand: 'Lenovo',
        rating: 4.6, stock: 15, tags: ['business', 'durable'],
        specifications: { storage: '512GB', ram: '16GB', screen: '14"' }
    },

    // Tablets (4 items)
    {
        id: '9', name: 'iPad Pro 12.9"', price: 1099, category: '3',
        images: ['https://picsum.photos/300/300?random=9'],
        description: 'Professional tablet with M2 chip', brand: 'Apple',
        rating: 4.7, stock: 20, tags: ['creative', 'professional'],
        specifications: { storage: '256GB', screen: '12.9"', cellular: 'Yes' }
    },
    {
        id: '10', name: 'Samsung Tab S9', price: 899, category: '3',
        images: ['https://picsum.photos/300/300?random=10'],
        description: 'Android tablet with S Pen', brand: 'Samsung',
        rating: 4.5, stock: 25, tags: ['s-pen', 'entertainment'],
        specifications: { storage: '128GB', screen: '11"', cellular: 'No' }
    },

    // Smart Watches (4 items) 
    {
        id: '11', name: 'Apple Watch Ultra 2', price: 799, category: '4',
        images: ['https://picsum.photos/300/300?random=11'],
        description: 'Rugged smartwatch for athletes', brand: 'Apple',
        rating: 4.8, stock: 30, tags: ['fitness', 'premium'],
        specifications: { size: '49mm', battery: '36h', gps: 'Yes' }
    },
    {
        id: '12', name: 'Samsung Galaxy Watch 6', price: 349, category: '4',
        images: ['https://picsum.photos/300/300?random=12'],
        description: 'Advanced health monitoring', brand: 'Samsung',
        rating: 4.4, stock: 35, tags: ['health', 'android'],
        specifications: { size: '44mm', battery: '40h', gps: 'Yes' }
    },

    // Headphones (4 items)
    {
        id: '13', name: 'Sony WH-1000XM5', price: 399, category: '5',
        images: ['https://picsum.photos/300/300?random=13'],
        description: 'Industry-leading noise cancellation', brand: 'Sony',
        rating: 4.8, stock: 40, tags: ['noise-cancelling', 'premium'],
        specifications: { type: 'Over-ear', battery: '30h', wireless: 'Yes' }
    },
    {
        id: '14', name: 'AirPods Pro 2', price: 249, category: '5',
        images: ['https://picsum.photos/300/300?random=14'],
        description: 'Wireless earbuds with ANC', brand: 'Apple',
        rating: 4.7, stock: 50, tags: ['wireless', 'compact'],
        specifications: { type: 'In-ear', battery: '6h', wireless: 'Yes' }
    },

    // Cameras (4 items) 
    {
        id: '15', name: 'Canon EOS R5', price: 3899, category: '6',
        images: ['https://picsum.photos/300/300?random=15'],
        description: 'Professional mirrorless camera', brand: 'Canon',
        rating: 4.9, stock: 5, tags: ['professional', '4k'],
        specifications: { resolution: '45MP', sensor: 'Full-frame', video: '8K' }
    },
    {
        id: '16', name: 'Sony A7 IV', price: 2499, category: '6',
        images: ['https://picsum.photos/300/300?random=16'],
        description: 'All-round mirrorless camera', brand: 'Sony',
        rating: 4.7, stock: 8, tags: ['hybrid', 'professional'],
        specifications: { resolution: '33MP', sensor: 'Full-frame', video: '4K' }
    },

    // Gaming (4 items) 
    {
        id: '17', name: 'PlayStation 5', price: 499, category: '7',
        images: ['https://picsum.photos/300/300?random=17'],
        description: 'Next-gen gaming console', brand: 'Sony',
        rating: 4.8, stock: 15, tags: ['console', '4k-gaming'],
        specifications: { storage: '825GB', resolution: '4K', rayTracing: 'Yes' }
    },
    {
        id: '18', name: 'Xbox Series X', price: 499, category: '7',
        images: ['https://picsum.photos/300/300?random=18'],
        description: 'Powerful gaming console', brand: 'Microsoft',
        rating: 4.7, stock: 18, tags: ['console', 'game-pass'],
        specifications: { storage: '1TB', resolution: '4K', rayTracing: 'Yes' }
    },
    // Home Appliances (4 items) 
    {
        id: '19', name: 'Dyson V15 Vacuum', price: 749, category: '8',
        images: ['https://picsum.photos/300/300?random=19'],
        description: 'Cordless vacuum with laser detection', brand: 'Dyson',
        rating: 4.6, stock: 25, tags: ['smart', 'cordless'],
        specifications: { power: '230AW', battery: '60min', weight: '3kg' }
    },
    {
        id: '20', name: 'Instant Pot Pro', price: 149, category: '8',
        images: ['https://picsum.photos/300/300?random=20'],
        description: '10-in-1 pressure cooker', brand: 'Instant Pot',
        rating: 4.5, stock: 40, tags: ['kitchen', 'multi-use'],
        specifications: { capacity: '8qt', programs: '10', safety: '13' }
    },
    // Audio Systems (4 items) 
    {
        id: '21', name: 'Sonos Beam Soundbar', price: 449, category: '9',
        images: ['https://picsum.photos/300/300?random=21'],
        description: 'Compact smart soundbar', brand: 'Sonos',
        rating: 4.5, stock: 30, tags: ['soundbar', 'smart'],
        specifications: { channels: '5.0', hdmi: 'eARC', voice: 'Alexa/Google' }
    },
    {
        id: '22', name: 'Bose SoundLink Revolve', price: 299, category: '9',
        images: ['https://picsum.photos/300/300?random=22'],
        description: '360-degree portable speaker', brand: 'Bose',
        rating: 4.4, stock: 35, tags: ['portable', '360-sound'],
        specifications: { battery: '12h', waterproof: 'IP55', weight: '0.68kg' }
    },
    // Accessories (4 items)  
    {
        id: '23', name: 'Apple MagSafe Charger', price: 39, category: '10',
        images: ['https://picsum.photos/300/300?random=23'],
        description: 'Magnetic wireless charger', brand: 'Apple',
        rating: 4.3, stock: 100, tags: ['charging', 'magnetic'],
        specifications: { power: '15W', cable: '1m', compatibility: 'MagSafe' }
    },
    {
        id: '24', name: 'Anker PowerCore 10000', price: 49, category: '10',
        images: ['https://picsum.photos/300/300?random=24'],
        description: 'Compact power bank', brand: 'Anker',
        rating: 4.6, stock: 80, tags: ['portable', 'fast-charging'],
        specifications: { capacity: '10000mAh', output: '18W', ports: '2' }
    },
    // Additional items to reach 40... 
    {
        id: '25', name: 'Samsung 4K Smart TV', price: 899, category: '8',
        images: ['https://picsum.photos/300/300?random=25'],
        description: '55" 4K UHD Smart Television', brand: 'Samsung',
        rating: 4.5, stock: 12, tags: ['television', 'smart-tv'],
        specifications: { size: '55"', resolution: '4K', smart: 'Tizen' }
    },
    {
        id: '26', name: 'Logitech MX Master 3', price: 99, category: '10',
        images: ['https://picsum.photos/300/300?random=26'],
        description: 'Advanced wireless mouse', brand: 'Logitech',
        rating: 4.7, stock: 45, tags: ['mouse', 'wireless'],
        specifications: { dpi: '4000', battery: '70d', connectivity: 'Bluetooth' }
    },
];