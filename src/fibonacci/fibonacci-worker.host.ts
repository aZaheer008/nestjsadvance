import { Injectable,OnApplicationShutdown , OnApplicationBootstrap } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { join } from 'path';
import { Observable, fromEvent,firstValueFrom,map,filter } from 'rxjs';
import { Worker } from 'worker_threads';

@Injectable()
export class FibonacciWorkerHost implements OnApplicationBootstrap, OnApplicationShutdown {
    private worker : Worker;
    private message$ : Observable<{ id : string; result: number}>;

    onApplicationBootstrap() {
        this.worker = new Worker(join(__dirname, 'fibonacci.woker'));
        this.message$ = fromEvent(this.worker, 'message') as Observable<{
            id : string;
            result : number;
        }>
    }

    async onApplicationShutdown() {
        this.worker.terminate(); 
    }
    run(n: number){
        const uniqueId = randomUUID();
        this.worker.postMessage({ n, id : uniqueId});
        return firstValueFrom(
            //conert our observable to a Promise
            this.message$.pipe(
                filter(({ id }) => id === uniqueId), //filter out messages by IDS
                map(({ result }) => result),// pluck result value
            )
        );
    }
}