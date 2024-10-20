class Common {
  removeEmptyProperties = (
    obj: ArrayLike<unknown> | { [s: string]: unknown }
  ) => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([_, v]) => v != null && v !== undefined && v !== ""
      )
    );
  };

  getUserFullName = (user: { firstName: string; lastName: string }) => {
    if (!user) {
      return "";
    }
    return `${user.firstName} ${user.lastName}`;
  };

  findLabels(valueOrLabel: string, options: TOption[]): string[] {
    const labels: string[] = [];

    for (const option of options) {
      if (option.value === valueOrLabel || option.label === valueOrLabel) {
        labels.push(option.label);
      }
    }

    return labels;
  }

  sortNotes(notes: TNote[]): TNote[] {
    return notes.sort((a, b) => {
      // Ưu tiên ghi chú ghim (ispin: true) lên trên
      if (a.isPin !== b.isPin) {
        return a.isPin ? -1 : 1;
      }
      // Nếu cùng trạng thái, so sánh theo ngày
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateA.getTime() - dateB.getTime();
    });
  }
}
export const _common = new Common();
