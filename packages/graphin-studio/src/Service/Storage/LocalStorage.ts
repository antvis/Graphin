export const getType = <T>(value: T) => {
    return Object.prototype.toString.call(value);
};
export const mapToJson = <T>(map: Map<T, T>) => {
    return JSON.stringify([...map]);
};
export const jsonToMap = (jsonStr: string) => {
    return new Map(JSON.parse(jsonStr));
};
class LocalStorage {
    namespace: string;

    storage: Storage;

    innerValueType: string;

    constructor(namespace: string) {
        this.namespace = namespace; // 比如ILINK，后续功能加上
        this.storage = window.localStorage;
        this.innerValueType = `${this.namespace}_inner_value_type`;
    }

    setVersion = (version?: string) => {
        if (this.get('version') !== version) {
            // version 为undefined 则表明第一次或者是清空缓存后的情况
            // version 为0.1.x 则表明是上一次缓存策略，不与现在符合也得清除
            this.clear();
            this.set('version', version);
        }
    };

    getNamespaceKey = (key: string) => {
        return `${this.namespace}_${key}`;
    };

    get = (key: string) => {
        const namespaceKey = this.getNamespaceKey(key);
        if (this.storage.getItem(namespaceKey)) {
            return this.toJson(this.storage.getItem(namespaceKey), namespaceKey);
        }
        return undefined;
    };

    set = <T>(key: string, value: T) => {
        const namespaceKey = this.getNamespaceKey(key);
        this.setInnerType(namespaceKey, value);
        this.storage.setItem(namespaceKey, this.toString(value));
    };

    remove = (key: string) => {
        const namespaceKey = this.getNamespaceKey(key);
        this.storage.removeItem(namespaceKey);
    };

    clear = () => {
        this.storage.clear();
    };

    setInnerType = <T>(key: string, value: T) => {
        const types = this.getInnerType();
        const newTypes = {
            ...types,
            [key]: getType(value),
        };
        this.storage.setItem(this.innerValueType, JSON.stringify(newTypes));
    };

    getInnerType = (key?: string) => {
        const typesJSON = this.storage.getItem(this.innerValueType) || '{}';
        const types = JSON.parse(typesJSON);
        if (key) {
            return types[key];
        }
        return types;
    };

    toJson = (value: string, key: string) => {
        const type = this.getInnerType(key);
        if (type === '[object Map]') {
            // 这里存在的问题是：已经序列化的值如何判断出是Map类型
            return jsonToMap(value);
        }
        return JSON.parse(value);
    };
    // eslint-disable-next-line
    toString = (value: any) => {
        if (getType(value) === '[object Map]') {
            return mapToJson(value);
        }
        return JSON.stringify(value);
    };
}

export default LocalStorage;
