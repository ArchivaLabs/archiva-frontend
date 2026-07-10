import api from "@/lib/api";
import type { DocumentDto, UploadDocumentPayload } from "@/lib/types";

export const documentService = {
  async uploadDocument(payload: UploadDocumentPayload): Promise<DocumentDto> {
    const formData = new FormData();
    formData.append("file", payload.file);

    if (payload.description) {
      formData.append("description", payload.description);
    }

    const { data } = await api.post<DocumentDto>(
      `/api/meetings/${payload.meetingId}/documents`,
      formData,
      {
        headers: {
          "Content-Type": undefined,
        },
      }
    );
    return data;
  },
};
