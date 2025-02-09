import { ENDPOINT_APIS, HttpClient } from "./network";

export class ReportTicketServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async postCreateReportTickets(form: TPostCreateReportTicketParams) {
    const { data } = await this.instance.post<TResultResponse<{}>>(
      ENDPOINT_APIS.reportTicket.list,
      form
    );
    return data;
  }
}

export const reportTicketService = new ReportTicketServiceApis();
