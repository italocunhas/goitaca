import { useState } from 'react';
import { SIZES, BASES, COMPLEMENTS, TOPPINGS, EXTRAS } from '../data';

export function useAcaiBuilder() {
  const [selectedSize, setSelectedSize] = useState<typeof SIZES[0] | null>(null);
  const [selectedBases, setSelectedBases] = useState<string[]>([]);
  const [selectedComplements, setSelectedComplements] = useState<string[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const handleBaseToggle = (base: string) => {
    setSelectedBases(prev => {
      if (prev.includes(base)) {
        return prev.filter(b => b !== base);
      }
      if (prev.length >= 2) return prev;
      return [...prev, base];
    });
  };

  const handleComplementToggle = (complement: string) => {
    setSelectedComplements(prev => {
      if (prev.includes(complement)) {
        return prev.filter(c => c !== complement);
      }
      if (prev.length >= 5) return prev;
      return [...prev, complement];
    });
  };

  const handleToppingToggle = (topping: string) => {
    setSelectedToppings(prev => {
      if (prev.includes(topping)) {
        return prev.filter(t => t !== topping);
      }
      if (prev.length >= 2) return prev;
      return [...prev, topping];
    });
  };

  const handleExtraToggle = (extra: string) => {
    setSelectedExtras(prev => {
      if (prev.includes(extra)) {
        return prev.filter(e => e !== extra);
      }
      return [...prev, extra];
    });
  };

  const resetForm = () => {
    setSelectedSize(null);
    setSelectedBases([]);
    setSelectedComplements([]);
    setSelectedToppings([]);
    setSelectedExtras([]);
    setQuantity(1);
  };

  const calculateTotal = () => {
    if (!selectedSize) return 0;
    const basePrice = selectedSize.price;
    const extrasPrice = selectedExtras.reduce((sum, extra) => {
      const extraItem = EXTRAS.find(e => e.name === extra);
      return sum + (extraItem?.price || 0);
    }, 0);
    return (basePrice + extrasPrice) * quantity;
  };

  return {
    selectedSize,
    setSelectedSize,
    selectedBases,
    handleBaseToggle,
    selectedComplements,
    handleComplementToggle,
    selectedToppings,
    handleToppingToggle,
    selectedExtras,
    handleExtraToggle,
    quantity,
    setQuantity,
    calculateTotal,
    resetForm
  };
} 