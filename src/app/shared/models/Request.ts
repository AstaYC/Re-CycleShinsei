export interface Request {
  id: string;
  userId: string;
  wasteTypes: string[]; // ['plastique', 'verre', 'papier', 'métal']
  estimatedWeight: number;
  address: string;
  date: Date;
  timeSlot: string;
  notes?: string;
  status: 'en attente' | 'occupée' | 'en cours' | 'validée' | 'rejetée';
  actualWeight?: number;
}
