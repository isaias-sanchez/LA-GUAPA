import { MenuItem } from '../types';
import { IMenuRepository } from '../types/architecture';
import { MENU_ITEMS } from '../constants';

class LocalStorageRepository implements IMenuRepository {
    private STORAGE_KEY = 'acta_menu_v6';
    private items: MenuItem[];

    constructor() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            this.items = JSON.parse(saved);
        } else {
            this.items = [...MENU_ITEMS];
            this.save();
        }
    }

    private save() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
    }

    async getAll(): Promise<MenuItem[]> {
        await new Promise(resolve => setTimeout(resolve, 400));
        return this.items;
    }

    async update(id: string, changes: Partial<MenuItem>): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 600));

        const index = this.items.findIndex(i => i.id === id);
        if (index === -1) throw new Error("Item no encontrado.");

        this.items[index] = { ...this.items[index], ...changes };
        this.save();
        console.log(`[EJECUCIÓN] Item ${id} guardado en LocalStorage.`);
    }

    async create(item: MenuItem): Promise<void> {
        this.items.push(item);
        this.save();
    }

    async delete(id: string): Promise<void> {
        this.items = this.items.filter(i => i.id !== id);
        this.save();
    }
}

export class MenuManager {
    constructor(private repo: IMenuRepository) { }

    async autonomousUpdate(request: { id: string, description: string }): Promise<string> {

        // 1. PLANEACIÓN (Análisis de Tono)
        const qualityScore = this.analyzeTone(request.description);

        if (qualityScore < 0.3) {
            return "[GOBERNANZA] ⛔ BLOQUEADO: Texto demasiado 'corporativo'. Necesita más actitud.";
        }

        // 2. EJECUCIÓN
        try {
            const lowerDesc = request.description.toLowerCase();
            let autoTags = ["Clásico"];

            if (lowerDesc.includes("picante") || lowerDesc.includes("fuego")) autoTags = ["Picante", "Hot"];
            if (lowerDesc.includes("vegano") || lowerDesc.includes("verde")) autoTags = ["Veggie"];
            if (lowerDesc.includes("dulce")) autoTags = ["Sweet"];

            await this.repo.update(request.id, {
                history: request.description,
                tags: autoTags
            });
        } catch (e) {
            return `[ERROR] Fallo en persistencia: ${e}`;
        }

        // 3. GOBERNANZA
        return `[ÉXITO] ✅ Actualizado. Tags generados: ${request.description.toLowerCase().includes("picante") ? "FUEGO" : "STANDARD"}`;
    }

    private analyzeTone(text: string): number {
        if (text.length < 10) return 0.1;
        const punkWords = ["fuego", "calle", "sabor", "noche", "real", "caos", "alma", "bomba"];
        const matches = punkWords.filter(w => text.toLowerCase().includes(w));
        return (matches.length > 0 || text.length > 20) ? 1 : 0.2;
    }

    // CRUD Methods
    async getItems(): Promise<MenuItem[]> {
        return this.repo.getAll();
    }

    async saveItem(item: MenuItem): Promise<void> {
        // Handle creation vs update logic
        if (!item.id || item.id === 'new') {
            const newItem = { ...item, id: Date.now().toString() }; // Generate ID if new
            // Validate required fields if needed?
            if (!newItem.name) throw new Error("Nombre requerido");
            await this.repo.create(newItem);
        } else {
            await this.repo.update(item.id, item);
        }
    }

    async updateItem(id: string, changes: Partial<MenuItem>): Promise<void> {
        await this.repo.update(id, changes);
    }

    async deleteItem(id: string): Promise<void> {
        await this.repo.delete(id);
    }
}

// export const menuRepository = new LocalStorageRepository();
import { SupabaseMenuRepository } from './SupabaseMenuRepository';
export const menuRepository = new SupabaseMenuRepository();
export const menuManager = new MenuManager(menuRepository);
