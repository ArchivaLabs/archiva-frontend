import api from "@/lib/api";
import type {
  DocumentDetailDto,
  DocumentDto,
  UploadDocumentPayload,
} from "@/lib/types";

export const documentService = {
  async getDocument(
    id: number,
    signal?: AbortSignal
  ): Promise<DocumentDetailDto> {
    const { data } = await api.get<DocumentDetailDto>(`/api/documents/${id}`, {
      signal,
    });
    return data;
  },

  async downloadContent(id: number, signal: AbortSignal): Promise<ArrayBuffer> {
    const { data } = await api.get<ArrayBuffer>(`/api/documents/${id}/content`, {
      responseType: "arraybuffer",
      signal,
    });
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
