export const navbarList = [
  {
    title: 'Trang chủ',
    href: '/',
  },
  {
    title: 'Nam▼',
    href: '/',
  },
  {
    title: 'Nữ▼',
    href: '/',
  },
  {
    title: 'Phụ kiện',
    href: '/',
  },
  {
    title: 'Sale',
    href: '/',
  },
];

export const footerProducts = [
  {
    title: 'Váy đầm',
    href: '/',
  },
  {
    title: 'Áo nữ',
    href: '/',
  },
  {
    title: 'Quần',
    href: '/',
  },
  {
    title: 'Áo nam',
    href: '/',
  },
  {
    title: 'Túi xách',
    href: '/',
  },
];

export const footerSupports = [
  {
    title: 'Chính sách bảo hành',
    href: '/',
  },
  {
    title: 'Hướng dẫn mua hàng',
    href: '/',
  },
  {
    title: 'Chính sách đổi trả',
    href: '/',
  },
  {
    title: 'Câu hỏi thường gặp',
    href: '/',
  },
  {
    title: 'Liên hệ',
    href: '/',
  },
];

export const footerContacts = [
  {
    title: 'xxx Trường Chinh, TP. Đà Nẵng',
    icon: '📍',
  },
  {
    title: '1900-1234',
    icon: '📞',
  },
  {
    title: 'support@techmart.vn',
    icon: '📧',
  },
  {
    title: '24/7',
    icon: '🕒',
  },
];

export const brandList = [
  {
    logo: '👑',
    title: 'Luxury Brand',
  },
  {
    logo: '✨',
    title: 'Premium',
  },
  {
    logo: '🌟',
    title: 'Elite Fashion',
  },
  {
    logo: '💎',
    title: 'Diamond',
  },
  {
    logo: '🏆',
    title: 'Champion',
  },
  {
    logo: '🎯',
    title: 'Target Style',
  },
];

// Dữ liệu giả (mock)
export const mockApi = {
  categories: [
    {
      id: 1,
      name: 'Váy đầm',
      count: 245,
      icon: '👗',
      bgColor: 'bg-blue-100',
      hoverBgColor: 'hover:bg-blue-200',
    },
    {
      id: 2,
      name: 'Áo nữ',
      count: 189,
      icon: '👚',
      bgColor: 'bg-red-100',
      hoverBgColor: 'hover:bg-red-200',
    },
    {
      id: 3,
      name: 'Quần',
      count: 156,
      icon: '👖',
      bgColor: 'bg-yellow-100',
      hoverBgColor: 'hover:bg-yellow-200',
    },
    {
      id: 4,
      name: 'Áo nam',
      count: 134,
      icon: '👔',
      bgColor: 'bg-green-100',
      hoverBgColor: 'hover:bg-green-300',
    },
    {
      id: 5,
      name: 'Túi xách',
      count: 98,
      icon: '👜',
      bgColor: 'bg-pink-100',
      hoverBgColor: 'hover:bg-pink-200',
    },
    {
      id: 6,
      name: 'Giày dép',
      count: 167,
      icon: '👠',
      bgColor: 'bg-red-100',
      hoverBgColor: 'hover:bg-red-200',
    },
  ],
  featuredProducts: [
    {
      id: 101,
      name: 'Váy Maxi Hoa Nhí',
      description: 'Váy dài thanh lịch, phù hợp dạo phố',
      price: 490000,
      original_price: 700000,
      discount: '-30%',
      badges: ['HOT'],
      rating: 4.8,
      reviews_count: 124,
      image: 'images/vay-maxi.png',
      variants: ['S', 'M', 'L'],
      icon: '👗',
      bgColor: 'bg-blue-100',
      quantity: 1,
    },
    {
      id: 102,
      name: 'Áo Sơ Mi Nam Cao Cấp',
      description: 'Chất liệu cotton premium, form slim fit',
      price: 650000,
      original_price: null,
      discount: null,
      badges: ['NEW'],
      rating: 4.5,
      reviews_count: 89,
      image: 'images/ao-so-mi.png',
      variants: ['M', 'L', 'XL'],
      icon: '👔',
      bgColor: 'bg-green-100',
      quantity: 1,
    },
    {
      id: 103,
      name: 'Túi Xách Tote Da Thật',
      description:
        'Túi da cao cấp, thiết kế sang trọng Túi da cao cấp, thiết kế sang trọng Túi da cao cấp, thiết kế sang trọng',
      price: 1200000,
      original_price: 1600000,
      discount: '-25%',
      badges: [],
      rating: 4.7,
      reviews_count: 156,
      image: 'images/tui-xach.png',
      variants: ['brown', 'black', 'red'],
      colorVariants: true,
      icon: '👜',
      bgColor: 'bg-pink-100',
      quantity: 1,
    },
    {
      id: 104,
      name: 'Giày Cao Gót Thanh Lịch',
      description: 'Gót 7cm, thiết kế tối giản sang trọng',
      price: 890000,
      original_price: null,
      discount: null,
      badges: ['BEST'],
      rating: 4.9,
      reviews_count: 203,
      image: 'images/giay-cao-got.png',
      variants: ['36', '37', '38'],
      icon: '👠',
      bgColor: 'bg-red-100',
      quantity: 1,
    },
  ],
};

export const mockFilters = {
  categories: [
    { id: 1, name: 'Váy đầm', count: 245 },
    { id: 2, name: 'Áo nữ', count: 189 },
    { id: 3, name: 'Quần', count: 156 },
    { id: 4, name: 'Áo nam', count: 134 },
  ],
  priceRanges: [
    { id: 1, label: 'Dưới 500k', min: 0, max: 500000 },
    { id: 2, label: '500k - 1tr', min: 500000, max: 1000000 },
    { id: 3, label: '1tr - 2tr', min: 1000000, max: 2000000 },
    { id: 4, label: 'Trên 2tr', min: 2000000, max: null },
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: [
    { name: 'Black', code: '#000000' },
    { name: 'White', code: '#FFFFFF' },
    { name: 'Red', code: '#FF4D4F' },
    { name: 'Blue', code: '#1677FF' },
    { name: 'Green', code: '#52C41A' },
    { name: 'Yellow', code: '#FAAD14' },
    { name: 'Pink', code: '#EB2F96' },
    { name: 'Purple', code: '#722ED1' },
  ],
};
