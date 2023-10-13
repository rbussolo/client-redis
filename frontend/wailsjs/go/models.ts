export namespace main {
	
	export class KeyValue {
	    key: string;
	    value: string;
	    expireAt: string;
	
	    static createFrom(source: any = {}) {
	        return new KeyValue(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.key = source["key"];
	        this.value = source["value"];
	        this.expireAt = source["expireAt"];
	    }
	}

}

