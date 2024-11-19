import { Cell } from "./cell";

export class Key {
    

    value = "";
    disabled = false;
    
    public static resetAllKeys(keys: Key[]) {
        for (let k of keys) {
            k.disabled = false;
        }
    }

    static disableKey(c: Cell, keys: Key[]) {
        let obj = keys.find(e => e.value == c.value);
        if (obj) obj.disabled = true;
    }

    static contains(c: Cell, keys: Key[]): boolean {
        let index = keys.findIndex(e => e.value == c.value);
        return (index != -1);
    }



    static removeKeyFromCell(c: Cell, keys: Key[]) {
        let index = keys.findIndex(e => e.value == c.value);
        if (index != -1) {
            keys.splice( index, 1 );				
        }        
    }    


}
