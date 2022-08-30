export default class FieldObject {
  constructor(
    public value: any,
    public name: string,
    public onBlur: () => void,
    public onChange: (param: any) => void,
    public ref: () => void
  ) {}
}
