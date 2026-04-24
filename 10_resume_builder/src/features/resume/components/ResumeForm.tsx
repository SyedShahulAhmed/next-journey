import { ResumeData } from "../types";
import FormSection from "./FormSecton";


type Props = {
  formData: ResumeData;
  setFormData: React.Dispatch<React.SetStateAction<ResumeData>>;
};

export default function ResumeForm({formData, setFormData}: Props) {
  
  const updateArrayItem = <T,>(array: T[], index: number, updatedItem: T) => {
    const newArray = [...array];
    newArray[index] = updatedItem;
    return newArray;
  };
  const addItem = <T,>(array: T[], item: T) => {
    return [...array, item];
  };
  const removeItem = <T extends { id: string }>(array: T[], id: string) => {
    return array.filter((item) => item.id !== id);
  };

  const inputClass = "magic-input mb-3";

  return (
    <div className="mx-auto max-w-none space-y-6 text-(--text-ivory) section-entrance">
      <h2 className="mb-2 font-serif text-3xl font-semibold tracking-wide text-[#d4af37]">
        The Wizard&apos;s Ledger
      </h2>
      <p className="mb-6 text-sm text-[#e8dcc0]">
        Shape each section and watch your magical resume appear in real time.
      </p>

      <div className="mb-10 rounded-xl border border-[#8a6c2f33] bg-[#1a1a1a] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
        <h3 className="mb-4 text-xl font-semibold tracking-wide text-[#d4af37]">Personal Info</h3>

        <input
          className={inputClass}
          placeholder="Name"
          value={formData.personalInfo.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              personalInfo: {
                ...formData.personalInfo,
                name: e.target.value,
              },
            })
          }
        />

        <input
          className={inputClass}
          placeholder="Email"
          value={formData.personalInfo.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              personalInfo: {
                ...formData.personalInfo,
                email: e.target.value,
              },
            })
          }
        />

        <input
          className={inputClass}
          placeholder="Phone"
          value={formData.personalInfo.phone}
          onChange={(e) =>
            setFormData({
              ...formData,
              personalInfo: {
                ...formData.personalInfo,
                phone: e.target.value,
              },
            })
          }
        />
      </div>

      <FormSection
        title="Education"
        items={formData.education}
        onAdd={() =>
          setFormData({
            ...formData,
            education: addItem(formData.education, {
              id: crypto.randomUUID(),
              school: "",
              degree: "",
              year: "",
            }),
          })
        }
        onRemove={(id) =>
          setFormData({
            ...formData,
            education: removeItem(formData.education, id),
          })
        }
        renderFields={(edu, index) => (
          <>
            <input
              className="magic-input mb-3"
              placeholder="School"
              value={edu.school}
              onChange={(e) => {
                const updatedItem = {
                  ...edu,
                  school: e.target.value,
                };

                setFormData({
                  ...formData,
                  education: updateArrayItem(
                    formData.education,
                    index,
                    updatedItem,
                  ),
                });
              }}
            />

            <input
              className="magic-input mb-3"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => {
                const updatedItem = {
                  ...edu,
                  degree: e.target.value,
                };

                setFormData({
                  ...formData,
                  education: updateArrayItem(
                    formData.education,
                    index,
                    updatedItem,
                  ),
                });
              }}
            />
            <input
              className="magic-input mb-3"
              placeholder="Year"
              value={edu.year}
              onChange={(e) => {
                const updatedItem = {
                  ...edu,
                  year: e.target.value,
                };

                setFormData({
                  ...formData,
                  education: updateArrayItem(
                    formData.education,
                    index,
                    updatedItem,
                  ),
                });
              }}
            />
          </>
        )}
      />

      <FormSection
        title="Experience"
        items={formData.experience}
        onAdd={() =>
          setFormData({
            ...formData,
            experience: addItem(formData.experience, {
              id: crypto.randomUUID(),
              company: "",
              role: "",
              duration: "",
            }),
          })
        }
        onRemove={(id) =>
          setFormData({
            ...formData,
            experience: removeItem(formData.experience, id),
          })
        }
        renderFields={(exp, index) => (
          <>
            <input
              className="magic-input mb-3"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => {
                const updatedItem = {
                  ...exp,
                  company: e.target.value,
                };

                setFormData({
                  ...formData,
                  experience: updateArrayItem(
                    formData.experience,
                    index,
                    updatedItem,
                  ),
                });
              }}
            />

            <input
              className="magic-input mb-3"
              placeholder="Role"
              value={exp.role}
              onChange={(e) => {
                const updatedItem = {
                  ...exp,
                  role: e.target.value,
                };

                setFormData({
                  ...formData,
                  experience: updateArrayItem(
                    formData.experience,
                    index,
                    updatedItem,
                  ),
                });
              }}
            />

            <input
              className="magic-input mb-3"
              placeholder="Duration"
              value={exp.duration}
              onChange={(e) => {
                const updatedItem = {
                  ...exp,
                  duration: e.target.value,
                };

                setFormData({
                  ...formData,
                  experience: updateArrayItem(
                    formData.experience,
                    index,
                    updatedItem,
                  ),
                });
              }}
            />
          </>
        )}
      />
      <FormSection
        title="Projects"
        items={formData.projects}
        onAdd={() =>
          setFormData({
            ...formData,
            projects: addItem(formData.projects, {
              id: crypto.randomUUID(),
              title: "",
              description: "",
              technologies: [],
            }),
          })
        }
        onRemove={(id) =>
          setFormData({
            ...formData,
            projects: removeItem(formData.projects, id),
          })
        }
        renderFields={(proj, index) => (
          <>
            <input
              className="magic-input mb-3"
              placeholder="Project Title"
              value={proj.title}
              onChange={(e) => {
                const updatedItem = {
                  ...proj,
                  title: e.target.value,
                };

                setFormData({
                  ...formData,
                  projects: updateArrayItem(
                    formData.projects,
                    index,
                    updatedItem,
                  ),
                });
              }}
            />

            <input
              className="magic-input mb-3"
              placeholder="Description"
              value={proj.description}
              onChange={(e) => {
                const updatedItem = {
                  ...proj,
                  description: e.target.value,
                };

                setFormData({
                  ...formData,
                  projects: updateArrayItem(
                    formData.projects,
                    index,
                    updatedItem,
                  ),
                });
              }}
            />

            <input
              className="magic-input mb-3"
              placeholder="Technologies (comma separated)"
              value={proj.technologies.join(", ")}
              onChange={(e) => {
                const updatedItem = {
                  ...proj,
                  technologies: e.target.value
                    .split(",")
                    .map((tech) => tech.trim())
                    .filter(Boolean),
                };

                setFormData({
                  ...formData,
                  projects: updateArrayItem(
                    formData.projects,
                    index,
                    updatedItem,
                  ),
                });
              }}
            />
          </>
        )}
      />
    </div>
  );
}
