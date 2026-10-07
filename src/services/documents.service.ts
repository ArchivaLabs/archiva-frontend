import api from "@/lib/api";
import type {
  DocumentDetailDto,
  DocumentDto,
  UploadDocumentPayload,
} from "@/lib/types";

export const documentService = {
  async getDocument(id: number): Promise<DocumentDetailDto> {
    const { data } = await api.get<DocumentDetailDto>(`/api/documents/${id}`);
    return data;
  },

  async retryAnalysis(id: number): Promise<void> {
    await api.post(`/api/documents/${id}/analysis/retry`, {});
  },

  async uploadDocument(payload: UploadDocumentPayload): Promise<DocumentDto> {
    const formData = new FormData();
    formData.append("file", payload.file);

    if (payload.description) {
      formData.append("description", payload.description);
    }

    const { data } = await api.post<DocumentDto>(
      `/api/meetings/${payload.meetingId}/documents`,
      formData
    );
    return data;
  },
};
