export interface Job {
  _id?: string;

  title: string;

  company: string;

  location?: string;

  salary?: string;

  status: "Applied" | "Interview" | "Offer" | "Rejected" | "Ghosted" | "Saved";

  type: "Full-time" | "Part-time" | "Internship" | "Contract" | "Remote";

  jobLink?: string;

  notes?: string;

  interviewDate?: Date;

  userId: string;

  createdAt?: Date;

  updatedAt?: Date;
}
