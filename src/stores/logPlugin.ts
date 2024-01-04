/**
 * 紀錄新舊值異動
 * @param {object}
 * @param {object} store pinia物件
 */
export default function logPlugin({ store }: any): void {
  store.$subscribe((mutation: any) => {
    console.log(mutation.type, mutation.storeId, mutation.events.newValue);
  });
}
