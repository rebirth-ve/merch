// Este archivo ahora solo contendrá los productos por defecto
// La gestión de productos se hará a través de localStorage en App.js
export const defaultProducts = [
  {
    id: '1',
    name: 'Chaqueta Bomber "Night Rider"',
    price: 85.00,
    image: 'https://via.placeholder.com/300x400/000000/FFFFFF?text=Chaqueta+Bomber',
    description: 'Chaqueta bomber de nylon con forro acolchado, ideal para las noches frías de la ciudad. Cierre frontal con cremallera y bolsillos laterales.',
    category: 'Chaquetas',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Verde Militar']
  },
  {
    id: '2',
    name: 'Sudadera con Capucha "Urban Flow"',
    price: 55.00,
    image: 'https://via.placeholder.com/300x400/333333/FFFFFF?text=Sudadera+Capucha',
    description: 'Sudadera de algodón suave con capucha ajustable y bolsillo canguro. Perfecta para un look casual y cómodo.',
    category: 'Sudaderas',
    sizes: ['S', 'M', 'L'],
    colors: ['Gris', 'Azul Marino']
  },
  {
    id: '3',
    name: 'Jeans Slim Fit "Street Vibe"',
    price: 70.00,
    image: 'https://via.placeholder.com/300x400/666666/FFFFFF?text=Jeans+Slim+Fit',
    description: 'Jeans de mezclilla elástica con corte slim fit, desgastes sutiles y rotos en las rodillas. Estilo moderno y versátil.',
    category: 'Pantalones',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Azul Claro', 'Negro Deslavado']
  },
  {
    id: '4',
    name: 'Playera Gráfica "City Lights"',
    price: 30.00,
    image: 'https://via.placeholder.com/300x400/999999/FFFFFF?text=Playera+Grafica',
    description: 'Playera de algodón con estampado gráfico inspirado en las luces de la ciudad. Cuello redondo y corte regular.',
    category: 'Playeras',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Blanco', 'Negro']
  },
  {
    id: '5',
    name: 'Tenis Urbanos "Velocity"',
    price: 95.00,
    image: 'https://via.placeholder.com/300x400/CCCCCC/FFFFFF?text=Tenis+Urbanos',
    description: 'Tenis de diseño moderno con suela gruesa y detalles reflectantes. Comodidad y estilo para el día a día.',
    category: 'Calzado',
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Blanco', 'Negro', 'Rojo']
  },
  {
    id: '6',
    name: 'Gorra Snapback "Street King"',
    price: 25.00,
    image: 'https://via.placeholder.com/300x400/E0E0E0/FFFFFF?text=Gorra+Snapback',
    description: 'Gorra snapback con visera plana y bordado frontal. Ajustable para un calce perfecto.',
    category: 'Accesorios',
    sizes: ['Única'],
    colors: ['Negro', 'Blanco', 'Rojo']
  }
];