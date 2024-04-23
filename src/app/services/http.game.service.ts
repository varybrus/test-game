import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IGameData } from '../models/igame-data';

@Injectable({
    providedIn: 'root'
})
export class HttpGameService {
    public updateGame(data: IGameData) {
        console.log("save data");
    }


    public getData(): Observable<IGameData[]> {
        for (let index = 5; index < 100; index++) {
            this.data.push({ id: index, name: "game" + index, date: "10/10/2027", status: "available", location: "NY", imgUrl: "game.jpeg", gameOfficials: "Name1", fee: 10 },);

        }
        return of(this.data).pipe(delay(1000));
    }

    private data: IGameData[] = [
        { id: 1, name: "game1", date: "10/10/2027", status: "available", location: "NY", imgUrl: "game.jpeg", gameOfficials: "Name1", fee: 10 },
        { id: 2, name: "game2", date: "10/11/1998", status: "schedule", location: "London", imgUrl: "game3.jpeg", gameOfficials: "Name1", fee: 10 },
        { id: 3, name: "game3", date: "10/10/2027", status: "available", location: "NY", imgUrl: "game.jpeg", gameOfficials: "Name1", fee: 10 },
        { id: 4, name: "game4", date: "10/11/1998", status: "schedule", location: "London", imgUrl: "game3.jpeg", gameOfficials: "Name1", fee: 10 },
    ];
}