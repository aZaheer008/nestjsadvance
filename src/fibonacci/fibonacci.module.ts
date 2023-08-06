import { Module } from '@nestjs/common';
import { FibonacciController } from './fibonacci.controller';
// import { FibonacciWorkerHost } from './fibonacci-worker.host';

@Module({
  controllers: [FibonacciController],
  providers: []
})
export class FibonacciModule {}
