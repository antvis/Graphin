/**
 * @description 找到当前元素的 data-key,如果没有，查找对应的孩子节点，直到找到为止
 * @param {HTMLElement} element
 * @param {string} key
 */
export const getElementKey = (element: HTMLElement, key: string): string | null => {
  var find = element.getAttribute('data-key');
  if (find) {
    return find;
  }
  var parentElement = element.parentElement;
  if (parentElement) {
    return getElementKey(parentElement, key);
  }
  return null;
};
