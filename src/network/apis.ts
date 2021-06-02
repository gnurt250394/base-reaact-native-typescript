import request from "./request";

export default {
  path: {
    auth: {
      login: "auth/login",
      register: "auth/register",
      logout: "auth/logout",
    },
    medicalRecord: {
      detail: "medical-record/detail",
      listUser: "medical-record/list-user",
    },
    jobs: {
      listJob: "jobs/get-all-job",
      deleteJob: "jobs/delete-job",
    },
  },
  ...request,
};
