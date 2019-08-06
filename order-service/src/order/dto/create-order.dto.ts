export class CreateOrderDto {
  readonly article: string;
  readonly quantity: number;
  readonly price: number;
  readonly options: string;
}
