export type InventoryItem = {
  id: string;
  name: string;
  drugType: string;
  strength: string;
  category: 'Consumables' | 'Supplies' | 'Equipments';
};
