import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiModelProperty()
  readonly article: string;

  @ApiModelProperty()
  readonly quantity: number;

  @ApiModelProperty()
  readonly price: number;

  @ApiModelProperty()
  readonly options: string;

  @ApiModelProperty()
  readonly state: string;
}
