export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface Character {
  name: string;
  description: string;
}

export interface StoryPage {
  pageNumber: number;
  description: string;
  imageUrl?: string;
}

export interface StoryStructure {
  title: string;
  characters: Character[];
  style: string;
  pages: StoryPage[];
}
