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
}
export const _common = new Common();