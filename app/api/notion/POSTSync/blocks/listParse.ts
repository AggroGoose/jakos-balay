import { UnparsedListItem, ItemDict } from "@/lib/blog";

export function ListParse(list: Array<UnparsedListItem>) {
  let groupLevel: number = 1;
  const groupObject: ItemDict = {};
  list.forEach((item, i) => {
    if (i > 0) {
      const prevInd = i - 1;
      const incrementCheck = item.index - list[prevInd].index;
      if (incrementCheck === 1) {
        if (groupObject[groupLevel]) {
          groupObject[groupLevel].push(item);
        } else {
          groupObject[groupLevel] = [item];
        }
      } else if (incrementCheck > 1) {
        groupLevel++;
        groupObject[groupLevel] = [item];
      }
    } else if (i === 0) {
      groupObject[groupLevel] = [item];
    }
  });

  return groupObject;
}
