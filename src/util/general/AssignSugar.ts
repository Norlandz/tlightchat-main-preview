export class AssignSugar {
  public static assertNotNull<T>(value: T | null | undefined, msg?: string): T {
    if (value == null) throw new TypeError(msg);
    return value;
  }
}
