import axios from "axios";

export const login = async (formData) => {
  const reponse = await axios.post(
    import.meta.env.VITE_API + "login",
    formData
  );
  return reponse.data;
};

export const signup = async (formData) => {
  const response = await axios.post(
    import.meta.env.VITE_API + "register",
    formData
  );
  return response.data;
};

export const getStudents = async (queryParams) => {
  const response = await axios.get(import.meta.env.VITE_API + "students", {
    params: queryParams,
    headers: { Authorization: "Bearer " + queryParams.token },
  });
  return response.data;
};

export const getCourses = async (queryParams) => {
  const response = await axios.get(import.meta.env.VITE_API + "courses", {
    params: queryParams,
    headers: { Authorization: "Bearer " + queryParams.token },
  });
  return response.data;
};

export const createCourse = async (formData) => {
  const response = await axios.post(
    import.meta.env.VITE_API + "courses",
    formData,
    {
      headers: {
        Authorization: "Bearer " + formData.token,
      },
    }
  );
  return response;
};

export const getCourseDetail = async (queryParams) => {
  const id = queryParams.id;
  const response = await axios.get(import.meta.env.VITE_API + "courses/" + id, {
    headers: { Authorization: "Bearer " + queryParams.token },
  });
  return response.data;
};

export const createModule = async (formData) => {
  const response = await axios.post(
    import.meta.env.VITE_API + "courses/" + formData.courseId + "/modules",
    formData,
    {
      headers: {
        Authorization: "Bearer " + formData.token,
      },
    }
  );
  return response;
};

export const deleteModule = async (id, token) => {
  const response = await axios.delete(
    import.meta.env.VITE_API + "modules/" + id,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response;
};

export const createLesson = async (formData) => {
  const response = await axios.post(
    import.meta.env.VITE_API + "modules/" + formData.moduleId + "/lessons",
    formData,
    {
      headers: {
        Authorization: "Bearer " + formData.token,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const deleteLesson = async (id, token) => {
  const response = await axios.delete(
    import.meta.env.VITE_API + "lessons/" + id,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response;
};

export const getTests = async (queryParams) => {
  const response = await axios.get(import.meta.env.VITE_API + "tests", {
    params: queryParams,
    headers: { Authorization: "Bearer " + queryParams.token },
  });
  return response.data;
};

export const getTestDetail = async (queryParams) => {
  const id = queryParams.id;
  const response = await axios.get(import.meta.env.VITE_API + "tests/" + id, {
    headers: { Authorization: "Bearer " + queryParams.token },
  });
  return response.data;
};

export const createQuestion = async (formData) => {
  const response = await axios.post(
    import.meta.env.VITE_API + "tests/" + formData.testId + "/questions",
    formData,
    {
      headers: {
        Authorization: "Bearer " + formData.token,
      },
    }
  );
  return response;
};

export const deleteQuestion = async (id, token) => {
  const response = await axios.delete(
    import.meta.env.VITE_API + "questions/" + id,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response;
};

export const createQuestionAnswer = async (formData) => {
  console.log(formData);
  const response = await axios.post(
    import.meta.env.VITE_API +
      "questions/" +
      formData.questionId +
      "/questionAnswers",
    formData,
    {
      headers: {
        Authorization: "Bearer " + formData.token,
      },
    }
  );
  return response;
};
