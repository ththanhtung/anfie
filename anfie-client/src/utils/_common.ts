import {v4 as uuidv4} from 'uuid'

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

  numberFromUuid(uuid: string, length: number) {
    const parsedNumber = uuid ? parseInt(uuid.replace(/-/g, ""), 16) : null;

    return parsedNumber?.toString().slice(2, length + 2);
  }

  numberFromfileUrl(url: string) {
    // Extract UUID using regular expression
    const regex = /\/files\/([a-f0-9-]+)\/view/;
    const match = url.match(regex);
    const uuid = match ? match[1] : null;

    if (uuid) {
      return this.numberFromUuid(uuid, 5);
    }
    return "";
  }

  convertUrlsToFiles(files: any, type: "attachment" | "image") {
    if (!files) {
      return [];
    }

    return files?.map((file: any) => {
      const originFileObj = {
        uid: uuidv4(),
        name: file,
        url: file,
      };

      return {
        isNotLocalFile: true,
        originFileObj,
        ...(type === "image"
          ? { thumbUrl: file }
          : { name: ` File name ${this.numberFromfileUrl(file)}` }),
      };
    });
  }
}
export const _common = new Common();
