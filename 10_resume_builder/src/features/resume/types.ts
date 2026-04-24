export type ResumeData = {
    personalInfo : {
        name : string,
        email : string,
        phone : string,
    },
    education : {
        id : string,
        school : string,
        degree : string,
        year : string,
    }[],
    experience : {
        id : string,
        company : string,
        role : string,
        duration : string,
    }[],
    projects : {
        id : string,
        title : string,
        description : string,
        technologies : string[],
    }[],
}