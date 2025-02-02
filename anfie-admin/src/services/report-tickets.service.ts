import { ENDPOINT_APIS, HttpClient } from "./network";

export class ReportTicketServiceApis extends HttpClient {
  constructor() {
    super();
  }

  public async getListReportTickets(params: TGetReportTicketsParams) {
    const { data } = await this.instance.get<
      TResultResponse<TGetReportTicketsAdminResponse[]>
    >(ENDPOINT_APIS.reportTicket.admin.list, { params });
    return data;
  }

  public async getDetailsReportTicket(id: string) {
    const { data } = await this.instance.get<
      TResultResponse<TGetReportTicketsAdminResponse>
    >(`${ENDPOINT_APIS.reportTicket.admin.list}/${id}`);
    return data;
  }

  public patchAcceptReportTicket(id: string) {
    return this.instance.patch(
      `${ENDPOINT_APIS.reportTicket.admin.list}/${id}/accept`
    );
  }

  public patchRejectReportTicket(id: string) {
    return this.instance.patch(
      `${ENDPOINT_APIS.reportTicket.admin.list}/${id}/reject`
    );
  }
}

export const reportTicketService = new ReportTicketServiceApis();
