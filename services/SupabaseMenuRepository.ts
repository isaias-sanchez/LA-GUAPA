import { MenuItem, MenuCategory } from '../types';
import { IMenuRepository } from '../types/architecture';
import { supabase } from '../lib/supabase';

export class SupabaseMenuRepository implements IMenuRepository {

    async getAll(): Promise<MenuItem[]> {
        const { data, error } = await supabase
            .from('menu_items')
            .select('*')
            .order('order', { ascending: true })
            .order('chapter', { ascending: true }); // Secondary sort

        if (error) {
            console.error('Error fetching menu:', error);
            // Fallback to empty or handled upstream
            return [];
        }

        // Map snake_case DB to camelCase Interface
        return data.map((row: any) => ({
            id: row.id,
            name: row.name,
            category: row.category as MenuCategory,
            chapter: row.chapter,
            history: row.history,
            description: row.description,
            price: row.price,
            tags: row.tags || [],
            image: row.image_url, // Mapping image_url -> image
            isSoldOut: row.is_sold_out,
            isVisible: row.is_visible,
            isFeatured: row.is_featured,
            allergens: row.allergens || [],
            sku: row.sku,
            order: row.order
        }));
    }

    async update(id: string, changes: Partial<MenuItem>): Promise<void> {
        // Map updates to snake_case
        const updates: any = {};
        if (changes.name !== undefined) updates.name = changes.name;
        if (changes.category !== undefined) updates.category = changes.category;
        if (changes.chapter !== undefined) updates.chapter = changes.chapter;
        if (changes.history !== undefined) updates.history = changes.history;
        if (changes.description !== undefined) updates.description = changes.description;
        if (changes.price !== undefined) updates.price = changes.price;
        if (changes.tags !== undefined) updates.tags = changes.tags;
        if (changes.image !== undefined) updates.image_url = changes.image; // Map back
        if (changes.isSoldOut !== undefined) updates.is_sold_out = changes.isSoldOut;
        if (changes.isVisible !== undefined) updates.is_visible = changes.isVisible;
        if (changes.isFeatured !== undefined) updates.is_featured = changes.isFeatured;
        if (changes.allergens !== undefined) updates.allergens = changes.allergens;
        if (changes.sku !== undefined) updates.sku = changes.sku;
        if (changes.order !== undefined) updates.order = changes.order;

        const { error } = await supabase
            .from('menu_items')
            .update(updates)
            .eq('id', id);

        if (error) {
            console.error(`Error updating item ${id}:`, error);
            throw new Error(`Error Supabase: ${error.message}`);
        }
    }

    async create(item: MenuItem): Promise<void> {
        const row = {
            id: item.id,
            name: item.name,
            category: item.category,
            chapter: item.chapter,
            history: item.history,
            description: item.description,
            price: item.price,
            tags: item.tags,
            image_url: item.image,
            is_sold_out: item.isSoldOut ?? false,
            is_visible: item.isVisible ?? true,
            is_featured: item.isFeatured ?? false,
            allergens: item.allergens ?? [],
            sku: item.sku,
            order: item.order ?? 0
        };

        const { error } = await supabase
            .from('menu_items')
            .insert(row);

        if (error) {
            console.error('Error creating item:', error);
            throw new Error(`Error Supabase: ${error.message}`);
        }
    }

    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from('menu_items')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting item:', error);
            throw new Error(`Error Supabase: ${error.message}`);
        }
    }
}
