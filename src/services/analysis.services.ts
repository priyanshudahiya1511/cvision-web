import axiosInstance from "@/lib/axios";

export const analyzeResumeService = async (resumeId: string) => {
  const response = await axiosInstance.post(`/analysis/analyze/${resumeId}`);
  return response.data;
};

export const getAnalysisService = async (resumeId: string) => {
  const response = await axiosInstance.get(`/analysis/${resumeId}`);
  return response.data;
};
