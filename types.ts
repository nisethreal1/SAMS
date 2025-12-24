
export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  type: 'title' | 'content' | 'split' | 'workflow' | 'grid' | 'table';
  content: any;
  icon?: string;
}

export interface SpeakerNotes {
  slideId: number;
  text: string;
}
