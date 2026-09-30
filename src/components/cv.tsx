function CV() {

  const cvdocument = {
    name: "Hans Petersson",
    titleTags: ["Creative Technologist", "UX/UI Designer", "Web Developer"],
    contentBlocks: {
      profile:
        "Pragmatic problem-solver with broad experience in creative communication, web development and graphic design. Combines technical expertise with a strong aesthetic sensibility. Driven by creating value and the challenge of making complex things simple and understood.",
      experience: [
        {
          date: "2012-2025",
          title: "Designer, developer, illustrator",
          company: "BehavioSec",
          description:
            "Designer, developer, illustrator and various design agency oriented jobs in tech-startup – BehavioSec, Stockholm",
        },
        {
          date: "2006-2009",
          title: "Creative Director & Developer",
          company: "Favör Reklambyrå",
          description: "Creative Director & Developer – Favör Reklambyrå, Luleå",
        },
        {
          date: "2002-2004",
          title: "Project Developer",
          company: "MRM Konsult AB",
          description:
            "Built the company website and developed a web-based system for radon measurement management.",
        },
      ],
      education: [
        {
          date: "2011",
          title: "Swedish Scholastic Aptitude Test (Högskoleprovet)",
          company: "UHR Universitets och högskolerådet",
          description: "Score 2.0 / 2.0     ",
        },
        {
          date: "2002-2007",
          title: "Various courses",
          company: "Luleå University of Technology",
          description:
            "English A/B/C, Gender Studies, Introduction to Law, Rhetoric, Spanish, Chinese.",
        },
        {
          date: "1995-1997",
          title: "Fine Arts Programme",
          company: "Sunderby Folkhögskola",
          description: "2 years fine arts programme.",
        },

        {
          date: "1994-1995",
          title: "Art History",
          company: "Uppsala University",
          description: "2 semesters",
        },
        {
          date: "1993-1994",
          title: "MSc Electrical Engineering",
          company: "Luleå University of Technology",
          description: "Engineering programme.",
        },
        {
          date: "1990-1993",
          title: "Upper Secondary School Certificate",
          company: "Midskogskolan, Luleå",
          description: "Natural Science Programme.",
        },
      ],
      skills: [
        "Graphic design",
        "Logo & brand identity",
        "Illustration & infographics",
        "UX/UI",
        "Front-end development",
        "Systems architecture",
        "Services integration",
        "Trade shows booths",
      ],
      software_development: [
        "TypeScript/JavaScript",
        "Swift/Objective C",
        "Kotlin/Java",
        "shadcn/Tailwind/CSS",
        "PHP/WordPress",
        "C++",
        "Lua",
        "C",
        "Perl",
        "Go",
        "Rust",
        "Python",
        "Ruby",
      ],
      devops: [
        "Docker",
        "Vite",
        "AWS",
        "Bash/shell",
        "Gradle",
        "Jenkins",
        "Git",
        "Grunt",
        "Gulp",
        "npm",
        "pip",
        "node.js",
      ],
    },
  };

  return (
    <div className="cv">
      <h1>{cvdocument.name}</h1>
      <ul className="title-tags">
        {cvdocument.titleTags.map((skill,index) => (
          <li key={index} className="shadow-lg dark:outline-white/10 react-draggable react-draggable-dragged">
            {skill}
          </li>
        ))}
      </ul>
      <h2>Profile</h2>
      <div className="profile-text">{cvdocument.contentBlocks.profile}</div>
      <h2>Experience</h2>
      {cvdocument.contentBlocks.experience.map((exp) => (
        <div className="experience" key={exp.date}>
          <div className="duration">{exp.date}</div>
          <div className="company">{exp.company}</div>
          <div className="title">{exp.title}</div>
          <div className="description">{exp.description}</div>
        </div>
      ))}
      <h2>Education</h2>
      {cvdocument.contentBlocks.education.map((education) => (
        <div className="education" key={education.date}>
          <div className="duration">{education.date}</div>
          <div className="company">{education.company}</div>
          <div className="title">{education.title}</div>
          <div className="description"> {education.description}</div>
        </div>
      ))}
      <h2>Skills</h2>
      <ul className="skills">
        {cvdocument.contentBlocks.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <h2>Software Development</h2>
      <ul className="skills">
        {cvdocument.contentBlocks.software_development.map((skill,index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <h2>DevOps</h2>
      <ul className="skills">
        {cvdocument.contentBlocks.devops.map((skill,index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

export default CV;
