export interface Systems {
    name: string;
    url: string;
    description: string;
    department_in_charge: string;
    person_in_charge: string;
    dev_corp: string;
    dev_person: string;
    ps: string;
    is_used?: boolean;
}

export interface Instances {
    name: string;
    system_name: string;
    instance_id: string;
    url: string;
    area: string;
    is_cloud: string;
    type: string;
    version: string;
    ps: string;
    is_used?: boolean;
}

export interface Databases {
    name: string;
    instance_name: string;
    description: string;
    is_used?: boolean;
}

export interface Tables {
    name: string;
    database_name: string;
    summary: string;
    entity_type: string;
    classification: string;
    level: string;
    production_mode: string;
    source: string;
    share_type: string;
    department_in_charge: string;
    person_in_charge: string;
    ps: string;
    is_used?: boolean;
}

export interface Fields {
    name: string;
    table_name: string;
    chinese_name: string;
    description: string;
    data_type: string;
    is_primary_key: string;
    is_nullable: string;
    is_sensitive: string;
    ps: string;
    is_used?: boolean;
}

export interface Links {
    source: string;
    target: string;
    category: string;
    description: string;
    is_used?: boolean;
}