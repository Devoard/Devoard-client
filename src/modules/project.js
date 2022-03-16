const JOIN_PROJECT = "project/JOIN_PROJECT";
const MAKED_PROJECT = "project/MAKED_PROJECT";
const APPLY_PROJECT = "project/APPLY_PROJECT";

const initialState = {
  projectList: [
    {
      isRecruiting: true,
      title: "프로젝트명1",
      isLike: false,
      tags: [
        "React",
        "Django",
        "Typescript",
        "AndroidAndroidAndroidAndroidAndroid",
      ],
      description:
        "프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1프로젝트 설명1",
    },
    {
      isRecruiting: true,
      title: "프로젝트명2",
      isLike: true,
      tags: ["React", "Django"],
      description: "프로젝트 설명2",
    },
    {
      isRecruiting: false,
      title: "프로젝트명3",
      isLike: false,
      tags: ["React", "Django"],
      description: "프로젝트 설명3",
    },
    {
      isRecruiting: true,
      title: "프로젝트명4",
      isLike: true,
      tags: ["React", "Django"],
      description: "프로젝트 설명4",
    },
    {
      isRecruiting: false,
      title: "프로젝트명5",
      isLike: false,
      tags: ["React", "Django"],
      description: "프로젝트 설명5",
    },
    {
      isRecruiting: true,
      title: "프로젝트명6",
      isLike: false,
      tags: ["React", "Django"],
      description: "프로젝트 설명6",
    },
    {
      isRecruiting: true,
      title: "프로젝트명7",
      isLike: false,
      tags: ["React", "Django"],
      description: "프로젝트 설명7",
    },
    {
      isRecruiting: false,
      title: "프로젝트명8",
      isLike: true,
      tags: ["React", "Django"],
      description: "프로젝트 설명8d",
    },
  ],

  //   project_list: [],
};

export default function projectReducer(state = initialState, action) {
  switch (action.type) {
    case JOIN_PROJECT:
      return { ...state, projectList: action.payload };
    case MAKED_PROJECT:
      return { ...state, projectList: action.payload };
    case APPLY_PROJECT:
      return { ...state, projectList: action.payload };
    default:
      return state;
  }
}
