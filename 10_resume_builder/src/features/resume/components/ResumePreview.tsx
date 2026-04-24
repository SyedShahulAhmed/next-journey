import { ResumeData } from "../types";

type Props = {
  data: ResumeData;
};

function DefaultPreview() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-wide text-[#2f2314] sm:text-4xl">
          Aurelius Nightwind
        </h1>
        <p className="mt-2 text-sm text-[#4d3a20] sm:text-base">owlpost@hogwarts.edu</p>
        <p className="text-sm text-[#4d3a20] sm:text-base">+44 1234 567890</p>
      </header>

      <hr className="my-5 border-[#8a6c2f66]" />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#2f2314]">Education</h2>
        <div className="rounded-xl border border-[#8a6c2f33] bg-[#f0e0c4] p-4">
          <p className="text-lg font-semibold text-[#2f2314]">✨ Magical Education</p>
          <p className="mt-2 text-[#46331a]">Hogwarts School of Witchcraft and Wizardry</p>
          <p className="text-[#46331a]">Advanced Studies in Defense Against the Dark Arts</p>
          <p className="text-sm text-[#5d4626]">Year of Completion: 2024</p>
        </div>
      </section>

      <section className="space-y-4 border-t border-[#8a6c2f59] pt-5">
        <h2 className="text-2xl font-semibold text-[#2f2314]">Experience</h2>
        <div className="rounded-xl border border-[#8a6c2f33] bg-[#f0e0c4] p-4">
          <p className="text-lg font-semibold text-[#2f2314]">✨ Experience</p>
          <p className="mt-2 text-[#46331a]">Auror Intern — Ministry of Magic</p>
          <p className="text-[#46331a]">Assisted in magical investigations and dark artifact containment</p>
          <p className="text-sm text-[#5d4626]">Duration: 3 Months</p>
        </div>
      </section>

      <section className="space-y-4 border-t border-[#8a6c2f59] pt-5">
        <h2 className="text-2xl font-semibold text-[#2f2314]">Projects</h2>
        <div className="rounded-xl border border-[#8a6c2f33] bg-[#f0e0c4] p-4">
          <p className="text-lg font-semibold text-[#2f2314]">✨ Projects</p>
          <p className="mt-2 text-[#46331a]">Enchanted Spell Tracker</p>
          <p className="text-[#46331a]">A magical system to track spell usage and efficiency</p>
          <p className="text-sm text-[#5d4626]">Technologies: React, Node.js, Magic API</p>
        </div>
      </section>
    </section>
  );
}

function ActualResume({ data }: Props) {
  const hasContact = Boolean(
    data.personalInfo.name || data.personalInfo.email || data.personalInfo.phone,
  );

  return (
    <section className="space-y-6">
      {hasContact && (
        <header>
          {data.personalInfo.name && (
            <h1 className="text-3xl font-semibold tracking-wide text-[#2f2314] sm:text-4xl">
              {data.personalInfo.name}
            </h1>
          )}
          {data.personalInfo.email && (
            <p className="mt-2 text-sm text-[#4d3a20] sm:text-base">{data.personalInfo.email}</p>
          )}
          {data.personalInfo.phone && (
            <p className="text-sm text-[#4d3a20] sm:text-base">{data.personalInfo.phone}</p>
          )}
        </header>
      )}

      {(hasContact ||
        data.education.length > 0 ||
        data.experience.length > 0 ||
        data.projects.length > 0) && <hr className="my-5 border-[#8a6c2f66]" />}

      {data.education.length > 0 && (
        <section className="mb-10 space-y-4">
          <h2 className="text-2xl font-semibold text-[#2f2314]">Education</h2>
          {data.education.map((edu) => (
            <div
              key={edu.id}
              className="mt-3 rounded-xl border border-[#8a6c2f33] bg-[#f0e0c4] p-3"
            >
              {edu.school && <p className="text-lg font-medium text-[#2f2314]">{edu.school}</p>}
              {edu.degree && <p className="text-[#46331a]">{edu.degree}</p>}
              {edu.year && <p className="text-sm text-[#5d4626]">{edu.year}</p>}
            </div>
          ))}
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-10 space-y-4 border-t border-[#8a6c2f59] pt-5">
          <h2 className="text-2xl font-semibold text-[#2f2314]">Experience</h2>
          {data.experience.map((exp) => (
            <div
              key={exp.id}
              className="mt-3 rounded-xl border border-[#8a6c2f33] bg-[#f0e0c4] p-3"
            >
              {exp.company && <p className="text-lg font-medium text-[#2f2314]">{exp.company}</p>}
              {exp.role && <p className="text-[#46331a]">{exp.role}</p>}
              {exp.duration && <p className="text-sm text-[#5d4626]">{exp.duration}</p>}
            </div>
          ))}
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="space-y-4 border-t border-[#8a6c2f59] pt-5">
          <h2 className="text-2xl font-semibold text-[#2f2314]">Projects</h2>
          {data.projects.map((project) => (
            <div
              key={project.id}
              className="mt-3 rounded-xl border border-[#8a6c2f33] bg-[#f0e0c4] p-3"
            >
              {project.title && <p className="text-lg font-medium text-[#2f2314]">{project.title}</p>}
              {project.description && <p className="mt-1 text-[#46331a]">{project.description}</p>}
              {project.technologies.length > 0 && (
                <p className="mt-1 text-sm text-[#5d4626]">{project.technologies.join(", ")}</p>
              )}
            </div>
          ))}
        </section>
      )}
    </section>
  );
}

export default function ResumePreview({ data }: Props) {
  const isFormEmpty =
    !data.personalInfo.name &&
    !data.personalInfo.email &&
    !data.personalInfo.phone &&
    data.education.length === 0 &&
    data.experience.length === 0 &&
    data.projects.length === 0;

  return (
    <div
      id="resume-preview"
      className="parchment min-h-[75vh] rounded-xl border border-[#e0cfa8] bg-[#f5e6c8] p-8 shadow-inner transition duration-300 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
    >
      <div className="transition-opacity duration-300">
        {isFormEmpty ? <DefaultPreview /> : <ActualResume data={data} />}
      </div>
    </div>
  );
}