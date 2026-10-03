import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Profile.module.css";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaEdit,
  FaGraduationCap,
  FaCode,
  FaProjectDiagram,
  FaUser,
  FaBriefcase,
  FaTrash
} from "react-icons/fa";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [tempProfile, setTempProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [skillInput, setSkillInput] = useState("");
 const [showSkillsModal, setShowSkillsModal] = useState(false);
 const [showBasicModal, setShowBasicModal] = useState(false);
 const [showEducationModal, setShowEducationModal] = useState(false);
 const [language, setLanguage] = useState("");
const [proficiency, setProficiency] = useState("");
 const [educationForm, setEducationForm] = useState({
  course: "",
  college: "",
  year: ""
});
const [projectForm, setProjectForm] = useState({
  title: "",
  technologies: "",
  description: "",
  duration: "",
  github: "",
  liveDemo: ""
});
const [showProjectModal, setShowProjectModal] =
  useState(false);

const [editingProjectIndex, setEditingProjectIndex] =
  useState(null);
  
const [editingIndex, setEditingIndex] = useState(null);
const [personalEdit, setPersonalEdit] = useState(false);
const [showBioModal,setShowBioModal] = useState(false);
const [bio,setBio] = useState("");
const calculateProgress = ()=>{

let count=0;
let total=9;


if(profile?.name) count++;
if(profile?.mobile) count++;
if(profile?.profile?.location) count++;
if(profile.profile.skills) count++;
 if(profile.profile.experience) count++;
if(profile.profile.educations?.length>0) count++;
if(profile.profile.projects?.length>0) count++;
if(profile.profile.languages?.length>0) count++;
 if(profile.profile.bio) count++;
return Math.round((count/total)*100);

}
useEffect(() => {
  axios.get(`http://localhost:5000/users/${id}`)
    .then(res => {
      setProfile(res.data);
      setTempProfile(res.data);
    })
    .catch(err => console.log(err));
}, [id]);

  // MAIN CHANGE
  const handleChange = (e) => {
    setTempProfile({
      ...tempProfile,
      [e.target.name]: e.target.value,
    });
  };

  // PROFILE CHANGE
  const handleProfileChange = (e) => {
    setTempProfile({
      ...tempProfile,
      profile: {
        ...tempProfile.profile,
        [e.target.name]: e.target.value,
      },
    });
  };

  // SAVE
  const handleSave = async () => {
    try {
      const cleanData = {
        name: tempProfile.name,
        email: tempProfile.email,
        mobile: tempProfile.mobile,
       profile: {
  location: tempProfile?.profile?.location || "",

  educations: tempProfile?.profile?.educations || [],

  projects: tempProfile?.profile?.projects || [],

  experience: tempProfile?.profile?.experience || "",

  skills: tempProfile?.profile?.skills || "",

  bio: tempProfile?.profile?.bio || "",


  dob: tempProfile?.profile?.dob || "",

  gender: tempProfile?.profile?.gender || "",

  currentLocation: tempProfile?.profile?.currentLocation || "",


  languages: tempProfile?.profile?.languages || [],


  linkedinProfile:
    tempProfile?.profile?.linkedin || "",


  githubProfile:
    tempProfile?.profile?.githubProfile || ""
}
      };

      const res = await axios.patch(
        `http://localhost:5000/users/${profile.id}`,
        cleanData
      );

      setProfile(res.data);
      setTempProfile(res.data);
      setEditMode(false);
    } catch (err) {
      console.log("SAVE ERROR:", err.response?.data || err.message);
    }
  };

  if (!profile) return <h2>No User</h2>;

  // SAFE SKILLS PARSER
  const getSkillsArray = (skills) =>
    (skills || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  // ADD SKILL
  const addSkill = () => {
    if (!skillInput.trim()) return;

    const updated = [
      ...new Set([
        ...getSkillsArray(tempProfile?.profile?.skills),
        skillInput.trim(),
      ]),
    ];

    setTempProfile((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        skills: updated.join(","),
      },
    }));

    setSkillInput("");
  };

  // REMOVE SKILL
  const removeSkill = (index) => {
    const updated = getSkillsArray(tempProfile?.profile?.skills)
      .filter((_, i) => i !== index);

    setTempProfile((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        skills: updated.join(","),
      },
    }));
  };
const addEducation = async () => {

  let updatedEducations = [
    ...(tempProfile.profile.educations || [])
  ];

  if (editingIndex !== null) {

    updatedEducations[editingIndex] =
      educationForm;

  } else {

    updatedEducations.push(
      educationForm
    );

  }

  const updatedUser = {
    ...tempProfile,
    profile: {
      ...tempProfile.profile,
      educations: updatedEducations
    }
  };

  try {

    const res = await axios.patch(
      `http://localhost:5000/users/${profile.id}`,
      updatedUser
    );

    setProfile(res.data);
    setTempProfile(res.data);

    setEducationForm({
      course: "",
      college: "",
      year: ""
    });

    setEditingIndex(null);

    setShowEducationModal(false);

  } catch (error) {

    console.log(error);

  }

};
const deleteEducation = async (index) => {

  const updatedEducations =
    profile.profile.educations.filter(
      (_, i) => i !== index
    );

  const updatedProfile = {
    ...profile,
    profile: {
      ...profile.profile,
      educations: updatedEducations
    }
  };

  setProfile(updatedProfile);
  setTempProfile(updatedProfile);

  await axios.patch(
    `http://localhost:5000/users/${profile.id}`,
    updatedProfile
  );
};

const addProject = async () => {

  let updatedProjects = [
    ...(tempProfile.profile.projects || [])
  ];

  if (editingProjectIndex !== null) {

    updatedProjects[editingProjectIndex] =
      projectForm;

  } else {

    updatedProjects.push(projectForm);

  }

  const updatedUser = {
    ...tempProfile,
    profile: {
      ...tempProfile.profile,
      projects: updatedProjects
    }
  };

  const res = await axios.patch(
    `http://localhost:5000/users/${profile.id}`,
    updatedUser
  );

  setProfile(res.data);
  setTempProfile(res.data);

  setProjectForm({
    title: "",
    technologies: "",
    description: "",
    duration: "",
    github: "",
    liveDemo: ""
  });

  setEditingProjectIndex(null);

  setShowProjectModal(false);
};
const deleteProject = async (index) => {

  const updatedProjects =
    profile.profile.projects.filter(
      (_, i) => i !== index
    );

  const updatedUser = {
    ...profile,
    profile: {
      ...profile.profile,
      projects: updatedProjects
    }
  };

  const res = await axios.patch(
    `http://localhost:5000/users/${profile.id}`,
    updatedUser
  );

  setProfile(res.data);
  setTempProfile(res.data);
};
const addLanguage = async()=>{

if(!language || !proficiency) return;


const updatedLanguages=[
...(tempProfile.profile.languages || []),
{
 name:language,
 proficiency:proficiency
}
];


const updatedUser={
...tempProfile,
profile:{
...tempProfile.profile,
languages:updatedLanguages
}
};


const res = await axios.patch(
`http://localhost:5000/users/${profile.id}`,
updatedUser
);


setProfile(res.data);
setTempProfile(res.data);


setLanguage("");
setProficiency("");

}
const deleteLanguage = (index) => {

  setTempProfile(prev => ({
    ...prev,

    profile:{
      ...prev.profile,

      languages:
      prev.profile.languages.filter(
        (_,i)=>i !== index
      )
    }
  }));

};
const saveBio = async()=>{

const updatedUser={
 ...profile,

 profile:{
  ...profile.profile,
  bio:bio
 }
};


const res=await axios.patch(
`http://localhost:5000/users/${profile.id}`,
updatedUser
);


setProfile(res.data);
setTempProfile(res.data);

setShowBioModal(false);

};
  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.headerCard}>
        <div className={styles.avatar}>
          {profile.name?.charAt(0)}
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.nameRow}>
            <h1>Hello, {profile.name}</h1>
            <FaEdit className={styles.editIcon} onClick={()=>{setShowBasicModal(true)}}/>
          </div>
          <p>
            <FaMapMarkerAlt /> 
            {profile.profile.location || "Add Location"}
          </p>


    <p>
      <FaPhone />
      {  profile.mobile || "Add phone"}
    </p>


    <p>
      <FaEnvelope />
      {profile.email}
    </p>


    <p>
      <FaBriefcase />
      {profile.profile.experience || "Add Experience"}
    </p>


  </div>

<div className={styles.progressBox}>

  <div className={styles.progressCircle}>
    <span>{calculateProgress()}%</span>
  </div>

  <p>Profile Completed</p>

</div>
  

</div>
      {/* SKILLS SECTION */}
      <div className={styles.card}>
      <div className={styles.sectionHeader}>
  <h2>
    <FaCode /> Key Skills
  </h2>

  <FaEdit
    className={styles.editIcon}
    onClick={() =>{
   console.log("cliked");
   
    setShowSkillsModal(true)}
    }
  />
</div>

        {/* ADD SKILL INPUT */}
        {editMode && (
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Add skill (React, Java...)"
            />
            <button onClick={addSkill}>Add</button>
          </div>
        )}
        {/* SKILL TAGS */}
<div className={styles.skillsContainer}>

{
getSkillsArray(
 editMode 
 ? tempProfile?.profile?.skills 
 : profile?.profile?.skills
).length > 0 ? (

getSkillsArray(
 editMode 
 ? tempProfile?.profile?.skills 
 : profile?.profile?.skills
).map((skill,index)=>(

<span
key={index}
className={styles.skillChip}
>

{skill}


{editMode && (

<span
className={styles.removeSkill}
onClick={()=>removeSkill(index)}
>
✕
</span>

)}

</span>

))

) : (

<div className={styles.skillEmptyBox}>

<FaCode />

<h3>Add your skills</h3>

<p>
Add technologies you know
</p>


<button
onClick={()=>setShowSkillsModal(true)}
>
+ Add Skill
</button>

</div>

)

}

</div>
</div>
<div className={styles.card}>

  <div className={styles.sectionHeader}>

    <h2>
      <FaGraduationCap /> Education
    </h2>
    {console.log(profile?.profile)}
    
    <button
      className={styles.addBtn}
      onClick={() => {
         setEditingIndex(null);

setEducationForm({
  course: "",
  college: "",
  year: ""
});
        setShowEducationModal(true);
      }}
    >
      + Add Education
    </button>
 
  </div>

 {profile?.profile?.educations?.length > 0 ? (

  profile.profile.educations.map((edu, index) => (

    <div
      key={index}
      className={styles.educationInfo}
    >

      <div>
        <h3>{edu.course}</h3>

        <p>{edu.college}</p>

        <span>{edu.year}</span>
      </div>

      <div className={styles.educationActions}>

  <FaEdit
    className={styles.editIcon}
    onClick={() => {

      setEditingIndex(index);

      setEducationForm({
        course: edu.course,
        college: edu.college,
        year: edu.year
      });

      setShowEducationModal(true);
    }}
  />

  <FaTrash
    className={styles.deleteIcon}
    onClick={() =>
      deleteEducation(index)
    }
  />

</div>

    </div>

  ))

) : (

 <div className={styles.emptyBox}>

<FaGraduationCap />

<h3>Add your education</h3>

<p>
Add your degree, college and passing year
</p>

<button
onClick={()=>{
setShowEducationModal(true)
}}
>
+ Add Education
</button>

</div>

)}
</div>

      {/* PROJECTS */}
     <div className={styles.card}>

  <div className={styles.sectionHeader}>
    <h2>
      <FaProjectDiagram /> Projects
    </h2>

    <button
      className={styles.addBtn}
      onClick={() => {

        setProjectForm({
          title: "",
          technologies: "",
          description: "",
          duration: "",
          github: "",
          liveDemo: ""
        });

        setEditingProjectIndex(null);

        setShowProjectModal(true);
      }}
    >
      + Add Project
    </button>
  </div>

  {profile?.profile?.projects?.length > 0 ? (

    profile.profile.projects.map(
      (project, index) => (

        <div
          key={index}
          className={styles.projectCard}
        >
          <h3>{project.title}</h3>

{project.technologies && (
   <p className={styles.projectMeta}>
      {project.technologies}
    </p>
)}

{project.description && (
     <p className={styles.projectDescription}>
      {project.description}
    </p>

)}

{project.duration && (
  <p className={styles.projectDuration}>
      {project.duration}
    </p>
)}
          <div className={styles.projectLinks}>
 {(project.github || project.liveDemo) && (
  <div className={styles.projectLinks}>

    {project.github && (
      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    )}

    {project.liveDemo && (
      <a
        href={project.liveDemo}
        target="_blank"
        rel="noreferrer"
      >
        Live Demo
      </a>
    )}

  </div>
)}
</div>

<div className={styles.projectActions}>

  <FaEdit
    className={styles.editIcon}
    onClick={() => {

      setEditingProjectIndex(index);

      setProjectForm({
        title: project.title,
        technologies: project.technologies,
        description: project.description,
        duration: project.duration,
        github: project.github,
        liveDemo: project.liveDemo
      });

      setShowProjectModal(true);
    }}
  />

  <FaTrash
    className={styles.deleteIcon}
    onClick={() => deleteProject(index)}
  />

</div>
        </div>
      )
    )

  ) : (

     <div className={`${styles.emptyBox} ${styles.projectEmpty}`}>
  <FaProjectDiagram />

  <h3>
    Add your projects
  </h3>

  <p>
    Showcase your work, technologies and achievements
  </p>


  <button
    onClick={()=>{
      setShowProjectModal(true)
    }}
  >
    + Add Project
  </button>


</div>
  )}

</div>
      {/* PERSONAL DETAILS */}
     {/* PERSONAL DETAILS */}
<div className={styles.card}>

  <div className={styles.titleRow}>
    <h2>
      <FaUser /> Personal Details
    </h2>

    <button
      className={styles.editBtn}
      onClick={() => setPersonalEdit(true)}
    >
      <FaEdit /> Edit
    </button>

  </div>


  <div className={styles.detailsGrid}>

    <p>
      <b>Date of Birth</b>
      <span>
        {profile.profile.dob || "Add date of birth"}
      </span>
    </p>


    <p>
      <b>Gender</b>
      <span>
        {profile.profile.gender || "Add gender"}
      </span>
    </p>


    <p>
      <b>Current Location</b>
      <span>
        {profile.profile.currentLocation || "Add location"}
      </span>
    </p>
    <p>
      <b>LinkedIn</b>
      <span>
        {profile.profile.linkedin || "Add LinkedIn"}
      </span>
    </p>


    <p>
      <b>Github</b>
      <span>
        {profile.profile.githubProfile || "Add Github"}
      </span>
    </p>

<div className={styles.languageSection}>

  <div className={styles.languageHeader}>

    <b>Languages</b>

    <button
      className={styles.addLanguageBtn}
      onClick={()=>setPersonalEdit(true)}
    >
      + Add Languages
    </button>

  </div>


  {
    (profile.profile.languages || []).length > 0 ? (

      profile.profile.languages.map((lang,index)=>(

        <div 
          key={index}
          className={styles.languageItem}
        >

          <span>{lang.name}</span>

          <div className={styles.languageRight}>

            <span className={styles.proficiency}>
              {lang.proficiency}
            </span>


            <button
              className={styles.deleteLangBtn}
             onClick={async()=>{

const updated =
profile.profile.languages.filter(
(_,i)=>i!==index
);


const updatedProfile={
...profile,
profile:{
...profile.profile,
languages:updated
}
};


const res = await axios.patch(
`http://localhost:5000/users/${profile.id}`,
updatedProfile
);


setProfile(res.data);
setTempProfile(res.data);

}}

               
            >
              ✕
            </button>

          </div>

        </div>

      ))

    ) : (

      <p className={styles.emptyLanguage}>
        No languages added
      </p>

    )
  }

</div>
  </div>

</div>
<div className={styles.card}>

<div className={styles.titleRow}>
<h2>
<FaUser /> About Me
</h2>

<FaEdit 
 className={styles.editIcon}
 onClick={()=>{
   setBio(profile.profile.bio || "");
   setShowBioModal(true);
 }}
/>

</div>


{
  profile.profile.bio ? (
    <p className={styles.bioText}>
      {profile.profile.bio}
    </p>
  ) : (
    <div className={styles.emptyBox}>
      <FaUser />
      <h3>Add Bio</h3>
      <p>Tell recruiters about yourself</p>
    </div>
  )
}

</div>
{personalEdit && (

<div className={styles.modalOverlay}>
<div className={styles.modalBox}>

<div className={styles.modalHeader}>

<h2>Edit Personal Details</h2>

<button
  className={styles.closeBtn}
  onClick={()=>{
    setTempProfile(profile);
    setPersonalEdit(false);
  }}
>
  ✕
</button>

</div>


<label>Date of Birth</label>
<input
name="dob"
type="date"
value={tempProfile.profile.dob || ""}
onChange={handleProfileChange}
/>


<select
name="gender"
value={tempProfile.profile.gender || ""}
onChange={handleProfileChange}
>

<option value="">
Select Gender
</option>

<option>
Male
</option>

<option>
Female
</option>

<option>
Other
</option>

</select>



<input
name="currentLocation"
placeholder="Current Location"
value={tempProfile.profile.currentLocation || ""}
onChange={handleProfileChange}
/>


<div className={styles.languageRow}>


<select
value={language}
onChange={(e)=>setLanguage(e.target.value)}
>

<option value="">Language</option>
<option>English</option>
<option>Telugu</option>
<option>Hindi</option>
<option>Tamil</option>

</select>



<select
value={proficiency}
onChange={(e)=>setProficiency(e.target.value)}
>

<option value="">Proficiency</option>
<option>Beginner</option>
<option>Intermediate</option>
<option>Advanced</option>
<option>Fluent</option>

</select>


<button onClick={addLanguage}>
Add
</button>


</div>

<input
name="linkedin"
placeholder="LinkedIn Profile URL"
value={tempProfile.profile.linkedin || "Add Linkedin"}
onChange={handleProfileChange}
/>


<input
name="githubProfile"
placeholder="Github Profile URL"
value={tempProfile.profile.githubProfile || "Add Github"}
onChange={handleProfileChange}
/>

<div className={styles.modalButtons}>


<button
 className={styles.saveBtn}
 onClick={async()=>{

   await handleSave();

   setPersonalEdit(false);

 }}
>
 Save
</button>

<button
 className={styles.cancelBtn}
onClick={()=>{
 setTempProfile(profile);
 setPersonalEdit(false);
}}
>
Cancel
</button>


</div>

</div>
</div>

)}

      {showSkillsModal && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>

      <div className={styles.modalHeader}>
        <h2>Key Skills</h2>

        <button
          className={styles.closeBtn}
          onClick={() => setShowSkillsModal(false)}
        >
          ✕
        </button>
      </div>

      <p className={styles.modalText}>
        Add skills that define your expertise.
      </p>

      <div className={styles.skillsContainer}>
        {getSkillsArray(tempProfile?.profile?.skills).map(
          (skill, index) => (
            <div
              key={index}
              className={styles.skillChip}
            >
              {skill}

              <span
                onClick={() =>
                  removeSkill(index)
                }
              >
                ✕
              </span>
            </div>
          )
        )}
      </div>

      <div className={styles.addSkillRow}>
        <input
          value={skillInput}
          onChange={(e) =>
            setSkillInput(e.target.value)
          }
          placeholder="Add skill"
        />

        <button  className={styles.addSkillBtn} onClick={addSkill}>
          Add
        </button>
      </div>

      <div className={styles.modalFooter}>
        <button
  type="button"
  className={styles.cancelBtn}
  onClick={() => {
    setTempProfile(profile);
    setShowSkillsModal(false);
  }}
>
  Cancel
</button>

<button
  type="button"
  className={styles.saveBtn}
  onClick={() => {
    handleSave();
    setShowSkillsModal(false);
  }}
>
  Save
</button>
      </div>

    </div>
  </div>
)}{showBasicModal && (
  <div className={styles.modalOverlay}>
    <div className={styles.basicModal}>

      <div className={styles.modalHeader}>
        <h2>Basic Details</h2>

        <button
          className={styles.closeBtn}
          onClick={() => setShowBasicModal(false)}
        >
          ✕
        </button>
      </div>

      <div className={styles.formGroup}>
        <label>Full Name</label>

        <input
          type="text"
          name="name"
          value={tempProfile?.name || ""}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={tempProfile?.email || ""}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Mobile Number</label>

         <input
          type="text"
          name="mobile"
          value={tempProfile?.mobile || ""}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Current Location</label>

        <input
          type="text"
          name="location"
          value={tempProfile?.profile?.location || ""}
          onChange={handleProfileChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Work Status</label>

        <select
          name="experience"
          value={tempProfile?.profile?.experience || ""}
          onChange={handleProfileChange}
        >
          <option value="Fresher">Fresher</option>
          <option value="Experienced">
            Experienced
          </option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Availability To Join</label>

        <select>
          <option>Immediate</option>
          <option>15 Days</option>
          <option>1 Month</option>
          <option>2 Months</option>
        </select>
      </div>

      <div className={styles.modalFooter}>
        <button
          className={styles.cancelBtn}
          onClick={() => {
            setTempProfile(profile);
            setShowBasicModal(false);
          }}
        >
          Cancel
        </button>

        <button
          className={styles.saveBtn}
          onClick={() => {
            handleSave();
            setShowBasicModal(false);
          }}
        >
          Save
        </button>
      </div>

    </div>
  </div>
)}
{showEducationModal && (
  <div className={styles.modalOverlay}>
    <div className={styles.educationModal}>

      <div className={styles.modalHeader}>
        <h2>Education</h2>

        <button
          className={styles.closeBtn}
          onClick={() => setShowEducationModal(false)}
        >
          ✕
        </button>
      </div>

      <div className={styles.formGroup}>
        <label>Education</label>

       <select
  value={educationForm.course}
  onChange={(e) =>
    setEducationForm({
      ...educationForm,
      course: e.target.value
    })
  }
>
          <option value="">Select Education</option>
          <option value="MCA">MCA</option>
          <option value="B.Tech">B.Tech</option>
          <option value="B.Sc">B.Sc</option>
          <option value="M.Tech">M.Tech</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>College / University</label>

<input
  type="text"
  placeholder="College"
  value={educationForm.college}
  onChange={(e) =>
    setEducationForm({
      ...educationForm,
      college: e.target.value
    })
  }
/>
      </div>

      <div className={styles.formGroup}>
        <label>Passing Year</label>

       <input
  type="text"
  placeholder="Passing Year"
  value={educationForm.year}
  onChange={(e) =>
    setEducationForm({
      ...educationForm,
      year: e.target.value
    })
  }
/>
      </div>

      <div className={styles.formGroup}>
        <label>Course Type</label>

        <select>
          <option>Full Time</option>
          <option>Part Time</option>
        </select>
      </div>

      <div className={styles.modalFooter}>

        <button
          className={styles.cancelBtn}
          onClick={() => {
            setTempProfile(profile);
            setShowEducationModal(false);
          }}
        >
          Cancel
        </button>

        <button
          className={styles.saveBtn}
         
         onClick={addEducation}
        >
          Save
        </button>

      </div>

    </div>
  </div>
)}
{showProjectModal && (
  <div className={styles.modalOverlay}>
    <div className={styles.educationModal}>

      <div className={styles.modalHeader}>
        <h2>
          {editingProjectIndex !== null
            ? "Edit Project"
            : "Add Project"}
        </h2>

        <button
          className={styles.closeBtn}
          onClick={() =>
            setShowProjectModal(false)
          }
        >
          ✕
        </button>
      </div>

      <div className={styles.formGroup}>
        <label>Project Title</label>

        <input
          type="text"
          value={projectForm.title}
          onChange={(e) =>
            setProjectForm({
              ...projectForm,
              title: e.target.value
            })
          }
        />
      </div>

      <div className={styles.formGroup}>
        <label>Technologies Used</label>
        <input
          type="text"
          value={projectForm.technologies}
          onChange={(e) =>
            setProjectForm({
              ...projectForm,
              technologies: e.target.value
            })
          }
        />
      </div>

      <div className={styles.formGroup}>
        <label>Description</label>

        <textarea
          rows="4"
          value={projectForm.description}
          onChange={(e) =>
            setProjectForm({
              ...projectForm,
              description: e.target.value
            })
          }
        />
      </div>

      <div className={styles.formGroup}>
        <label>Duration</label>

        <input
          type="text"
          placeholder="Jan 2025 - Mar 2025"
          value={projectForm.duration}
          onChange={(e) =>
            setProjectForm({
              ...projectForm,
              duration: e.target.value
            })
          }
        />
      </div>

      <div className={styles.formGroup}>
        <label>GitHub Link</label>

        <input
          type="text"
          value={projectForm.github}
          onChange={(e) =>
            setProjectForm({
              ...projectForm,
              github: e.target.value
            })
          }
        />
      </div>

      <div className={styles.formGroup}>
        <label>Live Demo Link</label>

        <input
          type="text"
          value={projectForm.liveDemo}
          onChange={(e) =>
            setProjectForm({
              ...projectForm,
              liveDemo: e.target.value
            })
          }
        />
      </div>

      <div className={styles.modalFooter}>

        <button
          className={styles.cancelBtn}
          onClick={() =>
            setShowProjectModal(false)
          }
        >
          Cancel
        </button>

        <button
          className={styles.saveBtn}
          onClick={addProject}
        >
          Save
        </button>

      </div>

    </div>
  </div>
)}
{showBioModal && (

<div className={styles.modalOverlay}>

<div className={styles.modalBox}>


<div className={styles.modalHeader}>

<h2>Edit Bio</h2>

<button
className={styles.closeBtn}
onClick={()=>setShowBioModal(false)}
>
✕
</button>

</div>


<textarea

rows="5"

value={bio}

onChange={(e)=>setBio(e.target.value)}

placeholder="Write about yourself..."

/>



<div className={styles.modalButtons}>


<button
className={styles.cancelBtn}
onClick={()=>setShowBioModal(false)}
>
Cancel
</button>


<button
className={styles.saveBtn}
onClick={saveBio}
>
Save
</button>


</div>


</div>

</div>

)}
    </div>
  );
};

export default Profile;