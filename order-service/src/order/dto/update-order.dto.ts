export class UpdateOrderDto {
  readonly article: string;
  readonly quantity: number;
  readonly price: number;
  readonly options: string;
  readonly state: string;
}
