import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CircuitBreaker } from './circuit-breaker';

@Injectable()
export class CircuitBreakerInterceptor implements NestInterceptor {
  private readonly circuitBreakerByHandler = new WeakMap<
    //eslint-disable-next-line @typescript-eslint/ban-types
    Function,
    CircuitBreaker
  >();
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const methodRef = context.getHandler();
    console.log("*****methodRef***** : ",methodRef);
    let circuitBreaker: CircuitBreaker;
    console.log("*****this.circuitBreakerByHandler***** : ",this.circuitBreakerByHandler);
    if (this.circuitBreakerByHandler.has(methodRef)) {
      circuitBreaker = this.circuitBreakerByHandler.get(methodRef);
    } else {
      circuitBreaker = new CircuitBreaker();
      this.circuitBreakerByHandler.set(methodRef, circuitBreaker);
    }
    console.log("*****next***** : ",next);
    return circuitBreaker.exec(next);
  }
}
