import { ENDPOINT_APIS, HttpClient } from "./network";

export class NotesServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getListNotes(params: TNoteParams) {
    const { data } = await this.instance.get<TResultResponse<TNote[]>>(
      `${ENDPOINT_APIS.notes.list}`,
      { params }
    );
    return data;
  }

  public async postCreateNote(form: TNoteForm) {
    const { data } = await this.instance.post(
      `${ENDPOINT_APIS.notes.list}`,
      form
    );
    return data;
  }

  public async patchUpdateNote(noteId: string, form: any) {
    const { data } = await this.instance.patch(
      ENDPOINT_APIS.notes.list + "/" + noteId,
      {
        ...form,
      }
    );
    return data;
  }
}

export const notesService = new NotesServiceApis();
