import { MenuItem } from '../types';

// CAPA 1: PLANEACIÓN
export interface ChangeRequest {
  targetId: string;
  field: keyof MenuItem;
  newValue: any;
  intent?: string; 
}

// CAPA 2: EJECUCIÓN (Contrato del Repositorio)
export interface IMenuRepository {
  getAll(): Promise<MenuItem[]>;
  update(id: string, item: Partial<MenuItem>): Promise<void>;
  create(item: MenuItem): Promise<void>;
}

// CAPA 3: GOBERNANZA
export interface AuditResult {
  success: boolean;
  optimized: boolean;
  message: string;
}
