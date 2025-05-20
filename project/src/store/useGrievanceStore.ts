import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Grievance, SecretMessage } from '../types';

interface GrievanceState {
  grievances: Grievance[];
  secretMessages: SecretMessage[];
  loveScore: number;
  addGrievance: (grievance: Omit<Grievance, 'id' | 'dateCreated' | 'isForgiven' | 'actionsTaken'>) => Promise<void>;
  forgiveGrievance: (id: string, resolutionNotes?: string) => Promise<void>;
  addActionTaken: (grievanceId: string, action: string) => Promise<void>;
  addSecretMessage: (message: string) => Promise<void>;
  markMessageAsRead: (id: string) => Promise<void>;
  calculateLoveScore: () => number;
}

// Simulate API URL - replace with your actual backend
const API_URL = 'http://localhost:3000/api';

export const useGrievanceStore = create<GrievanceState>()(
  persist(
    (set, get) => ({
      grievances: [],
      secretMessages: [],
      loveScore: 100,
      
      addGrievance: async (grievanceData) => {
        const newGrievance: Grievance = {
          id: uuidv4(),
          ...grievanceData,
          dateCreated: new Date().toISOString(),
          isForgiven: false,
          actionsTaken: [],
        };
        
        // Save to backend
        try {
          await axios.post(`${API_URL}/grievances`, newGrievance);
          
          // Update local state
          set((state) => ({
            grievances: [newGrievance, ...state.grievances],
            loveScore: Math.max(50, state.loveScore - 5), // Love score drops a little
          }));
        } catch (error) {
          console.error("Failed to submit grievance to backend:", error);
          // Still update local state for offline functionality
          set((state) => ({
            grievances: [newGrievance, ...state.grievances],
            loveScore: Math.max(50, state.loveScore - 5),
          }));
        }
      },
      
      forgiveGrievance: async (id, resolutionNotes) => {
        try {
          await axios.patch(`${API_URL}/grievances/${id}`, { 
            isForgiven: true,
            resolutionNotes
          });
          
          // Update local state
          set((state) => {
            const updatedGrievances = state.grievances.map((g) => 
              g.id === id ? { ...g, isForgiven: true, resolutionNotes } : g
            );
            
            return {
              grievances: updatedGrievances,
              loveScore: Math.min(100, state.loveScore + 10), // Love score improves
            };
          });
        } catch (error) {
          console.error("Failed to update grievance in backend:", error);
          // Still update local state
          set((state) => {
            const updatedGrievances = state.grievances.map((g) => 
              g.id === id ? { ...g, isForgiven: true, resolutionNotes } : g
            );
            
            return {
              grievances: updatedGrievances,
              loveScore: Math.min(100, state.loveScore + 10),
            };
          });
        }
      },
      
      addActionTaken: async (grievanceId, action) => {
        try {
          await axios.post(`${API_URL}/grievances/${grievanceId}/actions`, { action });
          
          // Update local state
          set((state) => ({
            grievances: state.grievances.map((g) => 
              g.id === grievanceId 
                ? { ...g, actionsTaken: [...g.actionsTaken, action] } 
                : g
            ),
            loveScore: Math.min(100, state.loveScore + 2), // Small love score improvement
          }));
        } catch (error) {
          console.error("Failed to add action to grievance:", error);
          // Still update local state
          set((state) => ({
            grievances: state.grievances.map((g) => 
              g.id === grievanceId 
                ? { ...g, actionsTaken: [...g.actionsTaken, action] } 
                : g
            ),
            loveScore: Math.min(100, state.loveScore + 2),
          }));
        }
      },
      
      addSecretMessage: async (message) => {
        const newMessage: SecretMessage = {
          id: uuidv4(),
          message,
          dateCreated: new Date().toISOString(),
          isRead: false,
        };
        
        try {
          await axios.post(`${API_URL}/messages`, newMessage);
          
          // Update local state
          set((state) => ({
            secretMessages: [newMessage, ...state.secretMessages],
          }));
        } catch (error) {
          console.error("Failed to add secret message to backend:", error);
          // Still update local state
          set((state) => ({
            secretMessages: [newMessage, ...state.secretMessages],
          }));
        }
      },
      
      markMessageAsRead: async (id) => {
        try {
          await axios.patch(`${API_URL}/messages/${id}`, { isRead: true });
          
          // Update local state
          set((state) => ({
            secretMessages: state.secretMessages.map((m) => 
              m.id === id ? { ...m, isRead: true } : m
            ),
          }));
        } catch (error) {
          console.error("Failed to mark message as read in backend:", error);
          // Still update local state
          set((state) => ({
            secretMessages: state.secretMessages.map((m) => 
              m.id === id ? { ...m, isRead: true } : m
            ),
          }));
        }
      },
      
      calculateLoveScore: () => {
        const { grievances } = get();
        
        if (grievances.length === 0) return 100;
        
        // Calculate based on forgiveness rate
        const forgivenCount = grievances.filter(g => g.isForgiven).length;
        const forgiveRate = forgivenCount / grievances.length;
        
        // Recent grievances have more impact
        const recentGrievances = grievances
          .slice(0, 5)
          .filter(g => !g.isForgiven).length;
        
        // Base score adjusted by forgiveness rate and recent unforgiven grievances
        const baseScore = 70 + (forgiveRate * 30);
        const finalScore = baseScore - (recentGrievances * 5);
        
        return Math.round(Math.max(50, Math.min(100, finalScore)));
      },
    }),
    {
      name: 'grievance-storage',
    }
  )
);