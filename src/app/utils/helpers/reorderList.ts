export const reorderList = <T,>(list: T[], fromIndex: number, toIndex: number): T[] => {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return list;
    if (fromIndex >= list.length || toIndex >= list.length) return list;

    const next = [...list];
    const [item] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, item);
    return next;
};
