export type TJobITem = {
  badgeLetters: string;
  company: string;
  daysAgo: number;
  title: string;
  relevanceScore: number;
  id: number;
};

export type TJobItemExtended = TJobITem & {
  companyURL: string;
  coverImgURL: string;
  description: string;
  duration: string;
  location: string;
  qualifications: string[];
  reviews: string[];
  salary: string;
};
