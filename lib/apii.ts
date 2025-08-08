import fs from 'fs/promises';
import path from 'path';
const filePath = path.join(process.cwd(), 'data', 'inventory.json');

export const getInventoryItems = async (): Promise<InventoryItem[]> => {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

export const saveInventoryItem = async (item: InventoryItem) => {
  const data = await getInventoryItems();
  data.push(item);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
};
