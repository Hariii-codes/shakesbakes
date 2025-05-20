export interface Grievance {
  id: string;
  reason: string;
  moodLevel: number;
  whatShouldHaveDone: string;
  dateCreated: string;
  isForgiven: boolean;
  actionsTaken: string[];
  resolutionNotes?: string;
}

export interface SecretMessage {
  id: string;
  message: string;
  dateCreated: string;
  isRead: boolean;
}

export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export interface SuggestedAction {
  id: string;
  text: string;
  forMoodLevel: MoodLevel[];
  icon: string;
}