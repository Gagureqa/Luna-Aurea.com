import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  category: { 
    type: String, 
    required: true,
    enum: ['rings', 'earrings', 'necklaces', 'bracelets']
  },
  price: { 
    type: Number, 
    required: true,
    min: 0
  },
  images: [{ 
    type: String 
  }],
  description: { 
    type: String,
    required: true
  },
  material: { 
    type: String,
    required: true
  },
  collection: { 
    type: String,
    enum: ['solaris', 'luna', 'classic', 'premium'],
    default: 'classic'
  },
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  weight: Number
}, { 
  timestamps: true 
});

// Индексы для быстрого поиска
productSchema.index({ category: 1 });
productSchema.index({ collection: 1 });
productSchema.index({ price: 1 });
productSchema.index({ name: 'text', description: 'text' });

export default mongoose.model('Product', productSchema);