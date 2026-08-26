
export interface StoryFragment {
  id: string;
  text: string;
  culture: string;
  theme: string;
  language: string;
}

export const FIRE_STORIES: StoryFragment[] = [
  { id: '1', text: "The stars are the campfires of the ancestors.", culture: "Indigenous", theme: "Origins", language: "English" },
  { id: '2', text: "Before the great flood, the trees could speak.", culture: "Mesoamerican", theme: "Origins", language: "English" },
  { id: '3', text: "The first fire was stolen from the mountain's heart.", culture: "Polynesian", theme: "Origins", language: "English" },
  { id: '4', text: "Listen to the wind, for it carries the voices of the lost.", culture: "Celtic", theme: "Nature", language: "English" },
  { id: '5', text: "The river remembers every stone it has ever touched.", culture: "African", theme: "Nature", language: "English" },
  { id: '6', text: "A story is a seed that grows in the silence between breaths.", culture: "Central Asian", theme: "Wisdom", language: "English" },
  { id: '7', text: "Wisdom is not found in books, but in the heat of the hearth.", culture: "Nordic", theme: "Wisdom", language: "English" },
];
