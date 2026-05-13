import axiosInstance from "@/lib/axios";

export const uploadResumeService = async (file: File) => {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await axiosInstance.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getResumeHistoryService = async () => {
  const response = await axiosInstance.get("/resume/history");
  return response.data;
};

export const getResumeByIdService = async (id: string) => {
  const response = await axiosInstance.get(`/resume/${id}`);
  return response.data;
};
