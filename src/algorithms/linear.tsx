export default {
  getPosition(value:number, min:number, max:number):number {
    return ((value - min) / (max - min)) * 100;
  },

  getValue(pos:number, min:number, max:number):number {
    const decimal = pos / 100;

    if (pos === 0) {
      return min;
    } if (pos === 100) {
      return max;
    }

    return Math.round(((max - min) * decimal) + min);
  },
};
