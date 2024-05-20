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
}
export const _common = new Common();
