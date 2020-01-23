import { BehaviorSubject } from "rxjs";

export class Action<T> {

    private _subject: BehaviorSubject<T> = new BehaviorSubject<T>(undefined);

    get state() {
        return this._subject.getValue();
    }

    set state(val: T) {
        this._subject.next(val);
    }
    
    get subject() {
        return this._subject;
    }
}