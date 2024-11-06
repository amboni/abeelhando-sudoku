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


}
