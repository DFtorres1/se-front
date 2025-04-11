import { useMutation } from "@tanstack/react-query";
import api from "src/shared/utils/api";

export interface EvaluateFormInputs {
  faceType: string;
  skinTone: string;
  hairLength: string;
}

export interface EvaluationResponse {
  recommendation: string;
}

const postEvaluation = async (
  data: EvaluateFormInputs
): Promise<EvaluationResponse> => {
  const response = await api.post<EvaluationResponse>(
    "/style-expert/evaluate",
    data
  );
  return response.data;
};

const useEvaluateExpert = () => {
  return useMutation<EvaluationResponse, unknown, EvaluateFormInputs>({
    mutationFn: postEvaluation,
  });
};

export default useEvaluateExpert;
