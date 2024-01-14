export type TJobITems = {
  badgeLetters: string;
  company: string;
  daysAgo: number;
  title: string;
  relevanceScore: number;
  id: number;
};

export type TJobItemExtended = TJobITems & {
  companyURL: string;
  coverImgURL: string;
  description: string;
  duration: string;
  location: string;
  qualifications: string[];
  reviews: string[];
  salary: string;
};

export type TReactNode = {
  children: React.ReactNode;
};
