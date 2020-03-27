import randomName from 'chinese-random-name';
import { province, nodePropertiesSchema } from './Mock/nodePropertiesSchema';
import { NodeData } from '../types';

interface Property {
    code: string;
    name: string;
    value: string;
}

interface SchemaProperty {
    code: string;
    name: string;
    dataType: string;
    desc: string;
    enumValueSchemaMap: object | null;
}

const nodePropertiesSchemaMap: object = nodePropertiesSchema.reduce((acc, curr) => {
    return {
        ...acc,
        [curr.type]: curr,
    };
}, {});
const getPropertyValue = (property: SchemaProperty) => {
    const { code } = property;
    switch (code) {
        case 'name':
            return `${randomName.generate()}某某公司`;
        case 'companyType':
            return Math.random() - 0.5 > 0 ? '上市公司' : '非上市公司';
        case 'industry':
            return Math.random() - 0.5 > 0 ? '传统行业' : '互联网行业';
        case 'number of participants':
            return Math.round(Math.random() * 100);
        case 'registered capital':
            return `${Math.round(Math.random() * 1000000000) / 10000}(万元)`;
        case 'register prov':
            // const randomProvince = province.sort(() => {
            //     return Math.random() - 0.5;
            // });
            return province.sort(() => {
                return Math.random() - 0.5;
            })[0];
        case 'phone':
            return Math.random().toString().slice(2, 11);

        case 'USCC':
            return Math.random().toString().slice(2, 20);
        default:
            return '...';
    }
};
/**
 *
 * @param nodes nodes节点数组
 * @param nodes
 */
const getProperties = (nodes: NodeData[]): NodeData[] => {
    return nodes.map((node) => {
        const { type = '' } = node;
        if (!nodePropertiesSchemaMap[type]) {
            return node;
        }
        const schemaProperties = nodePropertiesSchemaMap[type].propertySchemaList;
        const propertiesMock = schemaProperties.map((property: SchemaProperty) => {
            return {
                code: property.code,
                name: property.desc,
                value: getPropertyValue(property),
            };
        });
        const displayName = `${propertiesMock.find((property: Property) => property.code === 'name').value}(${
            node.id
        })`;
        return {
            ...node,
            label: displayName,
            properties: propertiesMock,
        };
    });
};
export default getProperties;
