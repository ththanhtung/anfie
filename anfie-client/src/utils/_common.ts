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
}
export const _common = new Common();
