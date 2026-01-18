import { Controller, Post } from '@nestjs/common';
import { PipelineService } from './pipeline.service';

@Controller('pipeline')
export class PipelineController {
  constructor(private readonly pipelineService: PipelineService) {}

  @Post('run')
  async run(): Promise<void> {
    await this.pipelineService.run();
  }
}
